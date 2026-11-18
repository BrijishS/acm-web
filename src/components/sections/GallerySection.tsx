import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { GalleryItem } from '../../types';
import { fetchLiveGallery } from '../../data/supabaseClient';
import { GALLERY_DATA } from '../../data/chapterData';
import {
  Image as ImageIcon,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchLiveGallery().then((data) => {
      if (data && data.length > 0) {
        setItems(data);
      }
    });
  }, []);

  const categories = ['all', 'Identity', 'Institution', 'Crew', 'Research'];

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return (item.category || '').toLowerCase() === activeCategory.toLowerCase();
  });

  const openLightbox = (index: number) => {
    soundEngine.playHologramActivate();
    setActiveIdx(index);
  };

  const closeLightbox = () => {
    soundEngine.playClick();
    setActiveIdx(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx > 0 ? activeIdx - 1 : filteredItems.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx < filteredItems.length - 1 ? activeIdx + 1 : 0);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, filteredItems.length]);

  const activeItem = activeIdx !== null ? filteredItems[activeIdx] : null;

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-transparent overflow-hidden">
      {/* Animated Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,123,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] animate-grid-drift pointer-events-none" />

      {/* Sweeping Laser Scan Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose/35 to-transparent pointer-events-none animate-laser-sweep" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <Camera className="w-4 h-4 text-rose" />
              <span>FRAMES OF WHAT WE DO</span>
              <span className="text-[#A5ADBA]/40">·</span>
              <span className="text-cerulean font-bold">MEDIA ARCHIVE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              MOMENTS <span className="text-cerulean glow-blue">TOGETHER.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-1.5">
            <p className="font-sans text-sm md:text-base text-white leading-relaxed font-semibold">
              A visual archive of the people, ideas, and projects that make up the chapter.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
              Preserved memories collected from technical workshops, hackathons, and community moments at VISTAS ACM.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="hud-card p-3 rounded-xl bg-[#0B1018]/90 border-cerulean/20 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cerulean text-white font-bold shadow-[0_0_10px_rgba(0,123,255,0.5)]'
                    : 'bg-[#050505] text-[#A5ADBA] hover:text-white border border-cerulean/20 hover:border-cerulean/40'
                }`}
              >
                {cat === 'all' ? 'All Collections' : cat}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-[#A5ADBA]/70">
            {filteredItems.length} {filteredItems.length === 1 ? 'FRAME' : 'FRAMES'} ARCHIVED
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => openLightbox(idx)}
              className="hud-card rounded-2xl overflow-hidden border-cerulean/25 hover:border-cerulean/70 group cursor-pointer bg-[#0B1018]/90 backdrop-blur-md shadow-hologram-blue flex flex-col justify-between"
            >
              <div className="relative aspect-video sm:aspect-square w-full overflow-hidden bg-[#050505]">
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/vistas-acm-blue-logo.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#050505]/80 border border-cerulean/30 text-cerulean opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#050505]/80 border border-cerulean/30 font-mono text-[10px] text-cerulean uppercase">
                  {item.event_name || 'VISTAS ACM'}
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wide group-hover:text-cerulean transition-colors truncate">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#A5ADBA] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal with Prev/Next Navigation */}
        <AnimatePresence>
          {activeItem && (
            <div
              onClick={closeLightbox}
              className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full hud-card rounded-2xl overflow-hidden border-cerulean/40 p-6 bg-[#050505] shadow-2xl"
              >
                {/* Modal Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-cerulean/20 mb-4">
                  <div>
                    <span className="font-mono text-xs text-rose tracking-widest uppercase block mb-0.5 font-bold">
                      {activeItem.event_name || 'CHAPTER ARCHIVE'} · FRAME {activeIdx! + 1} OF {filteredItems.length}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                      {activeItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={closeLightbox}
                    className="p-1.5 rounded-lg border border-white/20 hover:border-rose text-[#A5ADBA] hover:text-rose transition-colors cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Image Frame with Navigation Arrows */}
                <div className="relative rounded-xl overflow-hidden max-h-[65vh] bg-[#0B1018] mb-4 flex items-center justify-center border border-cerulean/20">
                  <img
                    src={activeItem.media_url}
                    alt={activeItem.title}
                    className="max-h-[65vh] w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/vistas-acm-blue-logo.jpg';
                    }}
                  />

                  {/* Left / Right Navigation Buttons */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#050505]/80 hover:bg-cerulean border border-cerulean/40 text-white transition-all cursor-pointer shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#050505]/80 hover:bg-cerulean border border-cerulean/40 text-white transition-all cursor-pointer shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between font-mono text-xs text-[#A5ADBA]">
                  <p className="font-sans text-sm text-[#C0C0C0] leading-relaxed max-w-2xl">
                    {activeItem.description}
                  </p>
                  <span>{activeItem.date || 'AY 2026–2027'}</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
