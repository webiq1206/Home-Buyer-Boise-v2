#!/usr/bin/env python3
"""Compress PNG assets for web delivery."""
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def compress_png(path: str, max_colors: int = 256) -> None:
    full = os.path.join(ROOT, path)
    before = os.path.getsize(full)
    img = Image.open(full)
    if img.mode in ("RGBA", "LA"):
        # Quantize while preserving alpha
        alpha = img.split()[-1]
        rgb = img.convert("RGB")
        quantized = rgb.quantize(colors=max_colors, method=Image.Quantize.MEDIANCUT)
        result = quantized.convert("RGBA")
        result.putalpha(alpha)
        result.save(full, "PNG", optimize=True, compress_level=9)
    else:
        img = img.convert("P", palette=Image.Palette.ADAPTIVE, colors=max_colors)
        img.save(full, "PNG", optimize=True, compress_level=9)
    after = os.path.getsize(full)
    print(f"{path}: {before // 1024}KB -> {after // 1024}KB ({100 - after * 100 // before}% reduction)")


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "public/images/stars-background.png"
    compress_png(target)
