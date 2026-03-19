# Contributing

Thanks for taking the time to contribute to this project.

This repository is intentionally small and focused. The goal is to keep the editor easy to understand, easy to fork, and easy to reuse in other projects.

## Ways To Contribute

- report bugs
- suggest UX or editor improvements
- improve documentation
- fix small UI or interaction issues
- propose new editing features that fit the scope of the project

## Before You Start

Please review the current README first so you understand the project goals and current feature set:

- [README.md](./README.md)

This project is a static frontend app built with:

- HTML
- CSS
- JavaScript
- Fabric.js

## Local Setup

You can run the project in any simple local static server.

Examples:

```bash
python -m http.server 8080
npx serve .
php -S localhost:8080
```

Then open:

```text
http://127.0.0.1:8080
```

## Contribution Guidelines

Please try to keep changes aligned with the current purpose of the repository:

- keep the project framework-free unless there is a strong reason to change that
- keep the editor workflow simple and portfolio-friendly
- avoid introducing backend-specific logic into the standalone version
- prefer readable code over clever abstractions
- avoid adding large dependencies unless the benefit is clear

## If You Are Reporting A Bug

Please include:

- what you expected to happen
- what actually happened
- steps to reproduce it
- browser and OS details
- screenshots or screen recordings if relevant

## If You Are Suggesting A Feature

Please explain:

- the user problem it solves
- why it fits this repository
- whether it adds complexity to the current UI
- whether it can be implemented without changing the project’s lightweight nature

## Pull Request Checklist

Before opening a pull request, please:

- keep the change focused
- test the full editor flow if your change affects behavior
- verify upload, draw, text, sticker, effect, delete, and export flows when relevant
- update [README.md](./README.md) if the user-facing behavior changes
- update screenshots if the UI changed significantly
- avoid unrelated formatting-only changes in the same PR

## Asset And Licensing Notes

- do not add images, stickers, fonts, or media unless you have the right to include them
- if you contribute assets, make sure their reuse terms are clear
- keep the repository safe for public sharing and forking

## Style Notes

- use clear naming
- keep functions focused
- preserve the existing plain-JavaScript approach unless a refactor is clearly justified
- prefer small, practical improvements over large rewrites

## Questions

If you are unsure whether a change fits the project, open an issue first before spending time on a large implementation.

Thanks for helping improve the project.
