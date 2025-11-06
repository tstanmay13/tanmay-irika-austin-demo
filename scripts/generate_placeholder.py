#!/usr/bin/env python3
"""
Generate a placeholder panorama image for testing the Austin panorama viewer.
Requires: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
import random

def generate_placeholder_panorama(width=4096, height=2048):
    """Generate a placeholder equirectangular panorama"""

    # Create image
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    # Sky gradient (top half)
    for y in range(height // 2):
        ratio = y / (height // 2)
        r = int(30 + ratio * 66)
        g = int(58 + ratio * 72)
        b = int(138 + ratio * 112)
        draw.rectangle([(0, y), (width, y + 1)], fill=(r, g, b))

    # Ground/water gradient (bottom half)
    for y in range(height // 2, height):
        ratio = (y - height // 2) / (height // 2)
        if ratio < 0.3:  # Water
            r = int(5 + ratio * 11)
            g = int(150 + ratio * 35)
            b = int(105 - ratio * 24)
        else:  # Grass
            r = int(6 + ratio * 0)
            g = int(95 + ratio * 90)
            b = int(46 + ratio * 24)
        draw.rectangle([(0, y), (width, y + 1)], fill=(r, g, b))

    # Draw buildings for Austin skyline
    buildings = [
        {'x': int(width * 0.35), 'y': int(height * 0.35), 'w': 80, 'h': 280},
        {'x': int(width * 0.38), 'y': int(height * 0.30), 'w': 100, 'h': 360},
        {'x': int(width * 0.42), 'y': int(height * 0.32), 'w': 75, 'h': 320},
        {'x': int(width * 0.45), 'y': int(height * 0.36), 'w': 90, 'h': 270},
        {'x': int(width * 0.50), 'y': int(height * 0.34), 'w': 85, 'h': 300},
        {'x': int(width * 0.53), 'y': int(height * 0.28), 'w': 110, 'h': 400},  # Tall building (Frost Bank)
        {'x': int(width * 0.57), 'y': int(height * 0.36), 'w': 80, 'h': 280},
    ]

    for building in buildings:
        # Building body
        color = (random.randint(31, 75), random.randint(41, 83), random.randint(87, 111))
        draw.rectangle(
            [(building['x'], building['y']),
             (building['x'] + building['w'], building['y'] + building['h'])],
            fill=color
        )

        # Windows
        window_color = (251, 191, 36) if random.random() > 0.5 else (200, 200, 100)
        window_rows = building['h'] // 25
        window_cols = building['w'] // 15

        for i in range(window_rows):
            for j in range(window_cols):
                if random.random() > 0.2:  # 80% chance of lit window
                    wx = building['x'] + j * 15 + 4
                    wy = building['y'] + i * 25 + 8
                    draw.rectangle([(wx, wy), (wx + 8, wy + 12)], fill=window_color)

    # Add sun
    sun_x = int(width * 0.85)
    sun_y = int(height * 0.15)
    draw.ellipse([(sun_x - 60, sun_y - 60), (sun_x + 60, sun_y + 60)],
                 fill=(251, 191, 36))

    # Add text overlay
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 100)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    text1 = "AUSTIN SKYLINE"
    text2 = "Placeholder - Replace with Real Panorama"

    # Get text bounding boxes
    bbox1 = draw.textbbox((0, 0), text1, font=font_large)
    bbox2 = draw.textbbox((0, 0), text2, font=font_small)

    text1_width = bbox1[2] - bbox1[0]
    text2_width = bbox2[2] - bbox2[0]

    # Draw text with shadow
    shadow_offset = 4
    text1_x = (width - text1_width) // 2
    text1_y = int(height * 0.20)

    draw.text((text1_x + shadow_offset, text1_y + shadow_offset), text1,
              fill=(0, 0, 0), font=font_large)
    draw.text((text1_x, text1_y), text1, fill=(255, 255, 255), font=font_large)

    text2_x = (width - text2_width) // 2
    text2_y = int(height * 0.25)

    draw.text((text2_x + shadow_offset, text2_y + shadow_offset), text2,
              fill=(0, 0, 0), font=font_small)
    draw.text((text2_x, text2_y), text2, fill=(255, 255, 255), font=font_small)

    return img

if __name__ == '__main__':
    print("Generating placeholder panorama image...")
    img = generate_placeholder_panorama()

    output_path = '../public/austin-panorama.jpg'
    img.save(output_path, 'JPEG', quality=85, optimize=True)

    print(f"✅ Placeholder panorama saved to: {output_path}")
    print(f"   Size: {img.size[0]}x{img.size[1]} pixels")
    print("\nReplace this with a real 360° panorama photo for production!")
