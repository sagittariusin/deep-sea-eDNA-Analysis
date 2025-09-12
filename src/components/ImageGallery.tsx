import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    title: "Marine Biodiversity",
    description: "Explore the vast ecosystems of our oceans.",
    link: "https://ocean.si.edu/"
  },
  {
    url: "https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1887&auto=format&fit=crop",
    title: "Avian Species",
    description: "Discover the world of birds through ornithology.",
    link: "https://birdsoftheworld.org/bow/home"
  },
  {
    url: "https://images.unsplash.com/photo-1570183344383-5373c1a87799?q=80&w=2070&auto=format&fit=crop",
    title: "Mammalian Research",
    description: "Genetic markers and studies in mammals.",
    link: "https://www.mammalsociety.org/"
  },
  {
    url: "https://images.unsplash.com/photo-1599679942398-5183574c8abc?q=80&w=1887&auto=format&fit=crop",
    title: "Entomology Studies",
    description: "The fascinating world of insect species.",
    link: "https://www.entsoc.org/"
  },
  {
    url: "https://images.unsplash.com/photo-1567941595168-10943925a66a?q=80&w=1964&auto=format&fit=crop",
    title: "Herpetology",
    description: "Research on reptiles and amphibians.",
    link: "https://ssarherps.org/"
  },
  {
    url: "https://images.unsplash.com/photo-1597072557556-35a503574586?q=80&w=2070&auto=format&fit=crop",
    title: "Mycology",
    description: "The study of fungi and their genetic diversity.",
    link: "https://namyco.org/"
  },
  {
    url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=1887&auto=format&fit=crop",
    title: "Botany",
    description: "Exploring plant science and genomics.",
    link: "https://www.botany.org/"
  },
  {
    url: "https://images.unsplash.com/photo-1580913428023-02c695666d61?q=80&w=1887&auto=format&fit=crop",
    title: "Virology",
    description: "The intricate science of viruses.",
    link: "https://www.asv.org/"
  }
];

export default function ImageGallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [100, -400]);

  return (
    <section id="gallery" ref={containerRef} className="py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore Fields of Biology
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Journey through diverse biological disciplines. Click on any card to visit a 
            leading resource in that field.
          </p>
        </motion.div>

        <motion.div
          style={{ x }}
          className="flex gap-8 py-8"
        >
          {galleryImages.map((image, index) => (
            <a
              key={index}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-80"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="h-96 bg-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {image.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}