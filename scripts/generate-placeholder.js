const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generatePlaceholder() {
    const width = 4096;
    const height = 2048;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Sky gradient (top half)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height / 2);
    skyGradient.addColorStop(0, '#1e3a8a');
    skyGradient.addColorStop(0.5, '#3b82f6');
    skyGradient.addColorStop(1, '#60a5fa');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height / 2);

    // Ground/water gradient (bottom half)
    const groundGradient = ctx.createLinearGradient(0, height / 2, 0, height);
    groundGradient.addColorStop(0, '#059669');
    groundGradient.addColorStop(0.3, '#10b981');
    groundGradient.addColorStop(1, '#065f46');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, height / 2, width, height / 2);

    // Draw buildings
    const buildings = [
        { x: 1500, y: 700, w: 100, h: 350 },
        { x: 1650, y: 600, w: 120, h: 450 },
        { x: 1820, y: 650, w: 90, h: 400 },
        { x: 1950, y: 720, w: 110, h: 330 },
        { x: 2100, y: 680, w: 100, h: 370 },
        { x: 2250, y: 550, w: 140, h: 500 },
        { x: 2440, y: 700, w: 95, h: 350 },
    ];

    buildings.forEach((building, idx) => {
        // Building body
        const colors = ['#1f2937', '#374151', '#4b5563'];
        ctx.fillStyle = colors[idx % colors.length];
        ctx.fillRect(building.x, building.y, building.w, building.h);

        // Windows
        ctx.fillStyle = '#fbbf24';
        const rows = Math.floor(building.h / 30);
        const cols = Math.floor(building.w / 20);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (Math.random() > 0.3) {
                    ctx.fillRect(
                        building.x + j * 20 + 5,
                        building.y + i * 30 + 10,
                        10,
                        15
                    );
                }
            }
        }
    });

    // Add sun
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(3500, 300, 80, 0, Math.PI * 2);
    ctx.fill();

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('AUSTIN SKYLINE', width / 2, 400);
    ctx.font = '50px Arial';
    ctx.fillText('Placeholder - Replace with Real 360° Panorama', width / 2, 500);

    // Save to file
    const outputPath = path.join(__dirname, '..', 'public', 'austin-panorama.jpg');
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 });
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Placeholder panorama generated!');
    console.log(`   Location: ${outputPath}`);
    console.log(`   Size: ${width}x${height} pixels`);
    console.log('\n⚠️  Replace this with a real 360° panorama for production!');
}

// Run if this script is executed directly
if (require.main === module) {
    try {
        generatePlaceholder();
    } catch (error) {
        console.error('Error generating placeholder:', error.message);
        console.log('\nNote: This script requires the "canvas" package.');
        console.log('Install it with: npm install canvas');
        process.exit(1);
    }
}

module.exports = { generatePlaceholder };
