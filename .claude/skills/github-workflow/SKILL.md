---
name: github-workflow
description: GitHub Actions, Pages, API integration, and repository management patterns
---

# GitHub Workflow Skill

Expert knowledge for GitHub Actions, GitHub Pages, and GitHub API integration.

## GitHub Actions Fundamentals

### Workflow Anatomy

```yaml
name: Build and Deploy

# When to run
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch: # Manual trigger

# Environment variables
env:
  NODE_VERSION: '20.x'

# Jobs to run
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Test
        run: npm test
```

### Key Concepts

**Workflow:** A configurable automated process
**Job:** A set of steps that execute on the same runner
**Step:** An individual task (action or command)
**Runner:** Server that runs workflows (ubuntu-latest, macos-latest, etc.)
**Action:** Reusable unit of code (from marketplace or custom)

## Common Triggers

```yaml
on:
  # On push to specific branches
  push:
    branches: [main, develop]
    paths:
      - 'src/**'
      - 'package.json'

  # On pull request
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

  # On schedule (cron)
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday

  # Manual trigger
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'

  # On release
  release:
    types: [published]
```

## Caching Strategies

### Dependency Caching

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'npm' # Automatically caches npm dependencies

# Or manual caching
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### Build Cache

```yaml
- name: Cache build output
  uses: actions/cache@v3
  with:
    path: |
      .next/cache
      dist
    key: ${{ runner.os }}-build-${{ hashFiles('**/*.ts', '**/*.tsx') }}
    restore-keys: |
      ${{ runner.os }}-build-
```

### Cache Best Practices

- Use specific cache keys (include hash of dependencies)
- Provide restore-keys for fallback
- Cache expensive operations (dependencies, builds)
- Monitor cache hit rates
- Clear old caches periodically

## Job Orchestration

### Sequential Jobs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  test:
    needs: build # Wait for build to complete
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  deploy:
    needs: [build, test] # Wait for both
    runs-on: ubuntu-latest
    steps:
      - run: npm run deploy
```

### Parallel Jobs

```yaml
jobs:
  test-unit:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:unit

  test-integration:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:integration

  lint:
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint
```

### Matrix Builds

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node: [18, 20]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm test
```

## Secrets and Environment Variables

### Using Secrets

```yaml
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
    run: npm run deploy
```

### Setting Secrets

Via GitHub UI: Settings → Secrets and variables → Actions → New repository secret

### Environment Variables

```yaml
env:
  # Workflow-level
  GLOBAL_VAR: 'value'

jobs:
  build:
    env:
      # Job-level
      JOB_VAR: 'value'

    steps:
      - name: Build
        env:
          # Step-level
          STEP_VAR: 'value'
        run: npm run build
```

## Artifacts

### Upload Artifacts

```yaml
- name: Build
  run: npm run build

- name: Upload build artifacts
  uses: actions/upload-artifact@v3
  with:
    name: build-output
    path: dist/
    retention-days: 7
```

### Download Artifacts

```yaml
- name: Download build artifacts
  uses: actions/download-artifact@v3
  with:
    name: build-output
    path: dist/
```

### Sharing Between Jobs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: build
          path: dist/
      - run: npm run deploy
```

## GitHub Pages Deployment

### Using GitHub Actions

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Configuration

**Repository Settings:**
- Settings → Pages
- Source: GitHub Actions (new) or Deploy from branch (legacy)
- Custom domain (optional)

**Build Configuration:**
```javascript
// Astro example
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name/', // If not at root of domain
});
```

## Workflow Optimization

### Conditional Execution

```yaml
steps:
  - name: Run only on main
    if: github.ref == 'refs/heads/main'
    run: npm run deploy

  - name: Run only on PR
    if: github.event_name == 'pull_request'
    run: npm run test:full

  - name: Run if previous step succeeded
    if: success()
    run: echo "Previous step succeeded"

  - name: Run if previous step failed
    if: failure()
    run: echo "Previous step failed"
```

### Fast Failure

```yaml
jobs:
  test:
    strategy:
      fail-fast: true # Stop all jobs if one fails
      matrix:
        node: [18, 20]
