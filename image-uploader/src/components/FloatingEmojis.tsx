'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Array of emojis to float around
const emojis = ['🔥', '💥', '🎉', '✨', '🚀'];

interface FloatingEmojisProps {
    // RefObject whose current may be HTMLDivElement or null
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function FloatingEmojis({ containerRef }: FloatingEmojisProps) {
    const [anchors, setAnchors] = useState<{ x: number; y: number }[]>([]);
    
  
    // Initialize random anchor points around container center
    useEffect(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
  
      const points = emojis.map(() => {
        // Random offset within ±150px of center
        const offsetX = (Math.random() - 0.5) * 300;
        const offsetY = (Math.random() - 0.5) * 300;
        return { x: centerX + offsetX, y: centerY + offsetY };
      });
      setAnchors(points);
    }, [containerRef]);
  
    if (anchors.length === 0) return null;
  
    return (
      <>
        {anchors.map(({ x, y }, idx) => {
          // Floating animation around anchor
          const floatRange = 20; // pixels
          const duration = 3 + Math.random() * 2;
  
          return (
            <motion.div
              key={idx}
              style={{ position: 'absolute', left: x, top: y }}
              className="text-4xl pointer-events-none"
              animate={{
                x: [0, floatRange, 0, -floatRange, 0],
                y: [0, -floatRange, 0, floatRange, 0],
              }}
              transition={{ duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
              {emojis[idx]}
            </motion.div>
          );
        })}
      </>
    );
  };