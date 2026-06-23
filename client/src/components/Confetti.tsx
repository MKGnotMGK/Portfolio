import { useEffect, useRef } from 'react';

/**
 * Confetti Animation Component
 * Creates celebratory confetti particles that fall from the top of the screen
 * Optimized for performance with canvas rendering
 */

interface ConfettiProps {
  trigger: boolean;
  duration?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

const COLORS = [
  'oklch(0.72 0.2 70)',   // Gold
  'oklch(0.35 0.15 260)', // England blue
  'oklch(0.5 0.2 30)',    // Ghana red/gold
  'oklch(0.92 0.01 280)', // Light accent
];

export function Confetti({ trigger, duration = 2500 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const particleCount = 50;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 4 + 3,
        life: 1,
        maxLife: 1,
        size: Math.random() * 6 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = elapsed / duration;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (progress < 1) {
        // Update and draw particles
        particlesRef.current.forEach((particle) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.15; // Gravity
          particle.rotation += particle.rotationSpeed;

          // Update life
          particle.life = Math.max(0, 1 - progress);

          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);

          // Draw as small rectangle
          ctx.fillStyle = particle.color;
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);

          ctx.restore();
        });

        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
}
