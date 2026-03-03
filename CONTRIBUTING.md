# Contributing to j-make

Thanks for your interest in contributing!

## Getting Started

1. Fork the repository and clone your fork.
2. Open `index.html` in a local web server (e.g. `npx serve .` or VS Code Live Server).
   A plain `file://` origin will not work because j-make uses `$.get()` to load directory content.
3. Make your changes, verify the demo still works, then open a pull request against `master`.

## Guidelines

- Keep `j-make.js` dependency-free except for jQuery.
- Do not introduce a build step unless it is strictly necessary.
- Add a clear description to your pull request explaining what problem it solves and how it was tested.
- Follow the existing code style: `'use strict'`, `const`/`let`, descriptive function names.

## Reporting Issues

Search [existing issues](https://github.com/richardkentgates/j-make/issues) before opening a new one.
For security vulnerabilities, follow the process in [SECURITY.md](SECURITY.md) instead.
