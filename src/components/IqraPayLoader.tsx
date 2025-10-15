import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface IqraPayLoaderProps {
  darkMode?: boolean;
  fullScreen?: boolean;
  message?: string;
}

export function IqraPayLoader({ darkMode = false, fullScreen = true, message }: IqraPayLoaderProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-background'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo with Glow Effect */}
        <div className="relative">
          {/* Glow effect rings */}
          <motion.div
            className="absolute inset-0 -m-8"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-primary/30" />
          </motion.div>

          <motion.div
            className="absolute inset-0 -m-4"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-primary/40" />
          </motion.div>

          {/* Logo Text with pulse animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 flex flex-col items-center justify-center w-24 h-24"
          >
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mb-1"
            >
              <BookOpen className="h-12 w-12 text-primary" />
            </motion.div>
            <div className="text-xl font-bold text-gradient-primary">
              IqraPay
            </div>
          </motion.div>

          {/* Spinning Islamic pattern */}
          <motion.div
            className="absolute inset-0 -m-12 flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg
              width="160"
              height="160"
              viewBox="0 0 100 100"
              className="opacity-20"
            >
              <defs>
                <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.5" className="fill-primary" />
                  <circle cx="0" cy="0" r="1" className="fill-primary" />
                  <circle cx="20" cy="0" r="1" className="fill-primary" />
                  <circle cx="0" cy="20" r="1" className="fill-primary" />
                  <circle cx="20" cy="20" r="1" className="fill-primary" />
                </pattern>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#islamic-pattern)" />
            </svg>
          </motion.div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground"
          >
            {message || 'Loading IqraPay'}
            <span className="inline-block w-8 text-left">{dots}</span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ width: '50%' }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground mt-2 italic"
          >
            Learn the Deen. Earn for the Dunyā.
          </motion.p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
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
