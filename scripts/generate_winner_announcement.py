#!/usr/bin/env python3
"""Generate theme competition winner announcement graphics.

Pulls the current standings from data/themes.json + data/theme-votes.json +
data/theme-scores.json (same 50/50 model as the site) and renders a square and
landscape announcement with the top three and their prizes. Re-run once the
competition closes to refresh with the final winners.
"""

import base64
import json
import subprocess
import tempfile
import time
import urllib.request
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "public/assets/graphics"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

THEMES_PATH = BASE_DIR / "data" / "themes.json"
VOTES_PATH = BASE_DIR / "data" / "theme-votes.json"
SCORES_PATH = BASE_DIR / "data" / "theme-scores.json"

POINTS_PER_VOTE = 5
COMMUNITY_MAX = 100
JUDGE_WEIGHT = 0.5
COMMUNITY_WEIGHT = 0.5

PRIZES = {1: "5,000", 2: "3,000", 3: "2,000"}
PLACE_LABEL = {1: "1ST PLACE", 2: "2ND PLACE", 3: "3RD PLACE"}

OMARCHY_MARK_PATH = "m1200 1200h-480v-80h400v-1040h-479.996v160h-400v720h720v-720h-80v-80h159.996v880h-400v160h-640v-1200h1200zm-1120-80h480v-80h-400l.004-400h-80.004zm0-560h80.004v-400h400v-80h-480.004z"

OMARCHY_WORDMARK_SVG = """<svg viewBox="0 0 1215 285" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" fill-rule="evenodd" d="m720 120h-15v15h-14.998v14.999l-60.002.001v15.002l90-.002v.002h.002l-.002 89.998h-15v15h-13v15h-17v-89.998h-45v90l-45-.002v-89.998h-14.998v-30h14.998v-15.002h-14.998v-30.001h14.998v-75h15v-14.997h15v-15.002h105.002zm-90-.001h45v-74.997h-45z"/>
<path clip-rule="evenodd" fill-rule="evenodd" d="m105 30.002h15v14.997h15v180.001h-15v15h-15v15.002h-75v-15.002h-15v-15h-15v-180.001h15v-14.997h15v-15.002h75zm-60 194.998h45v-179.998h-45z"/>
<path d="m300 15h60v15h15v14.999h15v180.001h-15v15h-15v15h-15l-.004-209.998h-44.994v-.002h-.002v210.002h-45v-210h-44.998v179.997h-.002v30.003h-15v-15.002h-15v-15h-14.998v-180.001h14.998v-14.999h15v-15h60v-15h45z"/>
<path clip-rule="evenodd" fill-rule="evenodd" d="m555 225h-15v15h-15v15h-15v-105.001l-44.998.001v105.002h-45.002v-105.002h-15v-30.001h15v-75h15.002v-14.997h15v-15.002h105zm-89.998-105.001h44.998v-74.997h-44.998z"/>
<path d="m885 75h-15v15h-15v15h-15v-59.998h-45v179.998h45v-59.998h15v14.997h15v15.001h15v30h-15v15h-15v15.002l-105-.002v-210.001h14.998v-14.997h15.002v-15.002h105z"/>
<path d="m960 119.999h45v-104.999h15v15h15v14.999h15v75.001h15v15h-15v90h-15v15h-15v15h-15v-105h-45v105.002l-45-.002v-105h-30v-15h15v-15.001h15v-75h15v-14.997h15v-15.002h15z"/>
<path d="m1125 119.999h45v-104.999h15v15h15v15h15v180h-15v15h-15v15.002l-75-.002v-15h-15v-15h-15v-45.001h15v-14.997-.002h30v60h45v-75h-90v-105.001h15v-14.997h15v-15.002h15z"/>
</svg>"""


def round1(value):
    return round(value + 1e-9, 1)


