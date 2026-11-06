interface IslamicAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'geometric' | 'calligraphy' | 'pattern';
}

export function IslamicAvatar({ name, size = 'md' }: IslamicAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
    xl: 'w-full h-full text-6xl',
  };

  // Brand gradients vary by name while staying within IqraPay's palette.
  const gradients = [
    'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 65%, var(--secondary)), var(--secondary))',
    'linear-gradient(135deg, var(--secondary), color-mix(in srgb, var(--secondary) 65%, var(--primary)), var(--primary))',
    'linear-gradient(135deg, var(--primary), var(--secondary), var(--primary))',
    'linear-gradient(135deg, color-mix(in srgb, var(--primary) 75%, var(--background)), var(--primary), var(--secondary))',
    'linear-gradient(135deg, var(--secondary), color-mix(in srgb, var(--secondary) 55%, var(--foreground)), var(--foreground))',
    'linear-gradient(135deg, color-mix(in srgb, var(--primary) 45%, var(--background)), var(--primary), var(--secondary))',
    'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 65%, var(--secondary)), var(--secondary))',
    'linear-gradient(135deg, var(--secondary), color-mix(in srgb, var(--secondary) 72%, var(--primary)), var(--primary))',
    'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 75%, var(--background)), var(--secondary))',
  ];

  // Generate consistent gradient selection based on name
  const getGradientFromName = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  // Extract initials from name
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const gradient = getGradientFromName(name);
  const initials = getInitials(name);

  // Generate particles with consistent positions based on name
  const generateParticles = () => {
    const particles = [];
    const count = 30; // Number of particles
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    for (let i = 0; i < count; i++) {
      const seedHash = hash + i * 1000;
      const random = (Math.abs(Math.sin(seedHash)) * 10000) % 1;
      const random2 = (Math.abs(Math.sin(seedHash + 1)) * 10000) % 1;
      const random3 = (Math.abs(Math.sin(seedHash + 2)) * 10000) % 1;
      const random4 = (Math.abs(Math.sin(seedHash + 3)) * 10000) % 1;
      const random5 = (Math.abs(Math.sin(seedHash + 4)) * 10000) % 1;
      const random6 = (Math.abs(Math.sin(seedHash + 5)) * 10000) % 1;
      
      particles.push({
        left: `${random * 100}%`,
        top: `${random2 * 100}%`,
        animationDelay: `${random3 * 5}s`,
        animationDuration: `${2 + random4 * 3}s`,
        size: 1 + random5 * 1.5, // Very tiny: 1-2.5px
        moveX: random5 * 2 - 1, // -1 to 1
        moveY: random6 * 2 - 1, // -1 to 1
      });
    }
    return particles;
  };

  const particles = generateParticles();

  return (
    <div className={`${sizeClasses[size]} overflow-hidden relative`}>
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 animate-gradient-shift"
        style={{
          backgroundImage: gradient,
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Animated overlay for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shimmer"
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Shiny Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white animate-particle-float"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
              '--move-x': particle.moveX,
              '--move-y': particle.moveY,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.8), 0 0 ${particle.size * 4}px rgba(255, 255, 255, 0.6)`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Initials */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-white drop-shadow-lg">{initials}</span>
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
