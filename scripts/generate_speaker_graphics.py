import base64
import os
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "public/assets/graphics"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def get_base64_image(path):
    with open(path, "rb") as f:
        data = f.read()
    ext = Path(path).suffix.lower()
    mime = "image/jpeg" if ext in [".jpg", ".jpeg"] else "image/png" if ext == ".png" else "image/svg+xml"
    return f"data:{mime};base64,{base64.b64encode(data).decode('utf-8')}"

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

COMMON_FONTS_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #08090c;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #f8fafc;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.flag-bar {
  position: relative;
  width: 100%;
  height: 6px;
  display: flex;
  z-index: 10;
}
.flag-green { width: 33.333%; background: #10b981; box-shadow: 0 0 16px rgba(16, 185, 129, 0.8); }
.flag-yellow { width: 33.334%; background: #fbbf24; box-shadow: 0 0 16px rgba(251, 191, 36, 0.9); }
.flag-red { width: 33.333%; background: #ef4444; box-shadow: 0 0 16px rgba(239, 68, 68, 0.8); }

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
  background-size: 36px 36px;
  pointer-events: none;
  z-index: 2;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.brand-logo-mark {
  width: 52px;
  height: 52px;
  color: #fbbf24;
  filter: drop-shadow(0 0 16px rgba(251, 191, 36, 0.5));
}

.brand-text-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-wordmark {
  width: 220px;
  height: 48px;
  color: #fbbf24;
  filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.35));
}

.brand-ethiopia-tag {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ethiopia-line {
  width: 18px;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, #fbbf24);
}

.ethiopia-txt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.5em;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  padding-left: 0.5em;
}

.meetup-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: 9999px;
  background: rgba(251, 191, 36, 0.07);
  border: 1px solid rgba(251, 191, 36, 0.35);
  box-shadow: 0 0 25px rgba(251, 191, 36, 0.12);
}

.pulse-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-green { background: #10b981; box-shadow: 0 0 8px #10b981; }
.dot-yellow { background: #fbbf24; box-shadow: 0 0 8px #fbbf24; }
.dot-red { background: #ef4444; box-shadow: 0 0 8px #ef4444; }

.badge-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #fbbf24;
  text-transform: uppercase;
}

.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.partner-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.partner-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #64748b;
  text-transform: uppercase;
}

.partner-logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
}

