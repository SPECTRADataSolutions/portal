import subprocess
import shutil
import yaml
import logging
from pathlib import Path

# Initialise logger once per script
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("codexIssueCreator")

def checkCreateLabelExistence(labelName):
    """
    Ensure the specified GitHub label exists. If it does not, create it using a neutral color.
    """
    result = subprocess.run(["gh", "label", "list"], capture_output=True, text=True)
    labelList = [line.split()[0] for line in result.stdout.strip().split('\n') if line]
    if labelName not in labelList:
        try:
            subprocess.run(["gh", "label", "create", labelName, "--color", "ededed"], check=True)
        except subprocess.CalledProcessError as e:
            if "already exists" in (e.stderr or ""):
                # Label already exists, safe to continue
                pass
            else:
                raise

def createIssueWithLabels(title, body, labels):
    """
    Create a GitHub issue with the specified title, body, and labels, ensuring all labels exist first.
    """
    labelArgs = []
    for label in labels:
        checkCreateLabelExistence(label)  # Ensure label exists before adding
        labelArgs.extend(["--label", label])

    cmd = ["gh", "issue", "create", "--title", title, "--body", body] + labelArgs
    logger.debug(f"Running command: {' '.join(cmd)}")

    try:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        logger.info(f"Issue created: {title}")
        logger.debug(f"gh output:\n{result.stdout}")
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to create issue: {title}")
        logger.error(f"stderr:\n{e.stderr}")
        raise

def processBacklogFile():
    """
    Load the backlog YAML file and create issues for all stories, ensuring labels exist.
    """
    backlogFile = Path(__file__).resolve().parent.parent / ".codex/tasks/backlog.yaml"
    logger.debug(f"Reading backlog from: {backlogFile}")

    if not backlogFile.exists():
        logger.error(f"Backlog file does not exist: {backlogFile}")
        return

    try:
        data = yaml.safe_load(backlogFile.read_text())
    except yaml.YAMLError as e:
        logger.error(f"Failed to parse YAML: {e}")
        return

    issues = data.get("issues", [])
    logger.info(f"Found {len(issues)} epics in backlog")

    for epic in issues:
        epicName = epic.get("epic", "Unknown Epic")
        logger.debug(f"Processing epic: {epicName}")

        for story in epic.get("stories", []):
            title = f"[{epicName}] {story['title']}"
            body = story.get("body", "")
            labels = story.get("labels", [])

            logger.debug(f"Creating issue: {title}")
            createIssueWithLabels(title, body, labels)

if __name__ == "__main__":
    processBacklogFile()
