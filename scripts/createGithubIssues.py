import subprocess
import shutil
import yaml
from pathlib import Path


def create_issue(title: str, body: str, labels: list[str]) -> None:
    if shutil.which("gh") is None:
        raise EnvironmentError("GitHub CLI 'gh' is not installed")

    label_args = []
    for label in labels:
        label_args.extend(["--label", label])
    cmd = ["gh", "issue", "create", "--title", title, "--body", body] + label_args
    subprocess.run(cmd, check=True)


def main() -> None:
    backlog_file = Path(__file__).resolve().parent.parent / ".codex/tasks/backlog.yaml"
    data = yaml.safe_load(backlog_file.read_text())

    for epic in data.get("issues", []):
        epic_name = epic.get("epic")
        for story in epic.get("stories", []):
            title = f"[{epic_name}] {story['title']}"
            body = story['body']
            labels = story.get('labels', [])
            create_issue(title, body, labels)


if __name__ == "__main__":
    main()
