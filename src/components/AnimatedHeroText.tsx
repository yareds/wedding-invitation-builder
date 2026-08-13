import React from 'react';
import { motion } from 'motion/react';

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'p' | 'span' | 'div';
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  highlightWords = [],
  highlightClassName = 'text-gold-shimmer font-semibold',
  delay = 0.1,
  stagger = 0.08,
  as = 'h1'
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: 'blur(8px)',
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 90
      }
    }
  };

  const Component = motion[as];

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-[0.1em] ${className}`}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord || word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={wordVariants}
            className={`inline-block transition-colors duration-300 ${
              isHighlighted ? highlightClassName : wordClassName
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </Component>
  );
};

interface GentleFadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export const GentleFadeUp: React.FC<GentleFadeUpProps> = ({
  children,
  delay = 0.3,
  className = '',
  yOffset = 20
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingSparkles: React.FC<{ color?: string }> = ({ color = '#C8A84B' }) => {
  const dots = [
    { id: 1, top: '12%', left: '15%', size: 6, delay: 0 },
    { id: 2, top: '25%', right: '18%', size: 8, delay: 1.2 },
    { id: 3, top: '65%', left: '10%', size: 5, delay: 0.6 },
    { id: 4, top: '75%', right: '12%', size: 7, delay: 1.8 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0.2, scale: 0.8, y: 0 }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.25, 0.8],
            y: [-6, 6, -6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: d.delay,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            right: d.right,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}`
          }}
        />
      ))}
    </div>
  );
};
