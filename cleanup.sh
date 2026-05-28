#!/usr/bin/env bash
# AutoPilotROI repo cleanup — May 28, 2026
#
# What this does:
#   1. Tags every dead branch as archive/<name> (permanent, recoverable forever).
#   2. Deletes those branches both local and remote.
#   3. Resets main to feature/frontend-rebuild's tip (bcbf7b1) and force-pushes.
#   4. Retires feature/frontend-rebuild (tagged as archive/feature-frontend-rebuild first).
#   5. Wipes Puck/CMS deadweight and stale artifacts from the working tree.
#   6. Commits and pushes the cleanup.
#
# Recovery: any archived branch can be brought back with:
#   git fetch --tags && git branch <name> archive/<name>
#
# Run from the repo root.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

# Sanity: we must currently be on feature/frontend-rebuild with clean working tree
CURRENT_BRANCH="$(git branch --show-current)"
if [ "$CURRENT_BRANCH" != "feature/frontend-rebuild" ]; then
  echo "ERROR: expected current branch to be feature/frontend-rebuild, got: $CURRENT_BRANCH"
  exit 1
fi

echo "=========================================="
echo "AutoPilotROI cleanup — about to start"
echo "=========================================="
echo "Repo:    $REPO_ROOT"
echo "Branch:  $CURRENT_BRANCH"
echo ""
echo "This will:"
echo "  - tag and DELETE ~13 branches (locally and on origin)"
echo "  - reset main to current HEAD and force-push"
echo "  - delete dead Puck/CMS files from the working tree"
echo "  - commit and push"
echo ""
echo "All deletions are recoverable from archive/* tags."
echo ""
read -p "Type 'yes' to proceed: " confirm
if [ "$confirm" != "yes" ]; then
  echo "Aborted."
  exit 1
fi

echo ""
echo "=== STEP 0: Fetch latest from origin ==="
git fetch origin --prune
git fetch origin --tags

# Commit any pending doc updates first so they ride into main with the reset
echo ""
echo "=== STEP 0b: Commit pending doc updates on feature/frontend-rebuild ==="
if ! git diff --quiet || ! git diff --cached --quiet; then
  git add WORKFLOW.md REVIEW-GUIDE-for-Barry.md ANTIGRAVITY-PROMPT.md VERCEL-SETUP-PROMPT.md 2>/dev/null || true
  git commit -m "docs: workflow, review guide, antigravity + vercel setup prompts" || echo "(nothing to commit)"
  git push origin feature/frontend-rebuild
else
  echo "(no pending doc changes)"
fi

# Branches to retire. Each becomes archive/<name>, then deleted local + remote.
# archive/v2 is already correctly named — leave it.
DEAD_BRANCHES=(
  "visual-skin-upgrade"
  "frontend-rebuild"
  "master"
  "feature/puck-editor"
  "puck-editor"
  "cms-wiring"
  "codex-mockup-homepage"
  "feature/frontend-pages"
  "backend-rebuild"
  "feature/admin-backend"
  "feature/api-layer"
  "feature/partner-dashboard"
)

echo ""
echo "=== STEP 1: Tag each dead branch as archive/<name> ==="
for branch in "${DEAD_BRANCHES[@]}"; do
  # Use the remote tip as the source of truth in case local is stale/missing
  if git rev-parse --verify --quiet "origin/$branch" >/dev/null; then
    SHA=$(git rev-parse "origin/$branch")
    TAG="archive/${branch//\//-}"  # turn slashes into dashes for tag name
    if git rev-parse --verify --quiet "refs/tags/$TAG" >/dev/null; then
      echo "  - $TAG already exists, skipping"
    else
      git tag -a "$TAG" "$SHA" -m "Archive of $branch (retired 2026-05-28)"
      echo "  + tagged $TAG -> $SHA ($branch)"
    fi
  else
    echo "  ! origin/$branch not found, skipping"
  fi
done

echo ""
echo "=== STEP 2: Push all archive tags to origin ==="
git push origin --tags

echo ""
echo "=== STEP 3: Delete dead branches from origin ==="
for branch in "${DEAD_BRANCHES[@]}"; do
  if git rev-parse --verify --quiet "origin/$branch" >/dev/null; then
    git push origin --delete "$branch" || echo "  ! couldn't delete origin/$branch"
  fi
