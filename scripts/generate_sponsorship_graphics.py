import base64
import os
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "public/assets/graphics"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def get_base64_image(path):
    if not os.path.exists(path):
        return ""
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

.mono { font-family: 'JetBrains Mono', monospace; }
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

def render_sponsorship_square(tefer_b64):
    tefer_tag = f'<img src="{tefer_b64}" alt="Tefer" style="height: 22px; object-fit: contain;">' if tefer_b64 else 'Tefer'

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_FONTS_CSS}

body {{
  width: 1200px;
  height: 1200px;
  padding: 0;
  background: radial-gradient(circle at 85% 15%, rgba(251, 191, 36, 0.08) 0%, transparent 45%), #08090c;
}}

.content-wrapper {{
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 44px 56px 44px 56px;
}}

/* Header */
.header {{
  display: flex;
  align-items: center;
  justify-content: space-between;
}}

.brand-left {{
  display: flex;
  align-items: center;
  gap: 16px;
}}

.logo-mark {{
  width: 46px;
  height: 46px;
  color: #fbbf24;
  filter: drop-shadow(0 0 16px rgba(251, 191, 36, 0.6));
}}

.brand-text-col {{
  display: flex;
  flex-direction: column;
  gap: 2px;
}}

.wordmark {{
  width: 185px;
  height: 38px;
  color: #fbbf24;
  filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.35));
}}

.brand-sub {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.42em;
  color: #10b981;
  text-transform: uppercase;
}}

.event-badge {{
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.35);
  border-radius: 9999px;
  padding: 8px 18px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: #fbbf24;
  letter-spacing: 0.08em;
}}

.event-badge .dot {{
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
}}

/* Hero Section */
.hero-sec {{
  margin: 18px 0 16px 0;
}}

.eyebrow {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #10b981;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}}

.main-title {{
  font-size: 46px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  line-height: 1.08;
}}

.main-title span {{
  color: #fbbf24;
  text-shadow: 0 0 35px rgba(251, 191, 36, 0.4);
}}

.sub-title {{
  font-size: 16px;
  color: rgba(244, 237, 228, 0.7);
  margin-top: 8px;
  line-height: 1.4;
}}

/* 2x2 Tiers Grid */
.tiers-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
  margin-bottom: 20px;
}}

.tier-card {{
  background: #0e0f14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}}

.tier-card.lead {{
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.12) 0%, rgba(14, 15, 20, 0.95) 100%);
  border: 2px solid rgba(251, 191, 36, 0.55);
  box-shadow: 0 12px 35px -10px rgba(251, 191, 36, 0.25);
}}

.card-top {{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}}

.tier-pill {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 9999px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}}

.tier-pill.lead-pill {{
  background: #fbbf24;
  color: #08090c;
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
}}

.tier-pill.green-pill {{
  background: rgba(16, 185, 129, 0.18);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.35);
}}

.tier-slots {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(244, 237, 228, 0.5);
}}

.tier-price-row {{
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 14px;
}}

.price-num {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 38px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}}

.tier-card.lead .price-num {{
  color: #fbbf24;
}}

.price-currency {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: rgba(244, 237, 228, 0.6);
}}

.perks-list {{
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}}

.perks-list li {{
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13.5px;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.35;
}}

.bullet {{
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fbbf24;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.8);
  flex-shrink: 0;
}}

.bullet.green {{
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
}}

.bullet.dim {{
  background: rgba(255, 255, 255, 0.4);
  box-shadow: none;
}}

/* Callout Bar */
.inkind-bar {{
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  color: rgba(244, 237, 228, 0.75);
  margin-bottom: 16px;
}}

.inkind-bar strong {{
  color: #fbbf24;
}}

/* Footer */
.footer {{
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}}

.footer-left {{
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(244, 237, 228, 0.7);
}}