.footer-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-meta-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #94a3b8;
  text-transform: uppercase;
}
"""

def render_single_speaker_square(speaker, tefer_b64):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  {COMMON_FONTS_CSS}

  body {{
    width: 1200px;
    height: 1200px;
  }}

  .glow-top-left {{
    position: absolute;
    top: -120px;
    left: -100px;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }}

  .glow-speaker-gold {{
    position: absolute;
    top: 240px;
    right: 30px;
    width: 620px;
    height: 680px;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(251, 191, 36, 0) 65%);
    pointer-events: none;
    z-index: 1;
  }}

  .glow-bottom-red {{
    position: absolute;
    bottom: -150px;
    right: 150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }}

  .content-wrapper {{
    position: relative;
    z-index: 5;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px 44px 56px;
  }}

  .body-grid {{
    display: grid;
    grid-template-columns: 1fr 450px;
    gap: 52px;
    align-items: center;
    margin: auto 0;
  }}

  .eyebrow-container {{
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 22px;
  }}

  .eyebrow-bracket {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    color: #10b981;
  }}

  .eyebrow-text {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #10b981;
    text-transform: uppercase;
  }}

  .talk-title {{
    font-size: {speaker.get("title_font_size", "40px")};
    font-weight: 800;
    line-height: 1.18;
    letter-spacing: -0.025em;
    color: #ffffff;
    margin-bottom: 20px;
    text-wrap: balance;
  }}

  .talk-title-highlight {{
    color: #fbbf24;
    text-shadow: 0 0 35px rgba(251, 191, 36, 0.45);
  }}

  .talk-subtitle {{
    font-size: 17px;
    line-height: 1.55;
    color: #94a3b8;
    margin-bottom: 32px;
    max-width: 580px;
  }}

  .speaker-card-panel {{
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }}

  .speaker-name {{
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -0.015em;
    color: #ffffff;
  }}

  .speaker-role {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 500;
    color: #fbbf24;
    letter-spacing: 0.02em;
  }}

  .portrait-container {{
    position: relative;
    width: 450px;
    height: 560px;
    display: flex;
    align-items: center;
    justify-content: center;
  }}

  .portrait-frame {{
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 32px;
    overflow: hidden;
    border: 2px solid rgba(251, 191, 36, 0.45);
    box-shadow: 
      0 20px 60px -10px rgba(0, 0, 0, 0.8),
      0 0 50px rgba(251, 191, 36, 0.25);
    background: #0e0f16;
  }}

  .portrait-image {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: {speaker.get("img_position", "center 15%")};
    display: block;
  }}
</style>
</head>
<body>
  <div class="glow-top-left"></div>
  <div class="glow-speaker-gold"></div>
  <div class="glow-bottom-red"></div>
  <div class="grid-pattern"></div>

  <div class="flag-bar">
    <div class="flag-green"></div>
    <div class="flag-yellow"></div>
    <div class="flag-red"></div>
  </div>

  <div class="content-wrapper">
    <header class="header">
      <div class="brand-group">
        <svg class="brand-logo-mark" viewBox="0 0 1200 1200" fill="currentColor">
          <path clip-rule="evenodd" fill-rule="evenodd" d="{OMARCHY_MARK_PATH}"/>
        </svg>
        <div class="brand-text-col">
          <div class="brand-wordmark">{OMARCHY_WORDMARK_SVG}</div>
          <div class="brand-ethiopia-tag">
            <div class="ethiopia-line"></div>
            <span class="ethiopia-txt">ETHIOPIA</span>
            <div class="ethiopia-line" style="background: linear-gradient(270deg, transparent, #fbbf24);"></div>
          </div>
        </div>
      </div>

      <div class="meetup-badge">
        <div class="pulse-indicator">
          <div class="pulse-dot dot-green"></div>
          <div class="pulse-dot dot-yellow"></div>
          <div class="pulse-dot dot-red"></div>
        </div>
        <span class="badge-text">MEETUP 2026</span>
      </div>
    </header>

    <main class="body-grid">
      <div class="details-col">
        <div class="eyebrow-container">
          <span class="eyebrow-bracket">[</span>
          <span class="eyebrow-text">FEATURED SPEAKER</span>
          <span class="eyebrow-bracket">]</span>
        </div>

        <h1 class="talk-title">
          {speaker["formatted_title"]}
        </h1>

        <p class="talk-subtitle">
          {speaker["abstract_summary"]}
        </p>

        <div class="speaker-card-panel">
          <h2 class="speaker-name">{speaker["name"]}</h2>
          <p class="speaker-role">{speaker["role"]}</p>
        </div>
      </div>

      <div class="portrait-container">
        <div class="portrait-frame">
          <img src="{speaker['photo_b64']}" alt="{speaker['name']}" class="portrait-image" />
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="partner-block">
        <span class="partner-label">Official Event Partner</span>
        <img src="{tefer_b64}" alt="Tefer" class="partner-logo-img" />
      </div>

      <div class="footer-meta">
        <span class="footer-meta-text">ADDIS ABABA &bull; 2026</span>
      </div>
    </footer>
  </div>

  <div class="flag-bar" style="height: 4px;">
    <div class="flag-green" style="box-shadow: none;"></div>
    <div class="flag-yellow" style="box-shadow: none;"></div>
    <div class="flag-red" style="box-shadow: none;"></div>
  </div>
</body>
</html>
"""

