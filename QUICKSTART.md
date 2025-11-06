# Quick Start Guide

Get your Austin Panorama Viewer running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A 360-degree panorama image (or use the included placeholder)

## Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Next.js 15
- React 18
- Three.js
- React Three Fiber
- React Three Drei
- TypeScript
- Tailwind CSS

## Step 2: Add Your Panorama Image

### Option A: Use Placeholder (Quick Test)

The project includes a sample panorama in `public/austin-panorama.jpg`. You can start immediately!

### Option B: Add Your Own Image

Replace `public/austin-panorama.jpg` with your own 360° panorama:

**Requirements:**
- Format: JPG or PNG
- Aspect ratio: 2:1 (e.g., 4096x2048)
- Projection: Equirectangular
- File name: `austin-panorama.jpg`

**Where to get Austin panoramas:**
See [GET_PANORAMA.md](GET_PANORAMA.md) for detailed instructions.

## Step 3: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 4: Test the Viewer

You should see:
- ✅ Panoramic image loaded in 3D sphere
- ✅ Drag with mouse to pan around
- ✅ Scroll to zoom in/out
- ✅ Smooth, lag-free motion

## Step 5: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `out/` folder.

## Step 6: Deploy to Vercel

### Quick Deploy:

```bash
npm install -g vercel
vercel
```

Follow the prompts, and your site will be live in seconds!

For detailed deployment instructions, see [DEPLOY.md](DEPLOY.md).

## Customization

### Change Initial View Angle

Edit [components/PanoramaViewer.tsx:20-23](components/PanoramaViewer.tsx#L20-L23):

```typescript
camera.rotation.set(0, Math.PI / 4, 0); // Rotate 45 degrees
```

### Adjust Zoom Limits

Edit [components/PanoramaViewer.tsx:75-76](components/PanoramaViewer.tsx#L75-L76):

```typescript
minDistance={10}    // Closest zoom
maxDistance={200}   // Farthest zoom
```

### Change Controls Sensitivity

Edit [components/PanoramaViewer.tsx:73-74](components/PanoramaViewer.tsx#L73-L74):

```typescript
rotateSpeed={-1.0}  // Faster panning
zoomSpeed={1.2}     // Faster zoom
```

## Troubleshooting

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Image not loading

1. Check that `public/austin-panorama.jpg` exists
2. Verify file name (case-sensitive)
3. Check browser console for errors

### Performance issues

1. Reduce image file size
2. Use JPEG format with 80-85% quality
3. Recommended size: 4096x2048 pixels

### Build errors

```bash
npm run build
```

Check the output for specific errors. Common issues:
- Missing dependencies
- TypeScript errors
- Image file missing

## Project Structure

```
tanmay-irika-austin-demo/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   └── PanoramaViewer.tsx  # 360° viewer (main component)
├── public/
│   └── austin-panorama.jpg # Your panorama image
├── scripts/
│   └── generate_placeholder.py  # Image generator
├── package.json            # Dependencies
├── next.config.ts          # Next.js config
├── vercel.json            # Vercel deployment config
└── README.md              # Full documentation
```

## Next Steps

1. **Replace placeholder image** with real Austin skyline panorama
2. **Customize appearance** (colors, text, branding)
3. **Add features** (hotspots, annotations, multiple views)
4. **Deploy to production** on Vercel
5. **Configure custom domain** (tanmay-singh.com/tanmay-irika-austin)

## Resources

- [Full README](README.md) - Complete documentation
- [GET_PANORAMA.md](GET_PANORAMA.md) - How to get panorama images
- [DEPLOY.md](DEPLOY.md) - Deployment guide
- [Three.js Docs](https://threejs.org/docs) - 3D library
- [Next.js Docs](https://nextjs.org/docs) - Framework

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all files are in correct locations
3. Ensure dependencies are installed
4. Review the troubleshooting section above

## Success!

If you can:
- ✅ See the panorama
- ✅ Drag to pan around
- ✅ Zoom in and out
- ✅ Smooth performance

You're all set! Time to deploy or customize further.

---

**Estimated time:** 5-10 minutes
**Difficulty:** Beginner-friendly
**Tech stack:** Next.js, Three.js, React, TypeScript
