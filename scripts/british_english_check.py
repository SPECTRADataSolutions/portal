"""British English spellings enforcement script.

Scans markdown files for common American spellings and suggests British replacements.
Non-zero exit if any disallowed spelling is found.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent

AMERICAN_TO_BRITISH = {
    "organization": "organisation",
    "organize": "organise",
    "organizing": "organising",
    "color": "colour",
    "colors": "colours",
    "behavior": "behaviour",
    "behaviors": "behaviours",
    "behavioral": "behavioural",
    "center": "centre",
    "customize": "customise",
    "customization": "customisation",
    "analyze": "analyse",
    "analyzer": "analyser",
    "analyzed": "analysed",
    "analyzing": "analysing",
    "initialize": "initialise",
    "initialized": "initialised",
    "initializing": "initialising",
    "utilize": "utilise",
    "utilized": "utilised",
    "utilizing": "utilising",
}

WORD_RE = re.compile(r"\b(" + "|".join(AMERICAN_TO_BRITISH.keys()) + r")\b", re.IGNORECASE)


def scan_markdown() -> list[tuple[Path, str, str]]:
    issues: list[tuple[Path, str, str]] = []
    for md in ROOT.rglob("*.md"):
        if any(part.startswith(".") for part in md.relative_to(ROOT).parts):
            continue
        text = md.read_text(encoding="utf-8", errors="ignore")
        for match in WORD_RE.finditer(text):
            found = match.group(0)
            lower = found.lower()
            replacement = AMERICAN_TO_BRITISH.get(lower)
            if replacement:
                issues.append((md, found, replacement))
    return issues


def main() -> int:
    issues = scan_markdown()
    if issues:
        print("British English check failed. Found American spellings:")
        for path, word, repl in issues:
            print(f" - {path}: '{word}' -> '{repl}'")
        return 1
    print("British English check passed.")
    return 0


if __name__ == "__main__":  # pragma: no cover
    sys.exit(main())
