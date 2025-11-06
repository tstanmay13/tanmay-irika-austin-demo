# Austin Skyline Panorama Viewer

A 360-degree panoramic viewer of the Austin skyline from Auditorium Shores, built with Next.js, React Three Fiber, and Three.js.

[Live Demo](https://tanmay-singh.com/tanmay-irika-austin) (Coming Soon)

## 🚀 [START HERE](START_HERE.md) - Your app is ready! Open localhost:3001

## Quick Links

- **[START HERE](START_HERE.md)** - 👈 Start with this! App is running on port 3001
- **[Quick Start Guide](QUICKSTART.md)** - Get running in 5 minutes
- **[Get Panorama Image](GET_PANORAMA.md)** - Where to find/create panorama images
- **[Deployment Guide](DEPLOY.md)** - Deploy to Vercel and configure custom domain
- **[Project Summary](PROJECT_SUMMARY.md)** - Technical overview and architecture

## Features

- 🌆 Full 360-degree panoramic view
- 🖱️ Smooth drag-to-pan controls
- 🔍 Mouse wheel zoom functionality
- 📱 Responsive design for desktop browsers
- ⚡ Built with Next.js 15 and React 18
- 🎨 Styled with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **3D Rendering**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Add your panorama image:

Place a 360-degree equirectangular panorama image named `austin-panorama.jpg` in the `public/` folder.

**Where to get a panorama image:**
- Take your own 360-degree photo at Auditorium Shores using a 360 camera or smartphone panorama mode
- License from stock photo sites:
  - [Dreamstime Austin Skyline Photos](https://www.dreamstime.com/photos-images/austin-skyline.html)
  - [Getty Images Austin Skyline](https://www.gettyimages.com/photos/austin-skyline)
- Create a composite panorama using photo stitching software from multiple photos
- Use AI image generation tools to create a stylized version

**Image requirements:**
- Format: JPG or PNG
- Aspect ratio: 2:1 (e.g., 4096x2048 or 8192x4096)
- Projection: Equirectangular (360° x 180°)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure custom domain if needed
4. Vercel will automatically build and deploy

### Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Custom Path Configuration

The app is configured to be accessible at `/tanmay-irika-austin` on your main domain. This is set up in:
- `next.config.ts` - Sets basePath for production
- `vercel.json` - Configures URL rewrites

To deploy at this path on `tanmay-singh.com`:
1. Deploy to Vercel
2. Add `tanmay-singh.com` as a custom domain in Vercel project settings
3. The app will be accessible at `https://tanmay-singh.com/tanmay-irika-austin`

## Usage

- **Pan around**: Click and drag with your mouse
- **Zoom**: Use mouse wheel to zoom in/out
- **Reset**: Refresh the page to return to initial view

## Project Structure

```
tanmay-irika-austin-demo/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   └── PanoramaViewer.tsx  # 360° panorama viewer component
├── public/
│   └── austin-panorama.jpg # Your panorama image (add this)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment configuration
└── package.json            # Dependencies and scripts
```

## Customization

### Change Initial View Angle

Edit `components/PanoramaViewer.tsx` and modify the `CameraController`:

```typescript
camera.rotation.set(0, YOUR_ANGLE_IN_RADIANS, 0);
```

### Adjust Zoom Limits

Modify the `OrbitControls` props in `PanoramaViewer.tsx`:

```typescript
<OrbitControls
  minDistance={YOUR_MIN}
  maxDistance={YOUR_MAX}
  zoomSpeed={YOUR_SPEED}
/>
```

### Change Rotation Speed

Adjust `rotateSpeed` in the `OrbitControls` component.

## Troubleshooting

### Image not loading
- Ensure `austin-panorama.jpg` is in the `public/` folder
- Check browser console for errors
- Verify image format is equirectangular 2:1 aspect ratio

### Performance issues
- Reduce panorama image file size
- Use optimized JPG format
- Lower the sphere geometry detail in `PanoramaViewer.tsx`

### Deployment issues
- Make sure all dependencies are in `package.json`
- Verify build completes without errors: `npm run build`
- Check Vercel build logs for specific errors

## License

MIT

## Credits

Created for Tanmay & Irika's Austin demo project.
