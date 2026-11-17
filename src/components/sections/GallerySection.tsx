import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { GalleryItem } from '../../types';
import { fetchLiveGallery } from '../../data/supabaseClient';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchLiveGallery().then(setItems);
  }, []);

  const categories = ['all', 'Charter', 'Hackathon', 'Robotics', 'Workshops'];

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const openLightbox = (index: number) => {
    soundEngine.playHologramActivate();
    setActiveItemIndex(index);
  };

  const closeLightbox = () => {
    soundEngine.playClick();
    setActiveItemIndex(null);
  };

  const nextImage = () => {
    if (activeItemIndex === null) return;
    soundEngine.playHover();
    setActiveItemIndex((activeItemIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (activeItemIndex === null) return;
    soundEngine.playHover();
    setActiveItemIndex((activeItemIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, filteredItems.length]);

  return (
    <section id="gallery" className="relative py-24 px-4 md:px-8 border-t border-cerulean/15 bg-jet/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-rose rounded-full animate-ping" />
              <span>07 // VISUAL ARCHIVE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
              MOMENTS & <span className="text-cerulean glow-blue">MEMORIES.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
            Photographic telemetry capturing chapter inaugurations, collaborative hackathons, and hardware robotics testing at VISTAS.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cerulean text-jet font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                  : 'bg-jet-surface text-chrome hover:text-white border border-cerulean/20 hover:border-cerulean/40'
              }`}
            >
              {cat === 'all' ? 'All Archive' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5, scale: 1.02 }}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => openLightbox(idx)}
              className="hud-card group rounded-xl overflow-hidden cursor-pointer border-cerulean/25 hover:border-cerulean/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-jet overflow-hidden flex items-center justify-center p-3">
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-jet/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-cerulean/20 border border-cerulean text-cerulean shadow-hologram-blue">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-jet-surface/90">
                <span className="font-mono text-[9px] text-rose uppercase tracking-widest block mb-1">
                  {item.event_name}
                </span>
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-1 line-clamp-1">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-chrome/70 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Holographic Lightbox */}
        <AnimatePresence>
          {activeItemIndex !== null && filteredItems[activeItemIndex] && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-jet/90 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full hud-card rounded-2xl overflow-hidden border-cerulean shadow-2xl p-4 md:p-6 flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-jet border border-chrome/30 hover:border-rose text-chrome hover:text-rose transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Main Image Container */}
                <div className="relative aspect-video max-h-[60vh] bg-jet rounded-xl overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={filteredItems[activeItemIndex].media_url}
                    alt={filteredItems[activeItemIndex].title}
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  />

                  {/* Previous / Next Controls */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-jet/80 border border-cerulean/40 text-cerulean hover:bg-cerulean hover:text-jet transition-colors cursor-pointer"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-jet/80 border border-cerulean/40 text-cerulean hover:bg-cerulean hover:text-jet transition-colors cursor-pointer"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Caption Footer */}
                <div className="mt-4 pt-3 border-t border-cerulean/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs text-rose uppercase tracking-widest block">
                      {filteredItems[activeItemIndex].event_name}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                      {filteredItems[activeItemIndex].title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-chrome mt-0.5">
                      {filteredItems[activeItemIndex].description}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-chrome/50 whitespace-nowrap">
                    FRAME {activeItemIndex + 1} OF {filteredItems.length}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