def compute_winners():
    themes = json.loads(THEMES_PATH.read_text(encoding="utf-8"))
    votes = json.loads(VOTES_PATH.read_text(encoding="utf-8")).get("votes", {})
    scores = json.loads(SCORES_PATH.read_text(encoding="utf-8")).get("scores", {})

    rows = []
    for theme in themes:
        count = votes.get(theme["id"], 0)
        community = min(count * POINTS_PER_VOTE, COMMUNITY_MAX)
        judge = scores.get(theme["id"], {}).get("average")
        final = (
            JUDGE_WEIGHT * judge + COMMUNITY_WEIGHT * community
            if judge is not None
            else None
        )
        rows.append(
            {
                "theme": theme,
                "votes": count,
                "judge": judge,
                "final": final,
            }
        )

    ranked = [row for row in rows if row["final"] is not None]
    ranked.sort(
        key=lambda row: (
            -round1(row["final"]),
            -(row["judge"] or 0),
            -row["votes"],
            row["theme"]["name"],
        )
    )

    previous_score = None
    previous_rank = 0
    for index, row in enumerate(ranked, start=1):
        score = round1(row["final"])
        if previous_score is not None and score == previous_score:
            row["rank"] = previous_rank
        else:
            row["rank"] = index
            previous_rank = row["rank"]
            previous_score = score

    return ranked[:3]