def render_single_speaker_landscape(speaker, tefer_b64):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  {COMMON_FONTS_CSS}

  body {{
    width: 1200px;
    height: 675px;
  }}

  .glow-top-left {{
    position: absolute;
    top: -100px;
    left: -80px;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }}

  .glow-speaker-gold {{
    position: absolute;
    top: 80px;
    right: 40px;
    width: 480px;
    height: 520px;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(251, 191, 36, 0) 65%);
    pointer-events: none;
    z-index: 1;
  }}

  .content-wrapper {{
    position: relative;
    z-index: 5;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 26px 44px 22px 44px;
  }}

  .brand-logo-mark {{ width: 42px; height: 42px; }}
  .brand-wordmark {{ width: 180px; height: 38px; }}
  .brand-ethiopia-tag .ethiopia-txt {{ font-size: 11px; }}
  .meetup-badge {{ padding: 7px 16px; }}
  .badge-text {{ font-size: 12px; }}

  .body-grid {{
    display: grid;
    grid-template-columns: 1fr 310px;
    gap: 40px;
    align-items: center;
    margin: auto 0;
  }}

  .eyebrow-container {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }}

  .eyebrow-bracket {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #10b981;
  }}

  .eyebrow-text {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #10b981;
    text-transform: uppercase;
  }}

  .talk-title {{
    font-size: 30px;
    font-weight: 800;
    line-height: 1.18;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 12px;
  }}

  .talk-title-highlight {{
    color: #fbbf24;
    text-shadow: 0 0 25px rgba(251, 191, 36, 0.45);
  }}

  .talk-subtitle {{
    font-size: 14px;
    line-height: 1.48;
    color: #94a3b8;
    margin-bottom: 20px;
    max-width: 680px;
  }}

  .speaker-card-panel {{
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }}

  .speaker-name {{
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #ffffff;
  }}

  .speaker-role {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    font-weight: 500;
    color: #fbbf24;
  }}

  .portrait-container {{
    position: relative;
    width: 310px;
    height: 380px;
  }}

  .portrait-frame {{
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid rgba(251, 191, 36, 0.45);
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(251, 191, 36, 0.22);
    background: #0e0f16;
  }}

  .portrait-image {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: {speaker.get("img_position", "center 15%")};
    display: block;
  }}

  .footer {{ padding-top: 16px; }}
  .partner-logo-img {{ height: 30px; }}
  .footer-meta-text {{ font-size: 11px; }}
</style>
</head>
<body>
  <div class="glow-top-left"></div>
  <div class="glow-speaker-gold"></div>
  <div class="grid-pattern"></div>

  <div class="flag-bar" style="height: 4px;">
    <div class="flag-green"></div>
    <div class="flag-yellow"></div>
    <div class="flag-red"></div>
  </div>

  <div class="content-wrapper">
    <header class="header">
      <div class="brand-group">
        <svg class="brand-logo-mark" viewBox="0 0 1200 1200" fill="currentColor">
          <path clip-rule="evenodd" fill-rule="evenodd" d="{OMARCHY_MARK_PATH}"/>
        </svg>
        <div class="brand-text-col">
          <div class="brand-wordmark">{OMARCHY_WORDMARK_SVG}</div>
          <div class="brand-ethiopia-tag">
            <div class="ethiopia-line"></div>
            <span class="ethiopia-txt">ETHIOPIA</span>
            <div class="ethiopia-line" style="background: linear-gradient(270deg, transparent, #fbbf24);"></div>
          </div>
        </div>
      </div>

      <div class="meetup-badge">
        <div class="pulse-indicator">
          <div class="pulse-dot dot-green"></div>
          <div class="pulse-dot dot-yellow"></div>
          <div class="pulse-dot dot-red"></div>
        </div>
        <span class="badge-text">MEETUP 2026</span>
      </div>
    </header>

    <main class="body-grid">
      <div class="details-col">
        <div class="eyebrow-container">
          <span class="eyebrow-bracket">[</span>
          <span class="eyebrow-text">FEATURED SPEAKER</span>
          <span class="eyebrow-bracket">]</span>
        </div>

        <h1 class="talk-title">
          {speaker["formatted_title"]}
        </h1>

        <p class="talk-subtitle">
          {speaker["abstract_summary"]}
        </p>

        <div class="speaker-card-panel">
          <h2 class="speaker-name">{speaker["name"]}</h2>
          <p class="speaker-role">{speaker["role"]}</p>
        </div>
      </div>

      <div class="portrait-container">
        <div class="portrait-frame">
          <img src="{speaker['photo_b64']}" alt="{speaker['name']}" class="portrait-image" />
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="partner-block">
        <span class="partner-label">Official Event Partner</span>
        <img src="{tefer_b64}" alt="Tefer" class="partner-logo-img" />
      </div>

      <div class="footer-meta">
        <span class="footer-meta-text">ADDIS ABABA &bull; 2026</span>
      </div>
    </footer>
  </div>

  <div class="flag-bar" style="height: 3px;">
    <div class="flag-green" style="box-shadow: none;"></div>
    <div class="flag-yellow" style="box-shadow: none;"></div>
    <div class="flag-red" style="box-shadow: none;"></div>
  </div>
