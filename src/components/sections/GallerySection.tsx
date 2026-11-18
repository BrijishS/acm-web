import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { GalleryItem } from '../../types';
import { fetchLiveGallery } from '../../data/supabaseClient';
import { Image as ImageIcon, X, Maximize2, Sparkles, Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchLiveGallery().then(setItems);
  }, []);

  const openLightbox = (item: GalleryItem) => {
    soundEngine.playHologramActivate();
    setActiveItem(item);
  };

  const closeLightbox = () => {
    soundEngine.playClick();
    setActiveItem(null);
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/15 bg-[#020408]">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(14,35,71,0.45)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <Camera className="w-4 h-4 text-rose" />
              <span>FRAMES OF WHAT WE DO</span>
              <span className="text-chrome/30">·</span>
              <span className="text-[#38BDF8] font-bold">VISUAL ARCHIVE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              MOMENTS <span className="text-cerulean glow-blue">TOGETHER.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-1.5">
            <p className="font-sans text-sm md:text-base text-white leading-relaxed font-semibold">
              A visual archive of the people, ideas, and projects that make up the chapter.
            </p>
            <p className="font-sans text-xs sm:text-sm text-chrome/80 leading-relaxed">
              Ideas, people and moments — collected from the experiences that bring our community together.
            </p>
          </div>
        </div>

        {/* Gallery Grid of Authentic Visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => openLightbox(item)}
              className="hud-card rounded-2xl overflow-hidden border-cerulean/25 hover:border-cerulean/70 group cursor-pointer bg-[#030611]/90 backdrop-blur-md shadow-hologram-blue flex flex-col justify-between"
            >
              <div className="relative aspect-video sm:aspect-square w-full overflow-hidden bg-[#071329]">
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to official logo if external image fails
                    (e.target as HTMLImageElement).src = '/assets/vistas-acm-blue-logo.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030611] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#030611]/80 border border-cerulean/30 text-cerulean opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#030611]/80 border border-cerulean/30 font-mono text-[10px] text-cerulean uppercase">
                  {item.event_name || 'VISTAS ACM'}
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wide group-hover:text-cerulean transition-colors truncate">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-chrome/70 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-3xl w-full hud-card rounded-2xl overflow-hidden border-cerulean p-6 bg-[#030611]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-cerulean/20 mb-4">
                  <div>
                    <span className="font-mono text-xs text-rose tracking-widest uppercase block mb-0.5">
                      {activeItem.event_name || 'CHAPTER ARCHIVE'}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                      {activeItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeLightbox}
                    className="p-1.5 rounded-lg border border-chrome/30 hover:border-rose text-chrome hover:text-rose transition-colors cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden max-h-[60vh] bg-[#071329] mb-4 flex items-center justify-center border border-cerulean/20">
                  <img
                    src={activeItem.media_url}
                    alt={activeItem.title}
                    className="max-h-[60vh] w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/vistas-acm-blue-logo.jpg';
                    }}
                  />
                </div>

                <p className="font-sans text-sm text-chrome leading-relaxed">
                  {activeItem.description}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
