import React from 'react';
import { Activity, Cpu, Radio, Shield, Volume2, Sparkles } from 'lucide-react';

interface AriaSystemStatusPanelProps {
  webGlActive?: boolean;
  speechRecActive?: boolean;
  speechSynthActive?: boolean;
}

export const AriaSystemStatusPanel: React.FC<AriaSystemStatusPanelProps> = ({
  webGlActive = true,
  speechRecActive = true,
  speechSynthActive = true
}) => {
  return (
    <div className="hud-card p-4 rounded-xl border-cerulean/30 space-y-3 bg-[#071322]/90 backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 border-b border-cerulean/20">
        <div className="flex items-center gap-2 font-mono text-[11px] text-cerulean tracking-widest uppercase">
          <Activity className="w-3.5 h-3.5 text-cerulean animate-spin" />
          <span>A.R.I.A. DIAGNOSTICS & TELEMETRY</span>
        </div>
        <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          ALL SYSTEMS NOMINAL
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2 rounded bg-black/40 border border-cerulean/15 flex items-center justify-between">
          <span className="text-chrome/60 text-[10px]">3D HOLOGRAPHIC CORE</span>
          <span className={`text-[10px] font-bold ${webGlActive ? 'text-emerald-400' : 'text-amber-400'}`}>
            {webGlActive ? 'THREE.JS / 60 FPS' : '2D CANVAS'}
          </span>
        </div>

        <div className="p-2 rounded bg-black/40 border border-cerulean/15 flex items-center justify-between">
          <span className="text-chrome/60 text-[10px]">VOICE RECOGNITION</span>
          <span className={`text-[10px] font-bold ${speechRecActive ? 'text-emerald-400' : 'text-amber-400'}`}>
            {speechRecActive ? 'WEB SPEECH ACTIVE' : 'TEXT ONLY'}
          </span>
        </div>

        <div className="p-2 rounded bg-black/40 border border-cerulean/15 flex items-center justify-between">
          <span className="text-chrome/60 text-[10px]">SPEECH SYNTHESIS</span>
          <span className={`text-[10px] font-bold ${speechSynthActive ? 'text-emerald-400' : 'text-amber-400'}`}>
            {speechSynthActive ? 'SYNTH ENGINE OK' : 'MUTED'}
          </span>
        </div>

        <div className="p-2 rounded bg-black/40 border border-cerulean/15 flex items-center justify-between">
          <span className="text-chrome/60 text-[10px]">ACM KNOWLEDGE GRAPH</span>
          <span className="text-[10px] font-bold text-cerulean">
            GROUP ID: 199704
          </span>
        </div>
      </div>

      <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between text-[10px] font-mono text-chrome/70">
        <span>SECURITY PROTOCOL: STRICT ALLOWLIST</span>
        <span className="text-emerald-400">ENFORCED</span>
      </div>
    </div>
  );
};
