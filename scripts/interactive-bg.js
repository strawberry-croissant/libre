/**
 * Interactive Background Script
 * "Organic Flow" Edition
 * 
 * Features:
 * - Fluid interpolation (lerp)
 * - Mouse Gravity Well (Desktop)
 * - Gyroscope / Device Orientation (Mobile)
 * - Touch Input (Mobile/Tablet)
 */
(() => {
    // Configuration
    const CONFIG = {
        mouseInfluence: 0.664,  
        gyroInfluence: 1.5,     // Sensitivity of tilt
        touchInfluence: 1.8,    // High sensitivity for direct touch
        globalSpeed: 0.002,     
    };

    // State
    const movement = {
        // Blobs have their own independent "orbits"
        blob1: { x: 50, y: 50, angle: 0, speed: 0.002, radius: 15 }, // Fast, tighter orbit
        blob2: { x: 50, y: 50, angle: 2, speed: 0.0015, radius: 12 }, // Slow, heavy
        blob3: { x: 50, y: 50, angle: 4, speed: 0.003, radius: 20 }, // Erratic, far

        pointer: { x: 50, y: 50 }, // Target position
        currentPointer: { x: 50, y: 50 }, // Smoothed position
        
        // Gyro calibration
        initialBeta: null, 
        initialGamma: null,
        
        // Track input source to prioritise touch over gyro when active
        isTouching: false
    };

    // Desktop: Track mouse
    window.addEventListener('mousemove', (e) => {
        movement.pointer.x = (e.clientX / window.innerWidth) * 100;
        movement.pointer.y = (e.clientY / window.innerHeight) * 100;
    });

    // Mobile: Track Touch
    const handleTouch = (e) => {
        movement.isTouching = true;
        const touch = e.touches[0];
        movement.pointer.x = (touch.clientX / window.innerWidth) * 100;
        movement.pointer.y = (touch.clientY / window.innerHeight) * 100;
    };
    
    // Reset touching state after a delay to allow smooth handoff back to gyro/idle
    const endTouch = () => {
        setTimeout(() => {
            movement.isTouching = false;
        }, 1000);
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchend', endTouch);

    // Mobile: Track Device Orientation (Gyroscope)
    window.addEventListener('deviceorientation', (e) => {
        // If user is actively touching, ignore gyro to prevent conflict
        if (movement.isTouching) return;
        
        if (!e.beta || !e.gamma) return; // No data

        // Calibrate start position
        if (movement.initialBeta === null) {
            movement.initialBeta = e.beta;
            movement.initialGamma = e.gamma;
        }

        // Calculate offset from initial position
        const tiltX = (e.gamma - movement.initialGamma) * CONFIG.gyroInfluence;
        const tiltY = (e.beta - movement.initialBeta) * CONFIG.gyroInfluence;

        // Clamp to screen bounds (0-100) with a center bias
        movement.pointer.x = Math.max(0, Math.min(100, 50 + tiltX));
        movement.pointer.y = Math.max(0, Math.min(100, 50 + tiltY));
    });

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
        // Smooth out the input first so the "pull" feels heavy
        movement.currentPointer.x = lerp(movement.currentPointer.x, movement.pointer.x, 0.05);
        movement.currentPointer.y = lerp(movement.currentPointer.y, movement.pointer.y, 0.05);

        // Calculate "Influence Offset" - how far input is from center
        const offsetX = (movement.currentPointer.x - 50) * CONFIG.mouseInfluence;
        const offsetY = (movement.currentPointer.y - 50) * CONFIG.mouseInfluence;

        // Animate Blob 1 (Focus)
        movement.blob1.angle += movement.blob1.speed;
        const b1x = 50 + offsetX + Math.cos(movement.blob1.angle) * movement.blob1.radius;
        const b1y = 50 + offsetY + Math.sin(movement.blob1.angle * 1.2) * movement.blob1.radius;

        // Animate Blob 2 (Ambient)
        movement.blob2.angle -= movement.blob2.speed; // Counter-rotate
        const b2x = 50 + (offsetX * 0.5) + Math.sin(movement.blob2.angle) * movement.blob2.radius;
        const b2y = 50 + (offsetY * 0.5) + Math.cos(movement.blob2.angle * 0.8) * movement.blob2.radius;

        // Animate Blob 3 (Parallax/Depth)
        movement.blob3.angle += movement.blob3.speed * 0.5;
        // This one is repelled (negative offset) for depth
        const b3x = 50 - offsetX + Math.cos(movement.blob3.angle * 1.5) * movement.blob3.radius;
        const b3y = 50 - offsetY + Math.sin(movement.blob3.angle) * movement.blob3.radius;

        // Apply
        const r = (n) => Math.round(n * 100) / 100;
        const root = document.documentElement.style;
        
        root.setProperty('--mouse-x', `${r(b1x)}%`);
        root.setProperty('--mouse-y', `${r(b1y)}%`);
        
        root.setProperty('--mouse-x-2', `${r(b2x)}%`);
        root.setProperty('--mouse-y-2', `${r(b2y)}%`);
        
        root.setProperty('--mouse-x-3', `${r(b3x)}%`);
        root.setProperty('--mouse-y-3', `${r(b3y)}%`);

        requestAnimationFrame(animate);
    };

    animate();
})();
