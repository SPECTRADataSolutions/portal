from pathlib import Path

# Re-create the instructions.md file after code execution reset
codex_dir = Path("/mnt/data/portalCodex")
codex_dir.mkdir(parents=True, exist_ok=True)

instructions_md = """\
# Spectra Portal Instructions

This is the public-facing Astro website for Spectra Data Solutions. The site must reflect the Spectra brand — confident, clean, and slightly cheeky.

## Goals

- Use Astro with TailwindCSS and TypeScript
- Follow camelCase naming for all files, variables, and components
- Build the following pages: Home, About, Services, Contact
- Use /src/components for modular, reusable components (e.g., heroSection, featureList, contactForm)
- Use /src/layouts for shared layout structure
- Use /src/content for markdown-powered page sections where appropriate
- Avoid bloat: all code must be lean, purposeful, and readable
- Use markdown collapsible sections for internal docs when documenting components

## Codex Behaviour

- Don’t ask for permission — scaffold files directly
- Make commits modular (1 component per commit where possible)
- Comment clearly, with minimal inline notes unless needed
- Always respect existing folder structure and Spectra standards
"""

instructions_path = codex_dir / "instructions.md"
instructions_path.write_text(instructions_md)

instructions_path.name
