interface IslamicPatternProps {
  opacity?: number;
}

export function IslamicPattern({ opacity = 0.03 }: IslamicPatternProps) {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <g fill="currentColor">
            <circle cx="50" cy="50" r="2" />
            <path d="M50 30 L60 40 L50 50 L40 40 Z" />
            <path d="M50 50 L60 60 L50 70 L40 60 Z" />
            <path d="M50 50 L60 40 L70 50 L60 60 Z" />
            <path d="M30 50 L40 60 L50 50 L40 40 Z" />
            <circle cx="30" cy="30" r="1.5" />
            <circle cx="70" cy="30" r="1.5" />
            <circle cx="30" cy="70" r="1.5" />
            <circle cx="70" cy="70" r="1.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}