</body>
</html>
"""

def render_triple_lineup_square(speakers, tefer_b64):
    cards_html = ""
    for s in speakers:
        cards_html += f"""
      <div class="speaker-card">
        <div class="card-top-row">
          <div class="mini-portrait-frame">
            <img src="{s['photo_b64']}" class="mini-portrait-img" style="object-position: {s.get('img_position', 'center 15%')};" />
          </div>
          <div>
            <h2 class="card-name">{s['name']}</h2>
            <p class="card-role">{s['role']}</p>
          </div>
        </div>

        <div class="card-talk-box">
          <div class="talk-box-label">SESSION TALK</div>
          <div class="card-talk-title">&ldquo;{s['talk']}&rdquo;</div>
          <p class="card-talk-desc">{s['abstract_short']}</p>
        </div>
      </div>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  {COMMON_FONTS_CSS}

  body {{
    width: 1200px;
    height: 1200px;
  }}

  .glow-top-left {{
    position: absolute;
    top: -120px;
    left: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }}

  .glow-center-gold {{
    position: absolute;
    top: 300px;
    left: 300px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0) 65%);
    pointer-events: none;
    z-index: 1;
  }}

  .glow-bottom-red {{
    position: absolute;
    bottom: -150px;
    right: 150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }}

  .content-wrapper {{
    position: relative;
    z-index: 5;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 50px 42px 50px;
  }}

  .headline-section {{
    text-align: center;
    margin: 10px 0 20px 0;
  }}

  .lineup-kicker {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.25em;
    color: #10b981;
    text-transform: uppercase;
    margin-bottom: 10px;
  }}

  .lineup-headline {{
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
  }}

  .lineup-headline span {{
    color: #fbbf24;
    text-shadow: 0 0 30px rgba(251, 191, 36, 0.4);
  }}

  .triple-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin: auto 0;
  }}

  .speaker-card {{
    background: #0e0f16;
    border: 1.5px solid rgba(251, 191, 36, 0.35);
    border-radius: 22px;
    padding: 26px 20px;
    box-shadow: 0 16px 40px -10px rgba(0,0,0,0.8), 0 0 30px rgba(251, 191, 36, 0.12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 590px;
  }}

  .card-top-row {{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 14px;
    margin-bottom: 16px;
  }}

  .mini-portrait-frame {{
    width: 120px;
    height: 120px;
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid #fbbf24;
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
    flex-shrink: 0;
  }}

  .mini-portrait-img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }}

  .card-name {{
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin-bottom: 4px;
  }}

  .card-role {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #94a3b8;
  }}

  .card-talk-box {{
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 14px;
    padding: 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }}

  .talk-box-label {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #10b981;
    text-transform: uppercase;
    margin-bottom: 6px;
  }}

  .card-talk-title {{
    font-size: 15px;
    font-weight: 700;
    color: #fbbf24;
    line-height: 1.35;
    margin-bottom: 6px;
  }}

  .card-talk-desc {{
    font-size: 12px;
    line-height: 1.45;
    color: #cbd5e1;
  }}
