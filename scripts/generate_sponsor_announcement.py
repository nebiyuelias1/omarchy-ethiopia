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

def render_sima_thank_you_square(sima_b64, tefer_b64):
    tefer_tag = f'<img src="{tefer_b64}" alt="Tefer" style="height: 24px; object-fit: contain;">' if tefer_b64 else 'Tefer'

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
  background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.13) 0%, transparent 62%),
              radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.08) 0%, transparent 45%),
              #08090c;
}}

.content-wrapper {{
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 56px 64px 48px 64px;
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
  width: 48px;
  height: 48px;
  color: #fbbf24;
  filter: drop-shadow(0 0 16px rgba(251, 191, 36, 0.6));
}}

.brand-text-col {{
  display: flex;
  flex-direction: column;
  gap: 2px;
}}

.wordmark {{
  width: 195px;
  height: 40px;
  color: #fbbf24;
  filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.35));
}}

.brand-sub {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
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
  padding: 10px 22px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #fbbf24;
  letter-spacing: 0.08em;
}}

.event-badge .dot {{
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
}}

/* Center Content */
.center-content {{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  gap: 36px;
}}

.main-title {{
  font-size: 68px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  line-height: 1.05;
  text-align: center;
}}

.main-title span {{
  color: #fbbf24;
  text-shadow: 0 0 45px rgba(251, 191, 36, 0.5);
}}

/* Sponsor Main Showcase Card */
.sponsor-card {{
  width: 100%;
  max-width: 900px;
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.14) 0%, rgba(14, 15, 20, 0.98) 100%);
  border: 2px solid rgba(251, 191, 36, 0.6);
  border-radius: 28px;
  box-shadow: 0 24px 70px -15px rgba(251, 191, 36, 0.3);
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
}}

.tier-ribbon {{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #fbbf24;
  color: #08090c;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.16em;
  padding: 8px 24px;
  border-radius: 9999px;
  text-transform: uppercase;
  box-shadow: 0 0 25px rgba(251, 191, 36, 0.6);
}}

.logo-display-box {{
  width: 100%;
  max-width: 740px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px 50px;
}}

.sponsor-logo-img {{
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 18px rgba(0, 0, 0, 0.45));
}}

/* Footer */
.footer {{
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
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
        <span>MEETUP 2026 • ADDIS ABABA</span>
      </div>
    </div>

    <!-- Center Content -->
    <div class="center-content">
      <h1 class="main-title">THANK YOU, <span>SIMA</span>!</h1>

      <!-- Sponsor Card -->
      <div class="sponsor-card">
        <div class="tier-ribbon">
          <span>★ LEAD SPONSOR (20,000 ETB) ★</span>
        </div>

        <div class="logo-display-box">
          <img class="sponsor-logo-img" src="{sima_b64}" alt="SIMA Logo">
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-left">
        <span>Official Event Partner:</span>
        {tefer_tag}
      </div>
      <div class="footer-right">
        <span>omarchy.org.et/meetup</span>
        <span style="color: rgba(255,255,255,0.25);">•</span>
        <span>RSVP: luma.com/zh5jv195</span>
      </div>
    </div>
  </div>
</body>
</html>"""

def render_sima_thank_you_landscape(sima_b64, tefer_b64):
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
  background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.07) 0%, transparent 45%),
              #08090c;
}}

.content-wrapper {{
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 56px;
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

/* Center Content */
.center-content {{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  gap: 20px;
}}

.main-title {{
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #ffffff;
  line-height: 1.1;
  text-align: center;
}}

.main-title span {{
  color: #fbbf24;
  text-shadow: 0 0 35px rgba(251, 191, 36, 0.4);
}}

/* Sponsor Card */
.sponsor-card-land {{
  width: 100%;
  max-width: 680px;
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.14) 0%, rgba(14, 15, 20, 0.98) 100%);
  border: 2px solid rgba(251, 191, 36, 0.6);
  border-radius: 20px;
  box-shadow: 0 16px 45px -10px rgba(251, 191, 36, 0.3);
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}}

.tier-badge {{
  background: #fbbf24;
  color: #08090c;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  padding: 5px 18px;
  border-radius: 9999px;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}}

.logo-display-land {{
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 36px;
}}

.logo-display-land img {{
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}}

/* Footer */
.footer {{
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
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
  gap: 14px;
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
        <span>MEETUP 2026 • ADDIS ABABA</span>
      </div>
    </div>

    <!-- Center Content -->
    <div class="center-content">
      <h1 class="main-title">THANK YOU, <span>SIMA</span>!</h1>

      <div class="sponsor-card-land">
        <div class="tier-badge">★ LEAD SPONSOR (20,000 ETB) ★</div>
        <div class="logo-display-land">
          <img src="{sima_b64}" alt="SIMA Logo">
        </div>
      </div>
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
        <span>omarchy.org.et/meetup</span>
      </div>
    </div>
  </div>
</body>
</html>"""

def main():
    sima_img = get_base64_image(BASE_DIR / "public/assets/partners/sima.png")
    tefer_img = get_base64_image(BASE_DIR / "public/assets/partners/tefer-logo-white.png")

    if not sima_img:
        print("Error: sima.png not found!")
        return

    # 1. Square Graphic (1200x1200)
    html_sq = render_sima_thank_you_square(sima_img, tefer_b64=tefer_img)
    generate_png_from_html(html_sq, OUTPUT_DIR / "sponsor-sima-square.png", 1200, 1200)

    # 2. Landscape Graphic (1200x675)
    html_land = render_sima_thank_you_landscape(sima_img, tefer_b64=tefer_img)
    generate_png_from_html(html_land, OUTPUT_DIR / "sponsor-sima-landscape.png", 1200, 675)

    print("SIMA sponsor graphics regenerated with requested clean minimal layout!")

if __name__ == "__main__":
    main()