.footer-right {{
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fbbf24;
  font-weight: 600;
}}
</style>
</head>
<body>
  <div class="flag-bar">
    <div class="flag-green"></div>
    <div class="flag-yellow"></div>
    <div class="flag-red"></div>
  </div>
  <div class="grid-pattern"></div>

  <div class="content-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="brand-left">
        <svg class="logo-mark" viewBox="0 0 1200 1200">
          <path fill="currentColor" d="{OMARCHY_MARK_PATH}"/>
        </svg>
        <div class="brand-text-col">
          <div class="wordmark">{OMARCHY_WORDMARK_SVG}</div>
          <div class="brand-sub">ETHIOPIA</div>
        </div>
      </div>
      <div class="event-badge">
        <span class="dot"></span>
        <span>MEETUP 2026 • OCT 3 • ADDIS ABABA</span>
      </div>
    </div>

    <!-- Hero Title -->
    <div class="hero-sec">
      <div class="eyebrow">
        <span>[ // COMMUNITY SPONSORSHIP TIERS ]</span>
      </div>
      <h1 class="main-title">SUPPORT <span>ETHIOPIAN</span> OPEN SOURCE</h1>
      <p class="sub-title">Directly connect with 100+ of Addis Ababa's sharpest Linux, systems & AI engineers.</p>
    </div>

    <!-- 2x2 Tiers Grid -->
    <div class="tiers-grid">
      <!-- Tier 1: Lead -->
      <div class="tier-card lead">
        <div>
          <div class="card-top">
            <span class="tier-pill lead-pill">LEAD SPONSOR</span>
            <span class="tier-slots" style="color: #fbbf24;">LIMITED SPOTS</span>
          </div>
          <div class="tier-price-row">
            <span class="price-num">20,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li><span class="bullet"></span> Top logo on Website, Luma & Stage Slides</li>
            <li><span class="bullet"></span> Place your roll-up banner in the main hall</li>
            <li><span class="bullet"></span> 2-min welcome remark / tech intro on stage</li>
            <li><span class="bullet"></span> Company stickers & hiring flyers on tables</li>
            <li><span class="bullet"></span> <strong>4 Reserved VIP Guest Passes</strong></li>
          </ul>
        </div>
      </div>

      <!-- Tier 2: Community -->
      <div class="tier-card">
        <div>
          <div class="card-top">
            <span class="tier-pill">COMMUNITY SPONSOR</span>
            <span class="tier-slots">DEV TEAMS</span>
          </div>
          <div class="tier-price-row">
            <span class="price-num">15,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li><span class="bullet"></span> Prominent logo on Website & Event Slides</li>
            <li><span class="bullet"></span> MC stage shoutout & hiring announcement</li>
            <li><span class="bullet"></span> Swag distribution at registration desk</li>
            <li><span class="bullet"></span> Dedicated community channel feature</li>
            <li><span class="bullet"></span> <strong>2 Reserved VIP Guest Passes</strong></li>
          </ul>
        </div>
      </div>

      <!-- Tier 3: Supporter -->
      <div class="tier-card">
        <div>
          <div class="card-top">
            <span class="tier-pill">SUPPORTER</span>
            <span class="tier-slots">LOCAL STUDIOS</span>
          </div>
          <div class="tier-price-row">
            <span class="price-num">10,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li><span class="bullet dim"></span> Logo & link on website sponsors section</li>
            <li><span class="bullet dim"></span> Telegram community thank-you spotlight</li>
            <li><span class="bullet dim"></span> MC mention at opening & closing</li>
            <li><span class="bullet dim"></span> Direct brand reach to 300+ developers</li>
            <li><span class="bullet dim"></span> <strong>2 Reserved VIP Guest Passes</strong></li>
          </ul>
        </div>
      </div>

      <!-- Tier 4: Individual Champion -->
      <div class="tier-card" style="border-color: rgba(16, 185, 129, 0.4);">
        <div>
          <div class="card-top">
            <span class="tier-pill green-pill">INDIVIDUAL CHAMPION</span>
            <span class="tier-slots" style="color: #10b981;">LEADERS & DEVS</span>
          </div>
          <div class="tier-price-row">
            <span class="price-num" style="color: #10b981;">5,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li><span class="bullet green"></span> Name & GitHub / X handle credited on site</li>
            <li><span class="bullet green"></span> Personal thank-you shoutout in community</li>
            <li><span class="bullet green"></span> Official Omarchy Meetup sticker pack</li>
            <li><span class="bullet green"></span> Low friction personal contribution</li>
            <li><span class="bullet green"></span> <strong>1 Reserved VIP Guest Pass</strong></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- In-Kind Callout Bar -->
    <div class="inkind-bar">
      <span><strong>IN-KIND PARTNERSHIPS WELCOME:</strong> Venue • Traditional Coffee Ceremony • Swag & T-Shirt Printing • Video Media</span>
      <span style="color: #10b981; font-weight: 700;">CONFIRM BY SEP 28</span>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-left">
        <span>Partner:</span>
        {tefer_tag}
        <span style="color: rgba(255,255,255,0.25);">|</span>
        <span>RSVP: luma.com/zh5jv195</span>
      </div>
      <div class="footer-right">
        <span>omarchy.org.et/deck</span>
        <span style="color: rgba(255,255,255,0.25);">|</span>
        <span>TG: @omarchy_ethiopia</span>
      </div>
    </div>
  </div>
</body>
</html>"""

def render_sponsorship_landscape(tefer_b64):
    tefer_tag = f'<img src="{tefer_b64}" alt="Tefer" style="height: 20px; object-fit: contain;">' if tefer_b64 else 'Tefer'

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_FONTS_CSS}

body {{
  width: 1200px;
  height: 675px;
  padding: 0;
  background: radial-gradient(circle at 85% 15%, rgba(251, 191, 36, 0.08) 0%, transparent 40%), #08090c;
}}

.content-wrapper {{
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 48px;
}}

/* Header */
.header {{
  display: flex;
  align-items: center;
  justify-content: space-between;
}}

.brand-left {{
  display: flex;
  align-items: center;
  gap: 14px;
}}

.logo-mark {{
  width: 38px;
  height: 38px;
  color: #fbbf24;
  filter: drop-shadow(0 0 14px rgba(251, 191, 36, 0.6));
}}

.wordmark {{
  width: 150px;
  height: 30px;
  color: #fbbf24;
}}

.brand-sub {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.38em;
  color: #10b981;
  text-transform: uppercase;
}}

.event-badge {{
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 9999px;
  padding: 6px 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #fbbf24;
}}

/* Title Row */
.title-row {{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 12px 0 14px 0;
}}

.main-title {{
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
  line-height: 1.1;
}}

.main-title span {{
  color: #fbbf24;
}}

.sub-title {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: rgba(244, 237, 228, 0.65);
}}

/* 4-col Tiers Grid */
.tiers-grid {{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  flex: 1;
  margin-bottom: 14px;
}}

.tier-card {{
  background: #0e0f14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}}

.tier-card.lead {{
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.12) 0%, rgba(14, 15, 20, 0.95) 100%);
  border: 1.5px solid rgba(251, 191, 36, 0.55);
  box-shadow: 0 10px 30px -10px rgba(251, 191, 36, 0.2);
}}

.tier-pill {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  width: fit-content;
}}

.tier-pill.lead-pill {{
  background: #fbbf24;
  color: #08090c;
}}

.tier-price-row {{
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 8px 0 10px 0;
}}

.price-num {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
}}

.tier-card.lead .price-num {{
  color: #fbbf24;
}}

.price-currency {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(244, 237, 228, 0.6);
}}

.perks-list {{
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}}

.perks-list li {{
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  color: #e2e8f0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.3;
}}

.perks-list li::before {{
  content: "•";
  color: #fbbf24;
  font-size: 12px;
}}

/* Footer */
.footer {{
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(244, 237, 228, 0.7);
}}

.footer-right {{
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fbbf24;
  font-weight: 600;
}}
</style>
</head>
<body>
  <div class="flag-bar">
    <div class="flag-green"></div>
    <div class="flag-yellow"></div>
    <div class="flag-red"></div>
  </div>
  <div class="grid-pattern"></div>

  <div class="content-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="brand-left">
        <svg class="logo-mark" viewBox="0 0 1200 1200">
          <path fill="currentColor" d="{OMARCHY_MARK_PATH}"/>
        </svg>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <div class="wordmark">{OMARCHY_WORDMARK_SVG}</div>
          <div class="brand-sub">ETHIOPIA</div>
        </div>
      </div>
      <div class="event-badge">
        <span>MEETUP 2026 • OCT 3 • ADDIS ABABA</span>
      </div>
    </div>

    <!-- Title Row -->
    <div class="title-row">
      <h1 class="main-title">SUPPORT <span>ETHIOPIAN</span> OPEN SOURCE</h1>
      <div class="sub-title">Grassroots Community Sponsorship Tiers</div>
    </div>

    <!-- 4 Tiers Grid -->
    <div class="tiers-grid">
      <!-- 20k Lead -->
      <div class="tier-card lead">
        <div>
          <span class="tier-pill lead-pill">LEAD</span>
          <div class="tier-price-row">
            <span class="price-num">20,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li>Top logo on site & Luma</li>
            <li>Roll-up banner in hall</li>
            <li>2-min stage welcome remark</li>
            <li>Company swag on tables</li>
            <li><strong>4 VIP Guest Passes</strong></li>
          </ul>
        </div>
      </div>

      <!-- 15k Community -->
      <div class="tier-card">
        <div>
          <span class="tier-pill">COMMUNITY</span>
          <div class="tier-price-row">
            <span class="price-num">15,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li>Logo on site & slides</li>
            <li>MC shoutout & hiring plug</li>
            <li>Swag at registration desk</li>
            <li>Community channel feature</li>
            <li><strong>2 VIP Guest Passes</strong></li>
          </ul>
        </div>
      </div>

      <!-- 10k Supporter -->
      <div class="tier-card">
        <div>
          <span class="tier-pill">SUPPORTER</span>
          <div class="tier-price-row">
            <span class="price-num">10,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li>Logo on website sponsors list</li>
            <li>Telegram group feature</li>
            <li>MC mention at opening/close</li>
            <li>Direct brand reach to 300+</li>
            <li><strong>2 VIP Guest Passes</strong></li>
          </ul>
        </div>
      </div>

      <!-- 5k Champion -->
      <div class="tier-card" style="border-color: rgba(16, 185, 129, 0.4);">
        <div>
          <span class="tier-pill" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">CHAMPION</span>
          <div class="tier-price-row">
            <span class="price-num" style="color: #10b981;">5,000</span>
            <span class="price-currency">ETB</span>
          </div>
          <ul class="perks-list">
            <li>Name & handle on website</li>
            <li>Personal Telegram shoutout</li>
            <li>Official meetup sticker pack</li>
            <li>Frictionless personal support</li>
            <li><strong>1 VIP Guest Pass</strong></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div>
        <span>Partner:</span> {tefer_tag} • <span>Deadline: Sep 28</span> • In-kind partnerships welcome
      </div>
      <div class="footer-right">
        <span>omarchy.org.et/deck</span>
        <span style="color: rgba(255,255,255,0.3);">|</span>
        <span>TG: @omarchy_ethiopia</span>
      </div>
    </div>
  </div>
</body>
</html>"""

def main():
    tefer_img = get_base64_image(BASE_DIR / "public/assets/partners/tefer-logo-white.png")

    # 1. Square Graphic (1200x1200)
    html_sq = render_sponsorship_square(tefer_img)
    generate_png_from_html(html_sq, OUTPUT_DIR / "sponsorship-tiers-square.png", 1200, 1200)

    # 2. Landscape Graphic (1200x675)
    html_land = render_sponsorship_landscape(tefer_img)
    generate_png_from_html(html_land, OUTPUT_DIR / "sponsorship-tiers-landscape.png", 1200, 675)

    print("Sponsorship graphics generated successfully!")

if __name__ == "__main__":
    main()
