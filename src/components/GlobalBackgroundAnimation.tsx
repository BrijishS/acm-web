import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface DataPacket {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  color: string;
}

export const GlobalBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle palette - Cerulean, Cyan, Rose, Silver
    const particleColors = [
      '#007BFF', // Cerulean Blue
      '#38BDF8', // Cyan Highlight
      '#FF2E88', // Neon Rose
      '#00F0FF', // Electric Cyan
      '#E0E5EC', // Silver White
    ];

    let particles: Particle[] = [];
    let packets: DataPacket[] = [];

    const initParticles = () => {
      // Density based on screen area (balanced for smooth 60fps)
      const count = Math.min(Math.floor((width * height) / 12000), 120);
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 1.2 + Math.random() * 2.4,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          alpha: 0.35 + Math.random() * 0.65,
          pulseSpeed: 0.025 + Math.random() * 0.035,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Initial data streams
      packets = [];
      for (let i = 0; i < 4; i++) {
        createDataPacket();
      }
    };

    const createDataPacket = () => {
      packets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 40 + Math.random() * 90,
        speed: 3 + Math.random() * 4,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.4, // diagonal down-right trajectory
        alpha: 0.6 + Math.random() * 0.4,
        color: Math.random() > 0.3 ? '#38BDF8' : '#FF2E88',
      });
    };

    initParticles();

    // Scanline & Grid pulse tracker
    let scanlineY = 0;
    let gridOffset = 0;
    let packetTimer = 0;

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Moving Cyber Coordinate Grid
      gridOffset = (gridOffset + 0.22) % 48;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';

      ctx.beginPath();
      for (let x = gridOffset; x < width; x += 48) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridOffset; y < height; y += 48) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Sweeping Horizontal Telemetry Radar Laser
      scanlineY = (scanlineY + 1.4) % (height + 250);
      const gradient = ctx.createLinearGradient(0, scanlineY - 60, 0, scanlineY + 60);
      gradient.addColorStop(0, 'rgba(0, 123, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 123, 255, 0.08)');
      gradient.addColorStop(0.52, 'rgba(56, 189, 248, 0.16)');
      gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanlineY - 60, width, 120);

      // 3. Connect particles with holographic constellation energy lines
      const maxDistance = 135;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.24;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Update and draw particles with mouse interaction
      const mouse = mouseRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gentle cursor magnetic influence
        if (mouse.active) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150) {
            const force = (1 - mdist / 150) * 0.9;
            p.x -= (mdx / mdist) * force * 1.8;
            p.y -= (mdy / mdist) * force * 1.8;
          }
        }

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.65 + 0.35 * Math.sin(p.pulsePhase));

        // Draw particle glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.restore();
      }

      // 5. High-speed Telemetry Data Streams / Cyber Meteors
      packetTimer++;
      if (packetTimer > 80 && packets.length < 5) {
        createDataPacket();
        packetTimer = 0;
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.x += Math.cos(pkt.angle) * pkt.speed;
        pkt.y += Math.sin(pkt.angle) * pkt.speed;

        const tailX = pkt.x - Math.cos(pkt.angle) * pkt.length;
        const tailY = pkt.y - Math.sin(pkt.angle) * pkt.length;

        const pGrad = ctx.createLinearGradient(tailX, tailY, pkt.x, pkt.y);
        pGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        pGrad.addColorStop(1, pkt.color);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(pkt.x, pkt.y);
        ctx.strokeStyle = pGrad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = pkt.alpha * 0.7;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();

        // Remove offscreen
        if (pkt.x > width + 100 || pkt.y > height + 100) {
          packets.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Large Ambient sinuously pulsing Glowing Nebulae */}
      <div
        className="absolute top-[8%] left-[-8%] w-[680px] h-[680px] rounded-full bg-[#007BFF]/12 blur-[140px] animate-pulse pointer-events-none"
        style={{ animationDuration: '9s' }}
      />
      <div
        className="absolute top-[35%] right-[-8%] w-[600px] h-[600px] rounded-full bg-[#FF2E88]/12 blur-[150px] animate-pulse pointer-events-none"
        style={{ animationDuration: '12s', animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-[20%] left-[15%] w-[650px] h-[650px] rounded-full bg-[#38BDF8]/10 blur-[150px] animate-pulse pointer-events-none"
        style={{ animationDuration: '14s', animationDelay: '4s' }}
      />
      <div
        className="absolute bottom-[-10%] right-[15%] w-[550px] h-[550px] rounded-full bg-[#FF2E88]/10 blur-[130px] animate-pulse pointer-events-none"
        style={{ animationDuration: '11s', animationDelay: '1.5s' }}
      />

      {/* 2. Interactive Canvas for Particles, Grid, Data Streams & Constellation Lines */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
