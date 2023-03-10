<h1> Contributing to FlowPath Open Source</h1>

We are always open questions, ideas and code contributions. As a contributor, here are the
guidelines we would like you to follow.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Questions or Problems](#questions-or-problems)
- [Want a Feature](#want-a-feature)
- [Submitting an Issue](#submitting-an-issue)
- [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
  - [After your pull request is merged](#after-your-pull-request-is-merged)
  - [Coding Rules & Workflow](#coding-rules--workflow)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Code of Conduct

Help us keep FlowPath open and inclusive. Please read and follow our [Code of Conduct][coc].

## Questions or Problems

If you find a bug in the source code or a mistake in the documentation, you can help us by
[submitting an issue](#submitting-an-issue) to our [GitHub repository][github]. Including an issue
reproduction is the absolute best way to help the team quickly diagnose the problem. Screenshots are also helpful.

You can help the team even more and [submit a Pull Request](#submitting-a-pull-request-pr) with a fix! :pray:

## Want a Feature

You can _request_ a new feature by [submitting an issue](#submitting-an-issue) to our [GitHub
repository][github]. If you would like to _implement_ a new feature, please submit an issue with a
proposal for your work first, to be sure that we can use it. Please consider what kind of change it
is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project.
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submitting-a-pull-request-pr).

## Submitting an Issue

Before you submit an issue, search [existing open/closed issues][issues], as your question may have
already been answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features by not reporting duplicate issues. Providing the following information will increase the
chances of your issue being dealt with quickly:

- **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
- **Motivation for or Use Case** - explain what are you trying to do and why the current behavior
  is a bug for you
- **Browsers and Operating System** - is this a problem with all browsers?
- **Reproduce the Error** - Please create a simple replication of your issue and add that link to the issue.
- **Screenshots** - Due to the visual nature of this library, screenshots can help the team triage
  issues far more quickly than a text description.
- **Related Issues** - has a similar issue been reported before?
- **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be
  causing the problem (line of code or commit)

You can file new issues by providing the above information [here][issues-create].

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

- Search [GitHub][pulls] for an open or closed PR that relates to your submission. You don't want to
  duplicate effort.
- Make your changes in a new git branch:
  - `git checkout -b my-fix-branch`
- Create your patch, **including appropriate test cases**.
- Follow our coding rules (by verifying all linters pass).
- Run the full test suite and ensure that all tests pass.
- Push your branch to GitHub:
  - `git push my-fork my-fix-branch`
- In GitHub, send a pull request to `open-source:main`.
- If we suggest changes then:
  - Make the required updates.
  - Re-run all test suites to ensure tests are still passing.
  - Re-run all linters.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request and trigger a new CI
    run):
    1. `git rebase main -i`
    2. `git push -f`

That's it! Thank you for your contribution! :pray:

### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the
main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell:
  - `git push my-fork --delete my-fix-branch`
- Check out the `main` branch:
  - `git checkout main -f`
- Delete the local branch:
  - `git branch -D my-fix-branch`
- Update your `main` with the latest upstream version:
  - `git pull --ff upstream main`

### Coding Rules & Workflow

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.
- Most coding styles are enforced via linters

[coc]: ./CODE_OF_CONDUCT.md
[github]: https://github.com/GetFlowPath/open-source/
[issues]: https://github.com/GetFlowPath/open-source/issues
[issues-create]: https://github.com/GetFlowPath/open-source/issues/new
[pulls]: https://github.com/GetFlowPath/open-source/pulls
