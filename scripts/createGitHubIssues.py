import subprocess
import shutil
import yaml
import logging
from pathlib import Path

# Set up logger
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("codex-issue-creator")


def create_issue(title: str, body: str, labels: list[str]) -> None:
    if shutil.which("gh") is None:
        logger.error("GitHub CLI 'gh' is not installed or not in PATH.")
        raise EnvironmentError("GitHub CLI 'gh' is not installed")

    label_args = []
    for label in labels:
        label_args.extend(["--label", label])

    cmd = ["gh", "issue", "create", "--title", title, "--body", body] + label_args
    logger.debug(f"Running command: {' '.join(cmd)}")

    try:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        logger.info(f"Issue created: {title}")
        logger.debug(f"gh output:\n{result.stdout}")
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to create issue: {title}")
        logger.error(f"stderr:\n{e.stderr}")
        raise


def main() -> None:
    backlog_file = Path(__file__).resolve().parent.parent / ".codex/tasks/backlog.yaml"
    logger.debug(f"Reading backlog from: {backlog_file}")

    if not backlog_file.exists():
        logger.error(f"Backlog file does not exist: {backlog_file}")
        return

    try:
        data = yaml.safe_load(backlog_file.read_text())
    except yaml.YAMLError as e:
        logger.error(f"Failed to parse YAML: {e}")
        return

    issues = data.get("issues", [])
    logger.info(f"Found {len(issues)} epics in backlog")

    for epic in issues:
        epic_name = epic.get("epic", "Unknown Epic")
        logger.debug(f"Processing epic: {epic_name}")

        for story in epic.get("stories", []):
            title = f"[{epic_name}] {story['title']}"
            body = story.get("body", "")
            labels = story.get("labels", [])

            logger.debug(f"Creating issue: {title}")
            create_issue(title, body, labels)


if __name__ == "__main__":
    main()