```

### Job Outputs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      build-version: ${{ steps.version.outputs.version }}
    steps:
      - id: version
        run: echo "version=1.2.3" >> $GITHUB_OUTPUT

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying ${{ needs.build.outputs.build-version }}"
```

## Common Actions (Marketplace)

### Essential Actions

```yaml
# Checkout code
- uses: actions/checkout@v4

# Setup Node.js
- uses: actions/setup-node@v4
  with:
    node-version: '20.x'

# Setup Python
- uses: actions/setup-python@v4
  with:
    python-version: '3.11'

# Cache
- uses: actions/cache@v3

# Upload/Download artifacts
- uses: actions/upload-artifact@v3
- uses: actions/download-artifact@v3

# Deploy to GitHub Pages
- uses: actions/deploy-pages@v4
```

### Specialized Actions

```yaml
# Lighthouse CI
- uses: treosh/lighthouse-ci-action@v10

# Bundle size
- uses: andresz1/size-limit-action@v1

# Code coverage
- uses: codecov/codecov-action@v3

# Create release
- uses: actions/create-release@v1
```

## GitHub API Integration

### Using GitHub CLI in Actions

```yaml
- name: Create issue
  env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    gh issue create \
      --title "Deployment failed" \
      --body "Build failed on commit ${{ github.sha }}"
```

### Using Octokit (REST API)

```typescript
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Create issue
await octokit.issues.create({
  owner: 'username',
  repo: 'repo-name',
  title: 'Issue title',
  body: 'Issue body',
});

// List pull requests
const { data: prs } = await octokit.pulls.list({
  owner: 'username',
  repo: 'repo-name',
  state: 'open',
});
```

## Debugging Workflows

### Enable Debug Logging

Settings → Secrets → Add repository secret:
- `ACTIONS_RUNNER_DEBUG`: true
- `ACTIONS_STEP_DEBUG`: true

### Debugging Strategies

```yaml
# Print context
- name: Dump GitHub context
  run: echo '${{ toJSON(github) }}'

# Print environment
- name: Print environment
  run: env | sort

# Use tmate for SSH access
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
```

## Best Practices

### Workflow Design

1. **Fast feedback:** Run fast jobs first (lint, unit tests)
2. **Fail fast:** Stop on first failure
3. **Cache aggressively:** Cache dependencies and builds
4. **Parallelize:** Run independent jobs in parallel
5. **Specific triggers:** Only run when necessary

### Security

1. **Minimal permissions:** Use least privilege
2. **Pin action versions:** Use commit SHAs for critical actions
3. **Protect secrets:** Never log secrets
4. **Review dependencies:** Audit third-party actions
5. **Use GITHUB_TOKEN:** Prefer built-in token over personal tokens

### Maintenance

1. **Version pinning:** Pin action versions but update regularly
2. **Workflow documentation:** Comment complex workflows
3. **Monitor performance:** Track build times
4. **Regular updates:** Keep actions and dependencies updated
5. **Test workflows:** Test in feature branches before merging

## Common Patterns

### Monorepo Support

```yaml
on:
  push:
    paths:
      - 'packages/app/**'
      - 'packages/shared/**'

jobs:
  build-app:
    if: contains(github.event.head_commit.modified, 'packages/app')
    runs-on: ubuntu-latest
    steps:
      - run: npm run build --workspace=app
```

### Version Tagging

```yaml
- name: Create tag
  run: |
    git tag v${{ github.run_number }}
    git push origin v${{ github.run_number }}
```

### Notification on Failure

```yaml
jobs:
  notify:
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - name: Send notification
        run: |
          curl -X POST ${{ secrets.WEBHOOK_URL }} \
            -d '{"text": "Build failed!"}'
```

## Performance Optimization

Target metrics:
- **Total workflow time:** Under 5 minutes
- **Cache hit rate:** >80%
- **Parallel job efficiency:** >70%
- **Failed workflow rate:** <5%

Optimization strategies:
1. Cache dependencies and build outputs
2. Run jobs in parallel
3. Use matrix builds judiciously
4. Minimize checkout depth
5. Use self-hosted runners for heavy workloads (if needed)

---

*This skill provides comprehensive knowledge for GitHub Actions, Pages, and workflow automation. Reference it when setting up CI/CD and deployment.*