done

echo ""
echo "=== STEP 4: Delete dead branches locally ==="
for branch in "${DEAD_BRANCHES[@]}"; do
  if git rev-parse --verify --quiet "refs/heads/$branch" >/dev/null; then
    git branch -D "$branch" || echo "  ! couldn't delete local $branch"
  fi
done

echo ""
echo "=== STEP 5: Reset main to feature/frontend-rebuild HEAD and force-push ==="
# Tag the OLD main first as a safety net
OLD_MAIN_SHA=$(git rev-parse origin/main)
git tag -a "archive/main-pre-rebuild" "$OLD_MAIN_SHA" -m "Old main before reset to feature/frontend-rebuild (2026-05-28)" || echo "  (tag already exists)"
git push origin --tags

# Also tag feature/frontend-rebuild for safety
REBUILD_SHA=$(git rev-parse HEAD)
git tag -a "archive/feature-frontend-rebuild" "$REBUILD_SHA" -m "Snapshot of feature/frontend-rebuild before retirement (2026-05-28)" || echo "  (tag already exists)"
git push origin --tags

# Move main locally to current HEAD, then force-push
git branch -f main HEAD
git checkout main
git push origin main --force-with-lease

echo ""
echo "=== STEP 6: Retire feature/frontend-rebuild ==="
git push origin --delete feature/frontend-rebuild || echo "  ! couldn't delete remote feature/frontend-rebuild"
git branch -D feature/frontend-rebuild || echo "  ! couldn't delete local feature/frontend-rebuild"

echo ""
echo "=== STEP 7: Wipe Puck/CMS deadweight and stale artifacts ==="
# Files and dirs to remove from the working tree on main.
# Everything stays in git history regardless.
TO_REMOVE=(
  "src/puck"
  "src/puck.config.tsx"
  "puck-data"
  "backups"
  "scripts/puck-backup.js"
  "scripts/puck-restore.js"
  "docs/CMS_DEVELOPER_OPERATIONS.md"
  "docs/CMS_OPERATOR_GUIDE.md"
  "docs/EDITOR_QA_CHECKLIST.md"
  "docs/SAFE_COMPONENT_EXPANSION_GUIDE.md"
  "src/app/StaticHomePage.tsx"
  "1b.avif"
  "STATUS.md"
  "DESIGN.md"
  "PUCK_PLAN.md"
  "graphify-out"
)

for path in "${TO_REMOVE[@]}"; do
  if [ -e "$path" ]; then
    git rm -rf --ignore-unmatch "$path" 2>/dev/null || rm -rf "$path"
    echo "  - removed $path"
  else
    echo "  ! $path not present, skipping"
  fi
done

echo ""
echo "=== STEP 8: Commit and push the cleanup ==="
if ! git diff --cached --quiet || ! git diff --quiet; then
  git add -A
  git commit -m "chore: remove Puck/CMS deadweight and stale artifacts

- Drop src/puck, src/puck.config.tsx, puck-data, backups, puck scripts
- Drop docs/CMS_* and EDITOR_QA_CHECKLIST and SAFE_COMPONENT_EXPANSION_GUIDE
- Drop StaticHomePage.tsx orphan, 1b.avif stray, STATUS.md, DESIGN.md, PUCK_PLAN.md, graphify-out

All recoverable from git history. Branch sprawl retired into archive/* tags."
  git push origin main
else
  echo "(no working-tree changes to commit)"
fi

echo ""
echo "=========================================="
echo "CLEANUP COMPLETE"
echo "=========================================="
echo ""
echo "State:"
echo "  - main is now at $(git rev-parse --short HEAD)"
echo "  - $(git tag -l 'archive/*' | wc -l) archive tags created"
echo ""
echo "Next steps (manual, in the Vercel dashboard):"
echo "  1. Vercel project Settings -> Git -> confirm Production Branch = main"
echo "  2. Trigger a production redeploy from main"
echo "  3. Verify the live site looks correct"
echo "  4. Then: turn on branch protection on main (Settings -> Branches in GitHub)"
echo "  5. Add Barry as a Vercel project member with comment access"
echo ""
echo "If anything looks wrong, restore any branch with:"
echo "  git branch <name> archive/<name>"