</style>
</head>
<body>
  <div class="glow-top-left"></div>
  <div class="glow-center-gold"></div>
  <div class="glow-bottom-red"></div>
  <div class="grid-pattern"></div>

  <div class="flag-bar">
    <div class="flag-green"></div>
    <div class="flag-yellow"></div>
    <div class="flag-red"></div>
  </div>

  <div class="content-wrapper">
    <header class="header">
      <div class="brand-group">
        <svg class="brand-logo-mark" viewBox="0 0 1200 1200" fill="currentColor">
          <path clip-rule="evenodd" fill-rule="evenodd" d="{OMARCHY_MARK_PATH}"/>
        </svg>
        <div class="brand-text-col">
          <div class="brand-wordmark">{OMARCHY_WORDMARK_SVG}</div>
          <div class="brand-ethiopia-tag">
            <div class="ethiopia-line"></div>
            <span class="ethiopia-txt">ETHIOPIA</span>
            <div class="ethiopia-line" style="background: linear-gradient(270deg, transparent, #fbbf24);"></div>
          </div>
        </div>
      </div>

      <div class="meetup-badge">
        <div class="pulse-indicator">
          <div class="pulse-dot dot-green"></div>
          <div class="pulse-dot dot-yellow"></div>
          <div class="pulse-dot dot-red"></div>
        </div>
        <span class="badge-text">MEETUP 2026 // SPEAKERS</span>
      </div>
    </header>

    <div class="headline-section">
      <div class="lineup-kicker">// FEATURED SPEAKERS</div>
      <h1 class="lineup-headline">Meet The Speakers At <span>Omarchy Ethiopia</span></h1>
    </div>

    <main class="triple-grid">
      {cards_html}
    </main>

    <footer class="footer">
      <div class="partner-block">
        <span class="partner-label">Official Event Partner</span>
        <img src="{tefer_b64}" alt="Tefer" class="partner-logo-img" />
      </div>

      <div class="footer-meta">
        <span class="footer-meta-text">ADDIS ABABA &bull; 2026</span>
      </div>
    </footer>
  </div>

  <div class="flag-bar" style="height: 4px;">
    <div class="flag-green" style="box-shadow: none;"></div>
    <div class="flag-yellow" style="box-shadow: none;"></div>
    <div class="flag-red" style="box-shadow: none;"></div>
  </div>
</body>
</html>
"""

def render_triple_lineup_landscape(speakers, tefer_b64):
    cards_html = ""
    for s in speakers:
        cards_html += f"""
      <div class="speaker-card">
        <div class="card-top-row">
          <div class="mini-portrait-frame">
            <img src="{s['photo_b64']}" class="mini-portrait-img" style="object-position: {s.get('img_position', 'center 15%')};" />
          </div>
          <div>
            <h2 class="card-name">{s['name']}</h2>
            <p class="card-role">{s['role']}</p>
          </div>
        </div>

        <div class="card-talk-box">
          <div class="talk-box-label">SESSION TALK</div>
          <div class="card-talk-title">&ldquo;{s['talk']}&rdquo;</div>
          <p class="card-talk-desc">{s['abstract_short']}</p>
        </div>
      </div>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  {COMMON_FONTS_CSS}

  body {{
    width: 1200px;
    height: 675px;
  }}

  .glow-top-left {{
    position: absolute;
    top: -100px;
    left: -80px;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }}

  .glow-center-gold {{
    position: absolute;
    top: 150px;
    left: 400px;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.14) 0%, rgba(251, 191, 36, 0) 65%);
    pointer-events: none;
    z-index: 1;
  }}

  .content-wrapper {{
    position: relative;
    z-index: 5;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px 36px 18px 36px;
  }}

  .brand-logo-mark {{ width: 36px; height: 36px; }}
  .brand-wordmark {{ width: 160px; height: 34px; }}
  .brand-ethiopia-tag .ethiopia-txt {{ font-size: 10px; }}
  .meetup-badge {{ padding: 5px 12px; }}
  .badge-text {{ font-size: 11px; }}

  .triple-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin: auto 0;
  }}

  .speaker-card {{
    background: #0e0f16;
    border: 1.5px solid rgba(251, 191, 36, 0.35);
    border-radius: 18px;
    padding: 16px 14px;
    box-shadow: 0 12px 30px -10px rgba(0,0,0,0.8), 0 0 20px rgba(251, 191, 36, 0.12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  .card-top-row {{
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }}

  .mini-portrait-frame {{
    width: 68px;
    height: 68px;
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid #fbbf24;
    box-shadow: 0 0 14px rgba(251, 191, 36, 0.3);
    flex-shrink: 0;
  }}

  .mini-portrait-img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }}

  .card-name {{
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin-bottom: 2px;
  }}

  .card-role {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #94a3b8;
  }}

  .card-talk-box {{
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 10px 12px;
  }}

  .talk-box-label {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #10b981;
    text-transform: uppercase;
    margin-bottom: 3px;
  }}

  .card-talk-title {{
    font-size: 12.5px;
    font-weight: 700;
    color: #fbbf24;
    line-height: 1.3;
    margin-bottom: 3px;
  }}

  .card-talk-desc {{
    font-size: 10.5px;
    line-height: 1.35;
    color: #cbd5e1;
  }}

  .footer {{ padding-top: 10px; }}
  .partner-logo-img {{ height: 24px; }}
  .footer-meta-text {{ font-size: 10.5px; }}
