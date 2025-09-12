import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Dna, Microscope, Fish } from 'lucide-react';

// Lightweight local Button fallback
const Button = ({ children, className = '', variant, ...props }) => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300';
  const outline = variant === 'outline'
    ? 'bg-transparent border border-teal-500 text-teal-600 hover:bg-teal-50'
    : 'text-white';
  const gradient = variant === 'outline' ? '' : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600';

  return (
    <button {...props} className={`${base} ${outline} ${gradient} ${className}`.trim()}>
      {children}
    </button>
  );
};

// logical initial items (we'll compute responsive positions on mount)
const itemsTemplate = [
  { id: 1, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68c1159745ea66b88978c554/4723d71c6_1.jpeg', name: 'Marine Life', section: 'map' },
  { id: 2, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68c1159745ea66b88978c554/7fe472bf2_4.jpeg', name: 'Birds', section: 'gallery' },
  { id: 3, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68c1159745ea66b88978c554/79b6c09bc_9.jpeg', name: 'Mammals', section: 'process' },
  { id: 4, image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68c1159745ea66b88978c554/6b979797d_10.jpeg', name: 'Insects', section: 'data' },
];

// barcode pattern (deterministic)
const BarcodePattern = ({ seed = 0, length = 16 }) => {
  const bars = Array.from({ length }, (_, i) => {
    const r = (i + seed * 5) % 3;
    const h = r === 0 ? 'h-2' : r === 1 ? 'h-4' : 'h-6';
    return { i, h };
  });
  return (
    <div className="flex space-x-px items-end">
      {bars.map((b) => (
        <div key={b.i} className={`w-1 bg-gradient-to-b from-teal-500 to-cyan-500 ${b.h} rounded-sm`} />
      ))}
    </div>
  );
};

export default function HeroSection({ onNavigate }) {
  const containerRef = useRef(null);
  const [items, setItems] = useState([]);

  // compute responsive initial positions on mount & on resize
  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;

      // left column x and right column x
      const leftX = Math.max(40, Math.round(cw * 0.06));
      const rightX = Math.max(200, Math.round(cw - cw * 0.06 - 96)); // 96 ~ icon width + border

      const computed = itemsTemplate.map((t, idx) => {
        // idx 0 & 1 -> left; idx 2 & 3 -> right
        const isLeft = idx < 2;
        const x = isLeft ? leftX : rightX;
        const y = Math.round(ch * (isLeft ? (0.25 + idx * 0.2) : (0.18 + (idx - 2) * 0.22)));
        return { ...t, position: { x, y } };
      });

      setItems(computed);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const updatePosition = (id, x, y) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, position: { x, y } } : p));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    if (onNavigate) onNavigate(sectionId);
  };

  // onDragEnd: compute new absolute left/top using bounding rects (reliable across transforms)
  const handleDragEnd = (e, info, item) => {
    const el = e.currentTarget;
    const container = containerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const newX = Math.round(elRect.left - containerRect.left);
    const newY = Math.round(elRect.top - containerRect.top);

    // clear css transform so element snaps to left/top
    el.style.transform = 'none';

    updatePosition(item.id, newX, newY);
  };

  const handleKeyDown = (e, item) => {
    const step = e.shiftKey ? 20 : 8;
    let { x, y } = item.position;
    if (e.key === 'ArrowUp') y -= step;
    else if (e.key === 'ArrowDown') y += step;
    else if (e.key === 'ArrowLeft') x -= step;
    else if (e.key === 'ArrowRight') x += step;
    else if (e.key === 'Enter') return scrollToSection(item.section);
    else return;

    e.preventDefault();
    updatePosition(item.id, x, y);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.08),transparent_50%)]" />

      {/* Draggable container */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-auto">
        {items.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.14}
            dragMomentum
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1 }}
            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
            onDoubleClick={() => {
              // double click resets to responsive initial position
              const template = itemsTemplate.find(s => s.id === item.id);
              if (!containerRef.current) return;
              const containerRect = containerRef.current.getBoundingClientRect();
              // recompute position for this id
              const idx = itemsTemplate.findIndex(s => s.id === item.id);
              const isLeft = idx < 2;
              const cw = containerRect.width;
              const leftX = Math.max(40, Math.round(cw * 0.06));
              const rightX = Math.max(200, Math.round(cw - cw * 0.06 - 96));
              const x = isLeft ? leftX : rightX;
              const y = Math.round(containerRect.height * (isLeft ? (0.25 + idx * 0.2) : (0.18 + (idx - 2) * 0.22)));
              updatePosition(item.id, x, y);
            }}
            onKeyDown={(e) => handleKeyDown(e, item)}
            tabIndex={0}
            role="button"
            aria-label={`Draggable ${item.name}. Press arrow keys to move or Enter to open ${item.section}`}
            className="absolute z-20 cursor-grab focus:ring-2 focus:ring-teal-300"
            style={{ left: item.position?.x ?? 0, top: item.position?.y ?? 0, touchAction: 'none' }}
          >
            <div className="relative group pointer-events-auto">
              <svg className="absolute -left-12 -top-12 w-28 h-28 text-slate-300/60 pointer-events-none" aria-hidden>
                <path d="M24 24 Q50 0 90 24" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" fill="none" />
              </svg>

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="absolute inset-0 bg-teal-500/18 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.name}
              </div>

              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2 shadow-md">
                <BarcodePattern seed={item.id} length={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Dna className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">SAGITTARIUS</h1>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Identifying species through <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">DNA barcodes</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Advanced biodiversity research platform providing comprehensive species identification through cutting-edge DNA barcoding technology and global biodiversity data analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button onClick={() => scrollToSection('analysis')} className="px-8 py-4 text-lg">
                <Microscope className="w-5 h-5 mr-2" /> Start DNA Analysis
              </Button>

              <Button variant="outline" onClick={() => scrollToSection('map')} className="px-8 py-4 text-lg">
                <Fish className="w-5 h-5 mr-2" /> Explore Biodiversity
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ opacity: { delay: 1.2 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-teal-600 cursor-pointer" onClick={() => scrollToSection('gallery')}>
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
