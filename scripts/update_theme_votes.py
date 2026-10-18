#!/usr/bin/env python3
"""Refresh the theme competition vote counts from GitHub reactions.

Counts one vote per GitHub user per theme, excluding the theme author's own
account (derived from the repo owner, with optional `github` / `github_aliases`
overrides in themes.json). Runs in CI with an authenticated `gh`, so it never
touches the 60/hr unauthenticated limit that browsers share. Writes
data/theme-votes.json only when the counts actually change.
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
THEMES_PATH = BASE_DIR / "data" / "themes.json"
OUTPUT_PATH = BASE_DIR / "data" / "theme-votes.json"

POSITIVE_REACTIONS = {"+1", "heart", "hooray", "rocket", "laugh"}
REPO = os.environ.get("GITHUB_REPOSITORY", "nebiyuelias1/omarchy-ethiopia")


def author_logins(theme):
    logins = set()

    override = theme.get("github")
    if isinstance(override, str) and override.strip():
        logins.add(override.strip().lower())

    for alias in theme.get("github_aliases") or []:
        if isinstance(alias, str) and alias.strip():
            logins.add(alias.strip().lower())

    match = re.match(r"https?://github\.com/([^/]+)/", theme.get("link") or "")
    if match:
        logins.add(match.group(1).lower())

    return logins


def fetch_reactions(number):
    result = subprocess.run(
        [
            "gh", "api",
            f"repos/{REPO}/issues/{number}/reactions?per_page=100",
            "--paginate", "--slurp",
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"warn: could not read reactions for #{number}: {result.stderr.strip()}", file=sys.stderr)
        return None

    try:
        pages = json.loads(result.stdout)
    except json.JSONDecodeError:
        return None

    reactions = []
    for page in pages if isinstance(pages, list) else [pages]:
        if isinstance(page, list):
            reactions.extend(page)
        else:
            reactions.append(page)
    return reactions


def count_votes(reactions, excluded):
    voters = set()
    for reaction in reactions:
        content = (reaction.get("content") or "").lower()
        login = ((reaction.get("user") or {}).get("login") or "").lower()
        if content not in POSITIVE_REACTIONS:
            continue
        if not login or login in excluded:
            continue
        voters.add(login)
    return len(voters)


def now_iso():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def main():
    if not THEMES_PATH.exists():
        print(f"error: {THEMES_PATH} not found", file=sys.stderr)
        return 1

    themes = json.loads(THEMES_PATH.read_text(encoding="utf-8"))

    votes = {}
    for theme in themes:
        number = theme.get("issue")
        if not isinstance(number, int):
            continue
        reactions = fetch_reactions(number)
        if reactions is None:
            votes[theme["id"]] = 0
            continue
        votes[theme["id"]] = count_votes(reactions, author_logins(theme))

    existing = None
    if OUTPUT_PATH.exists():
        try:
            existing = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            existing = None

    if existing and existing.get("votes") == votes:
        print(f"No vote changes: {votes}")
        return 0

    payload = {"updatedAt": now_iso(), "votes": votes}
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Updated {OUTPUT_PATH.relative_to(BASE_DIR)} -> {votes}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
