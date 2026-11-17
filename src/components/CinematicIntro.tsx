import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { ShieldCheck, Zap, ChevronRight, FastForward } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

const INIT_STEPS = [
  "INITIALIZING VISTAS ACM PROTOCOL",
  "CONNECTING TO INNOVATION NETWORK",
  "CALIBRATING ROBOTIC MECHATRONICS",
  "ACTIVATING QUANTUM HUD SYSTEMS",
  "ONLINE // VISTAS ACM COMMAND CENTER"
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(10);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);

  useEffect(() => {
    // Sound on initial step
    soundEngine.playJarvisChirp();

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < INIT_STEPS.length - 1) {
          soundEngine.playScanner();
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsReadyToEnter(true);
          soundEngine.playHologramActivate();
          return prev;
        }
      });
    }, 950);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 6;
      });
    }, 70);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleEnter = () => {
    soundEngine.playHologramActivate();
    soundEngine.startAmbientHum();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-jet text-chrome select-none overflow-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38BDF808_1px,transparent_1px),linear-gradient(to_bottom,#38BDF808_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cerulean/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-rose/10 blur-[100px] pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-xs font-mono text-chrome/60 tracking-widest border-b border-cerulean/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cerulean animate-ping" />
          <span>VISTAS ACM · SYSTEM INITIALIZATION</span>
        </div>
        <button
          onClick={handleEnter}
          className="flex items-center gap-1.5 px-3 py-1 text-xs border border-chrome/30 hover:border-cerulean hover:text-cerulean transition-colors rounded uppercase cursor-pointer"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>Skip [ESC]</span>
        </button>
      </div>

      {/* Central Holographic Target Scanner */}
      <div className="relative flex flex-col items-center justify-center mb-8">
        {/* Outer Rotating Radar Ring */}
        <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border border-cerulean/30 flex items-center justify-center animate-rotate-slow">
          <div className="absolute inset-1 rounded-full border border-dashed border-rose/40 animate-rotate-reverse" />
          <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-cerulean shadow-[0_0_10px_#38BDF8]" />
          <div className="absolute -bottom-1 w-2.5 h-2.5 rounded-full bg-rose shadow-[0_0_10px_#FF3B9D]" />

          {/* Central Logo Aperture */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-jet-surface border-2 border-cerulean/60 shadow-hologram-blue overflow-hidden p-2 flex items-center justify-center relative">
            <img
              src="/assets/vistas-acm-blue-logo.jpg"
              alt="VISTAS ACM Logo"
              className="w-full h-full object-contain rounded-full filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            />
            {/* Holographic scanning laser bar */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cerulean to-transparent animate-scanline" />
          </div>
        </div>

        {/* Brand Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rose font-semibold flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5 text-rose" />
            Association for Computing Machinery
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-wider text-white uppercase mt-1">
            VISTAS <span className="text-cerulean glow-blue">ACM</span>
          </h1>
          <p className="font-mono text-xs md:text-sm text-chrome-muted tracking-widest uppercase mt-1">
            Future Innovation Command Center
          </p>
        </motion.div>
      </div>

      {/* Real-Time System Diagnostic Terminal Log */}
      <div className="w-full max-w-md px-6 text-center">
        <div className="bg-jet-surface/90 border border-cerulean/30 rounded-lg p-3.5 shadow-hud-panel backdrop-blur-md">
          <div className="flex items-center justify-between font-mono text-[11px] text-cerulean mb-1.5 border-b border-cerulean/20 pb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-rose" />
              STATUS: TELEMETRY LOCK
            </span>
            <span>{progress}%</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-xs md:text-sm text-white tracking-wider h-5 flex items-center justify-center font-medium"
            >
              {INIT_STEPS[currentStep]}
            </motion.p>
          </AnimatePresence>

          {/* Progress Bar with Cerulean & Rose Gradient */}
          <div className="w-full h-1.5 bg-jet border border-cerulean/20 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cerulean to-rose transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enter Experience Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleEnter}
            onMouseEnter={() => soundEngine.playHover()}
            className={`cyber-btn-blue px-8 py-3.5 rounded text-sm font-bold flex items-center gap-2 cursor-pointer transition-all duration-300 ${
              isReadyToEnter
                ? 'opacity-100 scale-100 shadow-[0_0_25px_rgba(56,189,248,0.8)] border-cerulean'
                : 'opacity-85 hover:opacity-100'
            }`}
          >
            <span>{isReadyToEnter ? 'ENTER EXPERIENCE' : 'INITIALIZING... ENTER NOW'}</span>
            <ChevronRight className="w-4 h-4 text-rose" />
          </button>
        </div>
      </div>

      {/* Bottom Legal / Charter Subtext */}
      <div className="absolute bottom-4 text-[10px] font-mono text-chrome/40 tracking-wider text-center">
        CHARTERED MAY 19, 2025 · VELS INSTITUTE OF SCIENCE, TECHNOLOGY AND ADVANCED STUDIES
      </div>
    </motion.div>
  );
};
