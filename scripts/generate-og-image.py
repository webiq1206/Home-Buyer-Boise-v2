#!/usr/bin/env python3
"""
Generate on-brand 1200x630 OG image for Home Buyer Boise.
Uses actual logo.png + site color palette (navy, primary blue, gold).
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "og-image.png")
LOGO = os.path.join(ROOT, "public", "logo.png")
HERO = os.path.join(ROOT, "public", "images", "hero-background.png")

W, H = 1200, 630

# Brand colors from design_guidelines.md / globals.css
NAVY = (31, 61, 92)        # #1F3D5C  hsl(214, 50%, 25%)
PRIMARY = (14, 77, 164)    # #0E4DA4  hsl(214, 84%, 35%)
GOLD = (212, 161, 42)      # #D4A12A  hsl(38, 70%, 55%)
WHITE = (255, 255, 255)
MUTED = (230, 240, 250)    # #EFF5FA light blue tint


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_gradient():
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        for x in range(W):
            # diagonal gradient matching tailwind from-navy to-primary
            t = (x / W * 0.45 + y / H * 0.55)
            t = max(0, min(1, t))
            px[x, y] = lerp(NAVY, PRIMARY, t)
    return img


def load_font(size, bold=False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def main():
    base = make_gradient()

    # Subtle hero photo texture (matches homepage hero)
    if os.path.exists(HERO):
        hero = Image.open(HERO).convert("RGB").resize((W, H), Image.Resampling.LANCZOS)
        hero = hero.filter(ImageFilter.GaussianBlur(2))
        base = Image.blend(base, hero, alpha=0.18)

    # Slight dark overlay for text contrast (like hero overlay)
    overlay = Image.new("RGBA", (W, H), (14, 77, 164, 90))
    base = base.convert("RGBA")
    base = Image.alpha_composite(base, overlay)

    draw = ImageDraw.Draw(base)

    # Logo on white card — preserves sketchy blue wordmark
    logo = Image.open(LOGO).convert("RGBA")
    logo_max_w = 520
    ratio = logo_max_w / logo.width
    logo = logo.resize((logo_max_w, int(logo.height * ratio)), Image.Resampling.LANCZOS)

    card_pad_x, card_pad_y = 36, 28
    card_w = logo.width + card_pad_x * 2
    card_h = logo.height + card_pad_y * 2
    card_x = (W - card_w) // 2
    card_y = 72

    card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 242))
    # soft shadow
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        [card_x + 4, card_y + 6, card_x + card_w + 4, card_y + card_h + 6],
        radius=16,
        fill=(0, 0, 0, 55),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    base = Image.alpha_composite(base, shadow)

    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=16,
        fill=(255, 255, 255, 242),
    )
    base.paste(logo, (card_x + card_pad_x, card_y + card_pad_y), logo)

    # Headline — mirrors homepage H1
    font_h1 = load_font(52, bold=True)
    font_h1_gold = load_font(52, bold=True)
    font_sub = load_font(26, bold=False)
    font_tag = load_font(20, bold=True)

    headline_y = card_y + card_h + 44
    line1 = "Sell Your Boise House"
    line2 = "Fast for Cash"

    bbox1 = draw.textbbox((0, 0), line1, font=font_h1)
    tw1 = bbox1[2] - bbox1[0]
    draw.text(((W - tw1) // 2, headline_y), line1, fill=WHITE, font=font_h1)

    bbox2 = draw.textbbox((0, 0), line2, font=font_h1_gold)
    tw2 = bbox2[2] - bbox2[0]
    draw.text(((W - tw2) // 2, headline_y + 58), line2, fill=GOLD, font=font_h1_gold)

    sub = "Fair cash offers • No fees • Close in 7 days"
    bbox_s = draw.textbbox((0, 0), sub, font=font_sub)
    tws = bbox_s[2] - bbox_s[0]
    draw.text(((W - tws) // 2, headline_y + 130), sub, fill=MUTED, font=font_sub)

    # Gold accent bar + location tag
    bar_w = 80
    draw.rectangle([(W - bar_w) // 2, headline_y + 175, (W + bar_w) // 2, headline_y + 179], fill=GOLD)
    tag = "TREASURE VALLEY, IDAHO"
    bbox_t = draw.textbbox((0, 0), tag, font=font_tag)
    twt = bbox_t[2] - bbox_t[0]
    draw.text(((W - twt) // 2, headline_y + 192), tag, fill=GOLD, font=font_tag)

    # Bottom trust strip
    strip_h = 56
    strip = Image.new("RGBA", (W, strip_h), (255, 255, 255, 28))
    base.paste(strip, (0, H - strip_h), strip)
    font_small = load_font(17, bold=True)
    trust = "Licensed & Insured  •  (208) 405-2275  •  homebuyerboise.com"
    bbox_tr = draw.textbbox((0, 0), trust, font=font_small)
    twtr = bbox_tr[2] - bbox_tr[0]
    draw.text(((W - twtr) // 2, H - strip_h + 18), trust, fill=(255, 255, 255, 220), font=font_small)

    final = base.convert("RGB")
    final.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({W}x{H})")


if __name__ == "__main__":
    main()
