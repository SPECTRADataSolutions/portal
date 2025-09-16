#!/usr/bin/env python3
"""
SPECTRA Framework Version & Release Helper

This script provides utilities for version management and release preparation.
"""

import re
import subprocess
from pathlib import Path
from typing import Literal

import click


def get_current_version() -> str:
    """Get current version from pyproject.toml."""
    pyproject_path = Path("pyproject.toml")
    if not pyproject_path.exists():
        raise click.ClickException("pyproject.toml not found")

    content = pyproject_path.read_text()
    version_match = re.search(r'version = "([^"]+)"', content)
    if not version_match:
        raise click.ClickException("Version not found in pyproject.toml")

    return version_match.group(1)


def update_version_in_file(version: str) -> None:
    """Update version in pyproject.toml."""
    pyproject_path = Path("pyproject.toml")
    content = pyproject_path.read_text()

    # Replace version line
    updated_content = re.sub(r'version = "[^"]+"', f'version = "{version}"', content)

    pyproject_path.write_text(updated_content)
    click.echo(f"✅ Updated version to {version} in pyproject.toml")


def bump_version(current: str, bump_type: Literal["patch", "minor", "major"]) -> str:
    """Bump version according to semantic versioning."""
    try:
        major, minor, patch = map(int, current.split("."))
    except ValueError as e:
        raise click.ClickException(f"Invalid version format: {current}") from e

    if bump_type == "patch":
        patch += 1
    elif bump_type == "minor":
        minor += 1
        patch = 0
    elif bump_type == "major":
        major += 1
        minor = 0
        patch = 0
    else:
        raise click.ClickException(f"Invalid bump type: {bump_type}")

    return f"{major}.{minor}.{patch}"


def run_command(cmd: list[str]) -> tuple[int, str, str]:
    """Run command and return exit code, stdout, stderr."""
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        return result.returncode, result.stdout.strip(), result.stderr.strip()
    except subprocess.TimeoutExpired:
        return 1, "", "Command timed out"
    except Exception as e:
        return 1, "", str(e)


def check_git_status() -> bool:
    """Check if git working directory is clean."""
    exit_code, stdout, _stderr = run_command(["git", "status", "--porcelain"])
    return exit_code == 0 and not stdout.strip()


def get_git_tags() -> list[str]:
    """Get list of existing git tags."""
    exit_code, stdout, _stderr = run_command(["git", "tag", "-l"])
    if exit_code != 0:
        return []
    return [tag.strip() for tag in stdout.split("\n") if tag.strip()]


@click.group()
def cli():
    """SPECTRA Framework Version & Release Helper."""
    pass


@cli.command()
def current():
    """Show current version."""
    try:
        version = get_current_version()
        click.echo(f"Current version: {version}")
    except Exception as e:
        raise click.ClickException(str(e)) from e


@cli.command()
@click.argument("bump_type", type=click.Choice(["patch", "minor", "major"]))
@click.option("--dry-run", is_flag=True, help="Show what would be done without making changes")
def bump(bump_type: str, dry_run: bool):
    """Bump version in pyproject.toml."""
    try:
        current_version = get_current_version()
        new_version = bump_version(current_version, bump_type)  # type: ignore

        click.echo(f"Current version: {current_version}")
        click.echo(f"New version: {new_version}")

        if dry_run:
            click.echo("🔍 Dry run - no changes made")
            return

        if not check_git_status() and not click.confirm("Git working directory is not clean. Continue anyway?"):
            return

        update_version_in_file(new_version)

        click.echo(f"\n✅ Version bumped from {current_version} to {new_version}")
        click.echo("\n📋 Next steps:")
        click.echo("1. Review the changes")
        click.echo("2. Run: git add pyproject.toml")
        click.echo(f"3. Run: git commit -m 'Bump version to v{new_version}'")
        click.echo(f"4. Run: git tag -a v{new_version} -m 'Release v{new_version}'")
        click.echo(f"5. Run: git push origin main && git push origin v{new_version}")

    except Exception as e:
        raise click.ClickException(str(e)) from e


@cli.command()
def tags():
    """List existing version tags."""
    git_tags = get_git_tags()
    version_tags = [tag for tag in git_tags if tag.startswith("v")]

    if not version_tags:
        click.echo("No version tags found.")
        return

    click.echo("Existing version tags:")
    for tag in sorted(version_tags, key=lambda x: [int(n) for n in x[1:].split(".")]):
        click.echo(f"  {tag}")


@cli.command()
@click.option("--score-threshold", default=75, help="Minimum score required for release")
def check(score_threshold: int):
    """Run release readiness check."""
    click.echo("🚀 Running release readiness check...")

    # Run release scanner
    exit_code, stdout, stderr = run_command(["python", "release_scan.py"])

    if exit_code != 0:
        click.echo(f"❌ Release scanner failed: {stderr}")
        return

    # Extract score from output
    lines = stdout.split("\n")
    score_line = next((line for line in lines if "OVERALL SCORE:" in line), None)

    if score_line:
        score_match = re.search(r"(\d+\.?\d*)/100", score_line)
        if score_match:
            score = float(score_match.group(1))
            if score >= score_threshold:
                click.echo(f"✅ Release ready! Score: {score}/100")
            else:
                click.echo(f"❌ Not ready for release. Score: {score}/100 (minimum: {score_threshold})")
        else:
            click.echo("⚠️ Could not parse score from release scanner")
    else:
        click.echo("⚠️ Could not find score in release scanner output")

    # Show full output
    click.echo("\n" + "=" * 50)
    click.echo("Release Scanner Output:")
    click.echo("=" * 50)
    click.echo(stdout)


@cli.command()
@click.argument("version")
@click.option("--message", "-m", help="Tag message")
def tag(version: str, message: str | None):
    """Create a version tag."""
    if not version.startswith("v"):
        version = f"v{version}"

    current_version = get_current_version()
    expected_tag = f"v{current_version}"

    if version != expected_tag and not click.confirm(
        f"Tag {version} doesn't match current version {current_version}. Continue?"
    ):
        return

    if not check_git_status() and not click.confirm("Git working directory is not clean. Continue anyway?"):
        return

    # Check if tag already exists
    existing_tags = get_git_tags()
    if version in existing_tags:
        raise click.ClickException(f"Tag {version} already exists")

    # Create tag message
    if not message:
        message = f"Release {version}"

    # Create annotated tag
    exit_code, _stdout, stderr = run_command(["git", "tag", "-a", version, "-m", message])

    if exit_code != 0:
        raise click.ClickException(f"Failed to create tag: {stderr}")

    click.echo(f"✅ Created tag: {version}")
    click.echo(f"📋 Next step: git push origin {version}")


if __name__ == "__main__":
    cli()