def preview_data_uri(theme):
    shot = theme.get("screenshot")
    if not shot:
        return ""
    last_error = None
    for _ in range(3):
        try:
            if shot.startswith("http"):
                request = urllib.request.Request(shot, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(request, timeout=30) as response:
                    data = response.read()
                mime = "image/png" if shot.lower().endswith(".png") else "image/jpeg"
            else:
                path = BASE_DIR / "public" / shot.lstrip("/")
                data = path.read_bytes()
                mime = "image/png" if path.suffix.lower() == ".png" else "image/jpeg"
            return f"data:{mime};base64,{base64.b64encode(data).decode()}"
        except Exception as exc:
            last_error = exc
            time.sleep(1.5)
    print(f"warn: preview failed for {theme['name']}: {last_error}")
    return ""


BASE_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#08090c; font-family:'Plus Jakarta Sans',sans-serif; color:#f8fafc; overflow:hidden; position:relative; display:flex; flex-direction:column; }
.flag-bar { width:100%; height:6px; display:flex; z-index:10; }
.flag-green { width:33.333%; background:#10b981; box-shadow:0 0 16px rgba(16,185,129,.8);}
.flag-yellow { width:33.334%; background:#fbbf24; box-shadow:0 0 16px rgba(251,191,36,.9);}
.flag-red { width:33.333%; background:#ef4444; box-shadow:0 0 16px rgba(239,68,68,.8);}
.grid-pattern { position:absolute; inset:0; background-image:radial-gradient(circle at 1px 1px, rgba(255,255,255,.06) 1px, transparent 0); background-size:36px 36px; pointer-events:none; z-index:1; }
.glow { position:absolute; width:640px; height:640px; background:radial-gradient(circle, rgba(251,191,36,.14) 0%, transparent 65%); top:-140px; right:-140px; z-index:1; pointer-events:none; }
.glow-green { position:absolute; width:520px; height:520px; background:radial-gradient(circle, rgba(16,185,129,.1) 0%, transparent 65%); bottom:-120px; left:-120px; z-index:1; pointer-events:none; }
.mono { font-family:'JetBrains Mono',monospace; }
.header { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:5; }
.brand-left { display:flex; align-items:center; gap:14px; }
.logo-mark { width:42px; height:42px; color:#fbbf24; filter:drop-shadow(0 0 14px rgba(251,191,36,.55)); }
.wordmark { width:168px; height:34px; color:#fbbf24; }
.brand-sub { font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; letter-spacing:.42em; color:#10b981; padding-left:.42em; }
.prize-badge { display:flex; align-items:center; gap:9px; background:rgba(251,191,36,.1); border:1px solid rgba(251,191,36,.4); border-radius:9999px; padding:8px 18px; font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:800; color:#fbbf24; letter-spacing:.06em; }
.dot { width:8px; height:8px; background:#10b981; border-radius:50%; box-shadow:0 0 10px #10b981; }
.eyebrow { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; letter-spacing:.22em; color:#10b981; }
.title { font-size:64px; font-weight:800; letter-spacing:-.03em; line-height:1.0; color:#fff; }
.title span { color:#fbbf24; text-shadow:0 0 44px rgba(251,191,36,.45); }
.sub { font-size:17px; color:rgba(244,237,228,.7); margin-top:8px; }
.card { background:#0e0f14; border:1px solid rgba(255,255,255,.1); border-radius:18px; overflow:hidden; position:relative; z-index:5; }
.card.first { border:2px solid rgba(251,191,36,.62); background:linear-gradient(90deg, rgba(251,191,36,.14), rgba(14,15,20,.98) 55%); box-shadow:0 24px 60px -18px rgba(251,191,36,.35); }
.thumb { position:relative; overflow:hidden; background:#0b0c11; }
.thumb img { width:100%; height:100%; object-fit:cover; display:block; }
.thumb-fallback { display:flex; align-items:center; justify-content:center; width:100%; height:100%; font-family:'JetBrains Mono',monospace; font-weight:800; color:rgba(251,191,36,.35); }
.info { display:flex; flex-direction:column; justify-content:center; }
.place { display:inline-flex; align-self:flex-start; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:800; letter-spacing:.12em; padding:4px 12px; border-radius:9999px; margin-bottom:10px; }
.place.p1 { background:#fbbf24; color:#08090c; }
.place.p2 { background:rgba(16,185,129,.18); color:#10b981; border:1px solid rgba(16,185,129,.4); }
.place.p3 { background:rgba(255,255,255,.08); color:#fff; }
.name { font-size:34px; font-weight:800; letter-spacing:-.02em; line-height:1.05; color:#fff; }
.author { font-family:'JetBrains Mono',monospace; font-size:12px; color:rgba(255,255,255,.55); margin-top:4px; }
.prize { font-family:'JetBrains Mono',monospace; font-size:34px; font-weight:800; color:#fbbf24; margin-top:14px; line-height:1; }
.prize .cur { font-size:13px; color:rgba(255,255,255,.55); font-weight:700; }
.score { font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(255,255,255,.45); margin-top:6px; }
.footer { display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,.1); padding-top:14px; font-family:'JetBrains Mono',monospace; font-size:12px; color:rgba(255,255,255,.6); position:relative; z-index:5; }
.footer b { color:#fbbf24; }
"""


def header():
    return f"""
    <div class="header">
      <div class="brand-left">
        <svg class="logo-mark" viewBox="0 0 1200 1200"><path fill="currentColor" d="{OMARCHY_MARK_PATH}"/></svg>
        <div style="display:flex;flex-direction:column;gap:2px;">
          <div class="wordmark">{OMARCHY_WORDMARK_SVG}</div>
          <div class="brand-sub">ETHIOPIA</div>
        </div>
      </div>
      <div class="prize-badge"><span class="dot"></span><span>10,000 ETB PRIZE POOL</span></div>
    </div>
    """


def flags():
    return '<div class="flag-bar"><div class="flag-green"></div><div class="flag-yellow"></div><div class="flag-red"></div></div>'


def card_vertical(row):
    theme = row["theme"]
    place = PLACE_LABEL.get(row["rank"], f"RANK {row['rank']}")
    prize = PRIZES.get(row["rank"])
    preview = row.get("preview") or ""
    thumb = (
        f'<div class="thumb"><img src="{preview}" alt=""></div>'
        if preview
        else f'<div class="thumb"><div class="thumb-fallback">{theme["name"][0]}</div></div>'
    )
    prize_html = (
        f'<div class="prize">{prize} <span class="cur">ETB</span></div>' if prize else ""
    )
    return f"""
    <div class="card">
      {thumb}
      <div class="info" style="padding:18px 20px 20px;">
        <span class="place p{row['rank']}">{place}</span>
        <div class="name">{theme['author']}</div>
        <div class="author">{theme['name']}</div>
        {prize_html}
        <div class="score">final {round1(row['final'])} · {row['votes']} votes</div>
      </div>
    </div>
    """


def card_horizontal(row):
    theme = row["theme"]
    place = PLACE_LABEL.get(row["rank"], f"RANK {row['rank']}")
    prize = PRIZES.get(row["rank"])
    preview = row.get("preview") or ""
    thumb = (
        f'<div class="thumb"><img src="{preview}" alt=""></div>'
        if preview
        else f'<div class="thumb"><div class="thumb-fallback" style="font-size:54px;">{theme["name"][0]}</div></div>'
    )
    prize_html = (
        f'<div class="prize" style="font-size:42px;">{prize} <span class="cur">ETB</span></div>'
        if prize
        else ""
    )
    return f"""
    <div class="card first">
      {thumb}
      <div class="info" style="flex:1;padding:24px 30px;">
        <span class="place p1">{place}</span>
        <div class="name" style="font-size:42px;">{theme['author']}</div>
        <div class="author" style="font-size:13px;">{theme['name']}</div>
        {prize_html}
        <div class="score" style="font-size:12px;">final {round1(row['final'])} / 100 · {row['votes']} votes · judge {round1(row['judge'])}</div>
      </div>
    </div>
    """


def square(winners):
    first = card_horizontal(winners[0])
    rest = "".join(card_vertical(row) for row in winners[1:3])
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{BASE_CSS}
body {{ width:1200px; height:1200px; background:radial-gradient(circle at 84% 10%, rgba(251,191,36,.12) 0%, transparent 46%), #08090c; }}
.wrap {{ position:relative; z-index:5; width:100%; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:40px 54px 34px; }}
.hero {{ margin-top:26px; }}
.card.first {{ display:flex; height:250px; }}
.card.first .thumb {{ width:430px; flex-shrink:0; }}
.podium {{ display:flex; flex-direction:column; gap:16px; margin:24px 0; }}
.podium .row2 {{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }}
.podium .row2 .thumb {{ height:150px; }}
.podium .row2 .name {{ font-size:26px; }}
.podium .row2 .prize {{ font-size:28px; margin-top:10px; }}
</style></head><body>
{flags()}
<div class="grid-pattern"></div><div class="glow"></div><div class="glow-green"></div>
<div class="wrap">
  {header()}
  <div class="hero">
    <div class="eyebrow">[ THEME COMPETITION — RESULTS ]</div>
    <h1 class="title" style="margin-top:10px;font-size:82px;">THE <span>WINNERS</span></h1>
    <p class="sub">Omarchy Ethiopia Theme Competition 2026</p>
  </div>
  <div class="podium">
    {first}
    <div class="row2">{rest}</div>
  </div>
  <div class="footer"><div>omarchy.org.et • <b>Omarchy Ethiopia</b></div><div>Theme Competition 2026</div></div>
</div>
</body></html>"""


def landscape(winners):
    first = card_horizontal(winners[0])
    rest = "".join(card_vertical(row) for row in winners[1:3])
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{BASE_CSS}
body {{ width:1200px; height:675px; }}
.wrap {{ position:relative; z-index:5; width:100%; height:100%; display:flex; gap:26px; padding:26px 40px 24px; }}
.left {{ flex:1.05; display:flex; flex-direction:column; justify-content:space-between; }}
.right {{ flex:.95; display:flex; flex-direction:column; gap:14px; justify-content:center; }}
.card.first {{ display:flex; flex-direction:column; }}
.card.first .thumb {{ height:230px; }}
.card.first .info {{ padding:18px 22px !important; }}
.card.first .name {{ font-size:32px !important; }}
.card.first .prize {{ font-size:32px !important; }}
.right .thumb {{ height:112px; }}
.right .info {{ padding:14px 16px 16px !important; }}
.right .name {{ font-size:22px; }}
.right .prize {{ font-size:24px; margin-top:8px; }}
.title {{ font-size:52px; }}
</style></head><body>
{flags()}
<div class="grid-pattern"></div><div class="glow"></div>
<div class="wrap">
  <div class="left">
    {header()}
    <div>
      <div class="eyebrow">[ THEME COMPETITION — RESULTS ]</div>
      <h1 class="title" style="margin-top:8px;">THE <span>WINNERS</span></h1>
      <p class="sub">Omarchy Ethiopia Theme Competition 2026</p>
    </div>
    {first}
    <div class="footer"><div>omarchy.org.et • <b>Omarchy Ethiopia</b></div><div>2026</div></div>
  </div>
  <div class="right">
    {rest}
  </div>
</div>
</body></html>"""


def story(winners):
    first = card_horizontal(winners[0])
    rest = "".join(card_vertical(row) for row in winners[1:3])
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{BASE_CSS}
body {{ width:1080px; height:1920px; background:radial-gradient(circle at 50% 0%, rgba(251,191,36,.12) 0%, transparent 48%), #08090c; }}
.wrap {{ position:relative; z-index:5; width:100%; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:46px 52px 40px; }}
.header {{ flex-direction:column; gap:16px; justify-content:center; }}
.hero {{ text-align:center; }}
.title {{ font-size:92px; }}
.sub {{ font-size:20px; }}
.podium {{ display:flex; flex-direction:column; gap:20px; }}
.card.first {{ display:flex; flex-direction:column; }}
.card.first .thumb {{ height:320px; }}
.card.first .info {{ padding:22px 26px !important; }}
.card.first .name {{ font-size:44px !important; }}
.card.first .prize {{ font-size:46px !important; }}
.row2 {{ display:grid; grid-template-columns:1fr 1fr; gap:18px; }}
.row2 .thumb {{ height:180px; }}
.row2 .name {{ font-size:28px; }}
.row2 .prize {{ font-size:30px; margin-top:10px; }}
.footer {{ justify-content:center; gap:14px; font-size:14px; }}
</style></head><body>
{flags()}
<div class="grid-pattern"></div><div class="glow"></div><div class="glow-green"></div>
<div class="wrap">
  {header()}
  <div class="hero">
    <div class="eyebrow">[ THEME COMPETITION — RESULTS ]</div>
    <h1 class="title" style="margin-top:14px;">THE <span>WINNERS</span></h1>
    <p class="sub">Omarchy Ethiopia Theme Competition 2026</p>
  </div>
  <div class="podium">
    {first}
    <div class="row2">{rest}</div>
  </div>
  <div class="footer"><div>omarchy.org.et • <b>Omarchy Ethiopia</b> • Theme Competition 2026</div></div>
</div>
</body></html>"""


def generate_png(html, path, w, h):
    tmp = path.with_suffix(".tmp.html")
    tmp.write_text(html, encoding="utf-8")
    try:
        with tempfile.TemporaryDirectory() as profile:
            cmd = [
                "chromium", "--headless", "--disable-gpu", "--no-sandbox",
                "--disable-dev-shm-usage", "--no-first-run", "--hide-scrollbars",
                f"--user-data-dir={profile}",
                f"--window-size={w},{h}",
                "--force-device-scale-factor=1",
                "--virtual-time-budget=8000",
                f"--screenshot={path}", f"file://{tmp.resolve()}",
            ]
            try:
                result = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
            except subprocess.TimeoutExpired:
                print(f"TIMEOUT {path.name}")
                return
            if result.returncode != 0:
                print(f"ERR {path.name}: {result.stderr[:400]}")
            else:
                print(f"OK {path.name} ({w}x{h})")
    finally:
        tmp.unlink(missing_ok=True)


def main():
    winners = compute_winners()
    if len(winners) < 3:
        print("error: need at least three judged themes to build the announcement")
        return 1

    for row in winners:
        row["preview"] = preview_data_uri(row["theme"])
        print(f"#{row['rank']} {row['theme']['name']} — {row['theme']['author']} — final {round1(row['final'])}")

    generate_png(square(winners), OUTPUT_DIR / "theme-winners-square.png", 1200, 1200)
    generate_png(landscape(winners), OUTPUT_DIR / "theme-winners-landscape.png", 1200, 675)
    generate_png(story(winners), OUTPUT_DIR / "theme-winners-story.png", 1080, 1920)
    print("Winner announcement graphics done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