</style>
</head>
<body>
  <div class="glow-top-left"></div>
  <div class="glow-center-gold"></div>
  <div class="grid-pattern"></div>

  <div class="flag-bar" style="height: 3px;">
    <div class="flag-green"></div>
    <div class="flag-yellow"></div>
    <div class="flag-red"></div>
  </div>

  <div class="content-wrapper">
    <header class="header">
      <div class="brand-group">
        <svg class="brand-logo-mark" viewBox="0 0 1200 1200" fill="currentColor">
          <path clip-rule="evenodd" fill-rule="evenodd" d="{OMARCHY_MARK_PATH}"/>
        </svg>
        <div class="brand-text-col">
          <div class="brand-wordmark">{OMARCHY_WORDMARK_SVG}</div>
          <div class="brand-ethiopia-tag">
            <div class="ethiopia-line"></div>
            <span class="ethiopia-txt">ETHIOPIA</span>
            <div class="ethiopia-line" style="background: linear-gradient(270deg, transparent, #fbbf24);"></div>
          </div>
        </div>
      </div>

      <div class="meetup-badge">
        <div class="pulse-indicator">
          <div class="pulse-dot dot-green"></div>
          <div class="pulse-dot dot-yellow"></div>
          <div class="pulse-dot dot-red"></div>
        </div>
        <span class="badge-text">MEETUP 2026 // SPEAKERS</span>
      </div>
    </header>

    <main class="triple-grid">
      {cards_html}
    </main>

    <footer class="footer">
      <div class="partner-block">
        <span class="partner-label">Official Event Partner</span>
        <img src="{tefer_b64}" alt="Tefer" class="partner-logo-img" />
      </div>

      <div class="footer-meta">
        <span class="footer-meta-text">ADDIS ABABA &bull; 2026</span>
      </div>
    </footer>
  </div>

  <div class="flag-bar" style="height: 3px;">
    <div class="flag-green" style="box-shadow: none;"></div>
    <div class="flag-yellow" style="box-shadow: none;"></div>
    <div class="flag-red" style="box-shadow: none;"></div>
  </div>
