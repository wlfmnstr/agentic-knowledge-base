# Branch Rename: master → main

## Current Status

✅ **Code is ready** - All repository files already reference `main` as the default branch.

The repository is currently configured to use `master` as the default branch on GitHub, but all code and workflows already reference `main`. This document provides instructions for completing the branch rename.

## What's Already Done

- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`) already uses `main` branch
- ✅ No references to `master` branch found in code, configs, or documentation
- ✅ All builds and deployments are configured for `main`

## Required Steps

Since automated agents cannot change GitHub repository settings or force-push branches, the following steps must be completed manually:

### Step 1: Rename the Branch on GitHub

1. Go to: https://github.com/wlfmnstr/agentic-knowledge-base/settings/branches
2. In the "Default branch" section, click the pencil/edit icon next to `master`
3. Click "Rename branch"
4. Enter `main` as the new branch name
5. Click "Rename branch" to confirm

GitHub will automatically:
- Rename `master` to `main` 
- Update pull requests and branch protection rules
- Redirect references from the old branch name

### Step 2: Update Local Repositories

For anyone with a local clone of the repository, run these commands:

```bash
# Fetch the latest changes from remote
git fetch origin

# Check out the new main branch
git checkout main

# Set the new main branch to track origin/main
git branch -u origin/main

# Optional: Remove the old master branch locally
git branch -d master
```

### Step 3: Verify the Change

After renaming:

1. Check that workflows run on the `main` branch
2. Verify GitHub Pages deployment works (should trigger automatically on push to `main`)
3. Confirm the default branch shows as `main` in repository settings

## Why This Change?

Renaming the default branch from `master` to `main`:
- Aligns with GitHub's current default branch naming convention
- Matches what's already configured in the codebase
- Uses more inclusive and descriptive terminology
- Standardizes with modern GitHub repository practices

## No Breaking Changes

This change will not break:
- ✅ Existing pull requests (GitHub automatically updates them)
- ✅ GitHub Actions workflows (already use `main`)
- ✅ Branch protection rules (GitHub migrates them automatically)
- ✅ GitHub Pages deployment (workflow triggers on `main`)

## Questions or Issues?

If you encounter any problems during the rename:
1. Ensure you have admin access to the repository
2. Check that no critical CI/CD jobs are running during the rename
3. Review GitHub's documentation: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/renaming-a-branch
