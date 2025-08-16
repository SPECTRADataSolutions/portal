# Contributing to SPECTRA Portal

We welcome contributions to the SPECTRA Portal! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Guidelines

### Code Standards
- Follow the SPECTRA Framework coding conventions
- Use British English spelling throughout the codebase (e.g., "colour", "behaviour", "organisation")
- Use the SPECTRA logging pattern with `initialiseLogger()` instead of `console.log()`
- Follow TypeScript best practices and ensure type safety

### Testing
- Test authentication flows thoroughly
- Ensure responsive design works across devices
- Verify OAuth integrations function correctly

### Documentation
- Update README.md if adding new features
- Include JSDoc comments for complex functions
- Update this CONTRIBUTING.md if changing contribution processes

## Submission Process

1. Ensure your code follows the style guidelines
2. Test your changes thoroughly
3. Update documentation as needed
4. Submit a pull request with:
   - Clear description of changes
   - Reference to any related issues
   - Screenshots for UI changes

## Code Review Process

- All submissions require review before merging
- Maintainers will review for:
  - Code quality and adherence to standards
  - Security implications
  - Performance impact
  - Documentation completeness

## Getting Help

- Check existing issues and documentation first
- Create an issue for bugs or feature requests
- For security issues, see SECURITY.md

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.