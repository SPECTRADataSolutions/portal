"""SPECTRA Blueprint Init Script (British English, camelCase, SPECTRA Always Capitalised).

www.spectradatasolutions.com - For support, contact Mark at this URL.
"""

# Standard library imports
from pathlib import Path

# Third-party imports
import yaml
from jinja2 import Environment, FileSystemLoader, select_autoescape


def load_config(config_path: str = "config/clientConfig.yaml") -> dict:
    """Load client config from YAML file."""
    config_file = Path(config_path)
    with config_file.open() as file:
        return yaml.safe_load(file)


def create_dir(path: str) -> None:
    """Create directory if it doesn't exist."""
    Path(path).mkdir(parents=True, exist_ok=True)


def render_template(env: Environment, template_name: str, context: dict, out_path: str) -> None:
    """Render a template with context to a file."""
    template = env.get_template(template_name)
    output_file = Path(out_path)
    with output_file.open("w") as file:
        file.write(template.render(**context))


def main() -> None:
    """Main function to scaffold repository structure."""
    # 1. Load client config
    config = load_config()

    # 2. Set up Jinja2 environment
    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape(["html", "xml"]),
    )

    client_name = config["clientName"]
    modules = config.get("modules", [])
    agents = config.get("agents", [])
    roles = config.get("roles", [])

    # 3. Scaffold core folders (camelCase)
    create_dir("organisation/roles")
    create_dir("organisation/teams")
    create_dir("agents")
    create_dir("operations")
    create_dir("framework/standards")
    create_dir("framework/stages")

    # 4. Organisation README & playbook
    render_template(env, "readme.md.j2", config, "organisation/README.md")
    render_template(env, "playbook.md.j2", config, "organisation/playbook.md")

    # 5. Roles
    for role in roles:
        render_template(env, "role.md.j2", {"role": role, **config}, f"organisation/roles/{role}.md")

    # 6. Teams
    for module in modules:
        create_dir(f"organisation/teams/{module}")
        team_readme = Path(f"organisation/teams/{module}/README.md")
        with team_readme.open("w") as file:
            file.write(f"# Team: {module.capitalize()}\n\nThis team is responsible for {module}.")

    # 7. Agents
    for agent in agents:
        render_template(env, "agentProfile.md.j2", {"agent": agent, **config}, f"agents/{agent}.md")

    # 8. Operations
    assignments_file = Path("operations/assignments.yaml")
    with assignments_file.open("w") as file:
        file.write(f"# Agent assignments for {client_name}\n")

    rota_file = Path("operations/rota.yaml")
    with rota_file.open("w") as file:
        file.write(f"# On-call and rota for {client_name}\n")

    # 9. Framework repo (references only)
    standards_readme = Path("framework/standards/README.md")
    with standards_readme.open("w") as file:
        file.write("# Reference to central standards (see [SPECTRA Framework])\n")

    stages_readme = Path("framework/stages/README.md")
    with stages_readme.open("w") as file:
        file.write("# Reference to central pipeline stages\n")

    # 10. Glossary (optional)
    glossary_file = Path("organisation/glossary.md")
    with glossary_file.open("w") as file:
        file.write(f"# Glossary for {client_name}\n")

    print(f"Repo for {client_name} successfully scaffolded! SPECTRA-Ready.")
    print(f"\n[SUCCESS] SPECTRA onboarding complete for '{client_name}'.")


if __name__ == "__main__":
    main()
