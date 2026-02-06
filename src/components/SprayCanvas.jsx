import React, { useRef, useEffect } from 'react';
import './SprayCanvas.css';

const SprayCanvas = ({ weapon, isPlaying, showCompensated, onComplete }) => {
    const canvasRef = useRef(null);
    const animationIdRef = useRef(null);
    const startTimeRef = useRef(null);

    // Constants
    const SCALE = 6;
    const CENTER_X = 200;
    const CENTER_Y = 300; // Start lower
    const CANVAS_SIZE = 400;

    useEffect(() => {
        if (isPlaying) {
            startTimeRef.current = Date.now();
            const animate = () => {
                const canvas = canvasRef.current;
                if (!canvas || !startTimeRef.current) return;

                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

                drawGrid(ctx);

                // Calculate current progress
                const now = Date.now();
                const timeElapsed = now - startTimeRef.current;

                // Calculate shots fired based on RPM
                const msPerRound = 60000 / weapon.rpm;
                const shotsFired = Math.floor(timeElapsed / msPerRound);

                // Draw Ghost Path
                drawPath(ctx, weapon.pattern.length, 'rgba(255, 255, 255, 0.1)');

                // Draw Active Path
                if (shotsFired > 0) {
                    const actualShots = Math.min(shotsFired, weapon.pattern.length);
                    drawPath(ctx, actualShots, showCompensated ? '#10b981' : '#f59e0b');

                    // Draw current bullet impact bloom
                    const currentPoint = weapon.pattern[Math.min(shotsFired, weapon.pattern.length - 1)];
                    const pos = getCanvasCoords(currentPoint);

                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
                    ctx.fillStyle = showCompensated ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)';
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = '#fff';
                    ctx.fill();
                }

                if (shotsFired < weapon.pattern.length) {
                    animationIdRef.current = requestAnimationFrame(animate);
                } else {
                    if (onComplete) onComplete();
                }
            };
            animationIdRef.current = requestAnimationFrame(animate);
        } else {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            drawStatic(); // Draw full pattern statically when stopped
        }

        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        };
    }, [isPlaying, weapon, showCompensated, onComplete]);

    const getCanvasCoords = (point) => {
        let x = point.x;
        let y = point.y;

        if (showCompensated) {
            x = -x;
            y = -y;
        }

        return {
            x: CENTER_X + (x * SCALE),
            y: CENTER_Y - (y * SCALE)
        };
    };

    const drawStatic = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawGrid(ctx);

        // Draw full ghost path
        drawPath(ctx, weapon.pattern.length, 'rgba(255, 255, 255, 0.2)');

        // Draw individual impacts
        weapon.pattern.forEach((point, i) => {
            const pos = getCanvasCoords(point);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        });
    };

    const drawPath = (ctx, length, color) => {
        ctx.beginPath();
        const start = getCanvasCoords(weapon.pattern[0]);
        ctx.moveTo(start.x, start.y);

        for (let i = 1; i < length; i++) {
            const point = weapon.pattern[i];
            const pos = getCanvasCoords(point);
            ctx.lineTo(pos.x, pos.y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const drawGrid = (ctx) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;

        // Center Crosshair
        ctx.beginPath();
        ctx.moveTo(CENTER_X, 0);
        ctx.lineTo(CENTER_X, CANVAS_SIZE);
        ctx.moveTo(0, CENTER_Y);
        ctx.lineTo(CANVAS_SIZE, CENTER_Y);
        ctx.stroke();

        // Circles
        ctx.beginPath();
        ctx.arc(CENTER_X, CENTER_Y, 50, 0, Math.PI * 2);
        ctx.stroke();
    };

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="spray-canvas glass-panel"
        />
    );
};

export default SprayCanvas;
