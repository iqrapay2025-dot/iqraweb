import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import logoImage from 'figma:asset/39ba4a0dd03e9a935003109f9573af3b0b10ff85.png';

interface IqraPayLoaderProps {
  darkMode?: boolean;
  fullScreen?: boolean;
  message?: string;
}

export function IqraPayLoader({ darkMode = false, fullScreen = true, message }: IqraPayLoaderProps) {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-background'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <motion.img
        src={logoImage}
        alt="IqraPay Logo"
        className="w-64 h-auto"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Mini loader variant (for in-page loading)
export function MiniIqraPayLoader({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.7, 1],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center gap-1"
      >
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="text-sm font-bold text-gradient-primary">
          IqraPay
        </span>
      </motion.div>
      <motion.div
        className="flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Spinner loader variant (small, for buttons)
export function SpinnerLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-primary"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-25"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
