"""Spectrafy Audit Script

Validates repository governance readiness using .spectra config.
Outputs a JSON score artefact to .spectra/evidence/scores/ with timestamp.

Scoring (dynamic weighted model up to 600 points):
Categories (mapped to scoring.yml weights):
    automation  : proportion of required workflows present
    standards   : proportion of policy sets satisfied (exists in standards/docs)
    documentation: presence ratio of CONTRIBUTING, SECURITY, naming standard (3 items)
    security    : security-checks workflow present (binary)
    quality     : average of (readme hygiene, tests workflow present)

Total = sum(weight_category * 600 * category_fraction)

Exceptions:
    governance.yml may include exceptions list entries with keys: id, reason, expires(ISO date), status(optional)
    Expired exceptions reduce associated category fraction to 0 and add warning; imminent (<7d) add warning.

README Badge:
    Updates text region between markers <!-- SPECTRA_SCORE_BADGE --> and <!-- /SPECTRA_SCORE_BADGE --> with current score & level.
"""

from __future__ import annotations

import json
import sys
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parent.parent
SPECTRA_DIR = ROOT / ".spectra"
EVIDENCE_DIR = SPECTRA_DIR / "evidence" / "scores"


def load_yaml(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def check_required_workflows(gov: dict[str, Any]) -> list[str]:
    missing: list[str] = []
    wf_dir = ROOT / ".github" / "workflows"
    for wf in gov.get("required_workflows", []):
        if not (wf_dir / wf).exists():
            missing.append(wf)
    return missing


def check_policy_sets(gov: dict[str, Any]) -> list[str]:
    missing: list[str] = []
    for policy in gov.get("policy_sets", []):
        found = False
        for base in (ROOT / "standards", ROOT / "docs" / "standards"):
            if base.exists():
                for cand in base.rglob("*"):
                    if cand.is_file() and policy in cand.stem:
                        found = True
                        break
            if found:
                break
        if not found:
            missing.append(policy)
    return missing


def parse_date(value: str) -> datetime | None:
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except Exception:
        return None


def evaluate_exceptions(gov: dict[str, Any]) -> dict[str, Any]:
    results: dict[str, Any] = {"expired": [], "expiring": []}
    today = datetime.now(UTC)
    raw_any: list[Any] = list(gov.get("exceptions", []) or [])  # ensure list[Any]
    for obj in raw_any:
        item: dict[str, Any]
        if isinstance(obj, dict):
            item = obj  # type: ignore[assignment]
        else:
            continue
        expires_field = item.get("expires")
        if not isinstance(expires_field, str):
            continue
        dt = parse_date(expires_field)
        if not dt:
            continue
        if dt < today:
            results["expired"].append(item)
        elif (dt - today).days <= 7:
            results["expiring"].append(item)
    return results


def schema_validate(gov: dict[str, Any], scoring: dict[str, Any]) -> list[str]:
    issues: list[str] = []
    for key in ["policy_sets", "required_workflows", "gates"]:
        if key not in gov:
            issues.append(f"governance.yml missing key: {key}")
    if "levels" not in scoring or "weights" not in scoring:
        issues.append("scoring.yml missing levels or weights")
    else:
        w = scoring["weights"]
        if abs(sum(w.values()) - 1.0) > 0.001:
            issues.append("weights must sum to 1.0")
    return issues


def score() -> tuple[int, str, dict[str, Any]]:
    _manifest = load_yaml(SPECTRA_DIR / "manifest.yml")
    governance = load_yaml(SPECTRA_DIR / "governance.yml")
    scoring_cfg = load_yaml(SPECTRA_DIR / "scoring.yml")

    details: dict[str, Any] = {}

    # Validation
    schema_issues = schema_validate(governance, scoring_cfg)
    details["schema"] = {"issues": schema_issues}

    exceptions_eval = evaluate_exceptions(governance)
    details["exceptions"] = exceptions_eval

    # Core checks
    required = governance.get("required_workflows", [])
    missing_wf = check_required_workflows(governance)
    workflow_fraction = 0.0 if not required else (len(required) - len(missing_wf)) / len(required)
    details["automation"] = {"missing": missing_wf, "fraction": workflow_fraction}

    policy_sets = governance.get("policy_sets", [])
    missing_policies = check_policy_sets(governance)
    standards_fraction = 0.0 if not policy_sets else (len(policy_sets) - len(missing_policies)) / len(policy_sets)
    details["standards"] = {"missing": missing_policies, "fraction": standards_fraction}

    contrib = (ROOT / "templates" / "repoDefaults" / "CONTRIBUTING.md").exists()
    sec_doc = (ROOT / "templates" / "repoDefaults" / "SECURITY.md").exists()
    naming = (
        any(p.name.startswith("naming-convention") for p in (ROOT / "standards").glob("*"))
        if (ROOT / "standards").exists()
        else False
    )
    doc_items = [contrib, sec_doc, naming]
    documentation_fraction = sum(1 for v in doc_items if v) / len(doc_items)
    details["documentation"] = {
        "contributing": contrib,
        "security": sec_doc,
        "naming": naming,
        "fraction": documentation_fraction,
    }

    # Security category (binary)
    security_present = (ROOT / ".github" / "workflows" / "security-checks.yml").exists()
    # Expired security exceptions zero out security
    security_fraction = 0.0 if exceptions_eval["expired"] else (1.0 if security_present else 0.0)
    details["security"] = {
        "workflow_present": security_present,
        "fraction": security_fraction,
    }

    # Quality: README hygiene + tests workflow
    readme = (ROOT / "README.md").read_text(encoding="utf-8") if (ROOT / "README.md").exists() else ""
    readme_clean = "TODO" not in readme and "framework/framework" not in readme
    tests_wf = (ROOT / ".github" / "workflows" / "python-tests.yml").exists()
    quality_fraction = ((1 if readme_clean else 0) + (1 if tests_wf else 0)) / 2
    details["quality"] = {
        "readme_clean": readme_clean,
        "tests_workflow": tests_wf,
        "fraction": quality_fraction,
    }

    weights = scoring_cfg.get("weights", {})
    total = 0.0
    for cat, fraction in {
        "automation": workflow_fraction,
        "standards": standards_fraction,
        "documentation": documentation_fraction,
        "security": security_fraction,
        "quality": quality_fraction,
    }.items():
        w = weights.get(cat, 0)
        cat_score = w * 600 * fraction
        details.setdefault("categories", {})[cat] = {
            "weight": w,
            "fraction": fraction,
            "score": round(cat_score, 2),
        }
        total += cat_score

    # Penalties
    if exceptions_eval["expired"]:
        total = max(0, total - 25)  # penalty for expired exceptions
        details["penalties"] = {"expired_exceptions": 25}

    total_int = round(total)
    target_levels = scoring_cfg.get("levels", {})
    resolved_level: str = "unknown"
    for lvl, threshold in sorted(target_levels.items(), key=lambda x: x[1]):
        if isinstance(threshold, int) and total_int >= threshold:
            resolved_level = str(lvl)
    return total_int, resolved_level, details


def update_last_score(total: int, level: str, scoring_cfg_path: Path):
    """Update last_score section in scoring.yml safely."""
    data = load_yaml(scoring_cfg_path)
    if not data:
        return
    data.setdefault("last_score", {})
    data["last_score"].update(
        {
            "total": total,
            "level": level,
            "computed": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
    )
    tmp = scoring_cfg_path.with_suffix(".tmp")
    with tmp.open("w", encoding="utf-8") as f:
        yaml.safe_dump(data, f, sort_keys=False)
    tmp.replace(scoring_cfg_path)


def update_readme_badge(score_val: int, level: str) -> None:
    readme_path = ROOT / "README.md"
    if not readme_path.exists():
        return
    content = readme_path.read_text(encoding="utf-8")
    marker_start = "<!-- SPECTRA_SCORE_BADGE -->"
    marker_end = "<!-- /SPECTRA_SCORE_BADGE -->"
    badge_line = f"![Spectrafy Score](https://img.shields.io/badge/Spectrafy_{level}-{score_val}-blue)"
    replacement = (
        f"{marker_start}\nCurrent Spectrafy Score: **{score_val}** (Level **{level}**)  \n{badge_line}\n{marker_end}"
    )
    if marker_start in content and marker_end in content:
        pre, rest = content.split(marker_start, 1)
        _, post = rest.split(marker_end, 1)
        new_content = pre + replacement + post
    else:
        new_content = content.rstrip() + "\n\n" + replacement + "\n"
    readme_path.write_text(new_content, encoding="utf-8")


def main():
    if not SPECTRA_DIR.exists():
        print(".spectra directory missing", file=sys.stderr)
        sys.exit(1)
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)
    total, level, details = score()
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    artefact: dict[str, Any] = {
        "timestamp": timestamp,
        "score": total,
        "level": level,
        "details": details,
    }
    out_path = EVIDENCE_DIR / f"score-{timestamp}.json"
    out_path.write_text(json.dumps(artefact, indent=2), encoding="utf-8")
    print(json.dumps(artefact, indent=2))
    update_last_score(total, level, SPECTRA_DIR / "scoring.yml")
    update_readme_badge(total, level)
    l1 = load_yaml(SPECTRA_DIR / "scoring.yml").get("levels", {}).get("L1", 0)
    if total < l1 or details.get("schema", {}).get("issues"):
        sys.exit(2)

    # Non-zero exit if below L1 threshold
    l1 = load_yaml(SPECTRA_DIR / "scoring.yml").get("levels", {}).get("L1", 0)
    if total < l1:
        sys.exit(2)


if __name__ == "__main__":
    main()