</body>
</html>
"""

def generate_png_from_html(html_content, output_path, width=1200, height=1200):
    temp_html = output_path.with_suffix(".tmp.html")
    temp_html.write_text(html_content, encoding="utf-8")
    
    cmd = [
        "chromium",
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        f"--window-size={width},{height}",
        f"--screenshot={output_path}",
        f"file://{temp_html.resolve()}"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if temp_html.exists():
        temp_html.unlink()
    if res.returncode != 0:
        print(f"Error rendering {output_path}: {res.stderr}")
    else:
        print(f"Rendered: {output_path.name} ({width}x{height})")

def main():
    dagim_img = get_base64_image(BASE_DIR / "public/assets/speakers/dagim-gizachew.jpg")
    fraol_img = get_base64_image(BASE_DIR / "public/assets/speakers/fraol-lemecha.jpg")
    eyuel_img = get_base64_image(BASE_DIR / "public/assets/speakers/eyuel-getachew.jpg")
    tefer_img = get_base64_image(BASE_DIR / "public/assets/partners/tefer-logo-white.png")

    dagim_data = {
        "slug": "dagim-gizachew",
        "name": "Dagim Gizachew Astatkie",
        "role": "Backend Engineer at klik.et",
        "talk": "Vicinae: High-Performance Desktop Launcher, Raycast Compatibility & Beyond",
        "photo_b64": dagim_img,
        "img_position": "center 20%",
        "title_font_size": "38px",
        "formatted_title": '<span class="talk-title-highlight">&ldquo;Vicinae:</span> High-Performance Desktop Launcher, Raycast Compatibility &amp; Beyond&rdquo;',
        "abstract_summary": "Extensible Linux command center with instant fuzzy search, clipboard history, and native Raycast React extension compatibility.",
        "abstract_short": "Fast fuzzy search, clipboard history, and Raycast React extensions natively on Linux.",
    }

    fraol_data = {
        "slug": "fraol-lemecha",
        "name": "Fraol Lemecha",
        "role": "Software Developer at EVpin",
        "talk": "Nix for Omarchers",
        "photo_b64": fraol_img,
        "img_position": "center 22%",
        "title_font_size": "44px",
        "formatted_title": '<span class="talk-title-highlight">&ldquo;Nix</span> for Omarchers&rdquo;',
        "abstract_summary": "Demystifying Nix and NixOS: Why declarative configuration matters, how to supercharge development environments, and how Omarchy could benefit.",
        "abstract_short": "Declarative reproducible environments, NixOS system administration, and ideas for Omarchy.",
    }

    eyuel_data = {
        "slug": "eyuel-getachew",
        "name": "Eyuel Getachew",
        "role": "Software Developer",
        "talk": "Beyond the rice: Building an Agentic Desktop on fedora 44 with omarchy principles",
        "photo_b64": eyuel_img,
        "img_position": "center 18%",
        "title_font_size": "34px",
        "formatted_title": '<span class="talk-title-highlight">&ldquo;Beyond the rice:</span> Building an Agentic Desktop on fedora 44 with omarchy principles&rdquo;',
        "abstract_summary": "Crafting a keyboard-first, production-grade daily driver for managing AI agents without sacrificing stability, aesthetics, or developer pace.",
        "abstract_short": "Building a keyboard-first agentic desktop on Fedora 44 with Omarchy principles.",
    }

    speakers_all = [dagim_data, fraol_data, eyuel_data]

    # 1. Dagim Square (1200x1200)
    html_dagim_sq = render_single_speaker_square(dagim_data, tefer_img)
    generate_png_from_html(html_dagim_sq, OUTPUT_DIR / "speaker-dagim-gizachew-square.png", 1200, 1200)

    # 2. Fraol Square (1200x1200)
    html_fraol_sq = render_single_speaker_square(fraol_data, tefer_img)
    generate_png_from_html(html_fraol_sq, OUTPUT_DIR / "speaker-fraol-lemecha-square.png", 1200, 1200)

    # 3. Eyuel Square (1200x1200)
    html_eyuel_sq = render_single_speaker_square(eyuel_data, tefer_img)
    generate_png_from_html(html_eyuel_sq, OUTPUT_DIR / "speaker-eyuel-getachew-square.png", 1200, 1200)

    # 4. Triple Lineup Square (1200x1200)
    html_triple_sq = render_triple_lineup_square(speakers_all, tefer_img)
    generate_png_from_html(html_triple_sq, OUTPUT_DIR / "meetup-speakers-lineup-square.png", 1200, 1200)

    # 5. Dagim Landscape (1200x675)
    html_dagim_land = render_single_speaker_landscape(dagim_data, tefer_img)
    generate_png_from_html(html_dagim_land, OUTPUT_DIR / "speaker-dagim-gizachew-landscape.png", 1200, 675)

    # 6. Fraol Landscape (1200x675)
    html_fraol_land = render_single_speaker_landscape(fraol_data, tefer_img)
    generate_png_from_html(html_fraol_land, OUTPUT_DIR / "speaker-fraol-lemecha-landscape.png", 1200, 675)

    # 7. Eyuel Landscape (1200x675)
    html_eyuel_land = render_single_speaker_landscape(eyuel_data, tefer_img)
    generate_png_from_html(html_eyuel_land, OUTPUT_DIR / "speaker-eyuel-getachew-landscape.png", 1200, 675)

    # 8. Triple Lineup Landscape (1200x675)
    html_triple_land = render_triple_lineup_landscape(speakers_all, tefer_img)
    generate_png_from_html(html_triple_land, OUTPUT_DIR / "meetup-speakers-lineup-landscape.png", 1200, 675)

    print("All 8 speaker graphics cleanly regenerated!")

if __name__ == "__main__":
    main()
