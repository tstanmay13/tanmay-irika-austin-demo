# How to Get Your Austin Panorama Image

You need a 360-degree equirectangular panorama image to use this viewer. Here are several options:

## Option 1: Use a Free Sample Panorama (Quickest - for testing)

Download a free sample equirectangular panorama from these sources:

1. **Polyhaven (Best Quality, Free)**
   - Visit: https://polyhaven.com/hdris
   - Download any outdoor HDRI
   - Rename to `austin-panorama.jpg`
   - Place in `public/` folder

2. **Flickr Equirectangular**
   - Search: https://www.flickr.com/search/?text=equirectangular
   - Look for 360-degree photos
   - Download and save as `austin-panorama.jpg` in `public/`

## Option 2: Take Your Own 360° Photo

### Using a Smartphone:
1. **iPhone**: Use built-in Panorama mode (Photo app)
   - Or install "Google Street View" app for 360° photos
2. **Android**: Install "Google Street View" app
   - Use Photo Sphere mode

### At Auditorium Shores:
- Stand facing the Austin skyline
- Take multiple overlapping photos (or use 360 app)
- Stitch them together using:
  - **PTGui** (Professional, paid)
  - **Hugin** (Free, open source)
  - **Microsoft ICE** (Free, Windows only)

## Option 3: License from Stock Photo Sites

1. **Dreamstime**
   - https://www.dreamstime.com/photos-images/austin-skyline.html
   - Search for panoramic Austin photos
   - Purchase license for commercial use

2. **Getty Images**
   - https://www.gettyimages.com/photos/austin-skyline
   - High-quality professional photos

3. **Shutterstock**
   - Search for "Austin skyline panorama"

## Option 4: Use AI Generation (For Stylized Version)

Use AI image generators to create a stylized Austin skyline:

1. **Midjourney** prompt:
   ```
   360 degree equirectangular panorama of Austin Texas skyline from Auditorium Shores,
   sunset, Colorado River, downtown buildings, photorealistic, 8k, aspect ratio 2:1
   ```

2. **DALL-E 3** prompt:
   ```
   wide panoramic view of Austin Texas skyline from Auditorium Shores,
   Colorado River in foreground, sunset colors, ultra wide angle
   ```

Note: AI-generated images work but may not be as realistic as photos.

## Option 5: Quick Test with Any Panorama

For immediate testing, you can use ANY equirectangular panorama:
1. Google "free equirectangular panorama download"
2. Download any 2:1 aspect ratio image
3. Save as `austin-panorama.jpg` in `public/` folder

## Image Requirements

✅ **Format**: JPG or PNG
✅ **Aspect Ratio**: 2:1 (e.g., 4096x2048, 8192x4096)
✅ **Projection**: Equirectangular (360° x 180°)
✅ **Minimum Size**: 4096x2048 pixels (higher is better)
✅ **File Name**: `austin-panorama.jpg`
✅ **Location**: `public/` folder

## Testing Your Image

After placing your image:

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Image loads without errors
- You can drag to pan around
- The horizon line is roughly in the middle
- No visible seams or distortions

## Troubleshooting

**Image appears distorted:**
- Make sure it's truly equirectangular (2:1 ratio)
- Not all panoramas are equirectangular - some are cylindrical

**Image too dark/bright:**
- Adjust in photo editor before importing
- Or modify the Three.js material settings in `PanoramaViewer.tsx`

**File too large (slow loading):**
- Optimize/compress the JPEG
- Recommended size: 4096x2048 at 80-85% quality
- Use tools like ImageOptim, TinyPNG, or Photoshop "Save for Web"

## Need Help?

If you need assistance finding or creating a panorama, refer to the README.md file or create an issue in the repository.
