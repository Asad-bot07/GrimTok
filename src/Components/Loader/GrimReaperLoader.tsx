import React, { useState, useEffect, useRef } from 'react';

interface GrimReaperLoaderProps {
  onLoadingComplete?: () => void;
  duration?: number; // in seconds
}

const GrimReaperLoader: React.FC<GrimReaperLoaderProps> = ({ 
  onLoadingComplete, 
  duration = 8
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  const loadingTexts = [
    "Summoning Darkness...",
    "Harvesting Souls...",
    "Awakening the Dead...",
    "Opening the Void...",
    "Calling the Reaper...",
    "Entering the Abyss...",
    "Disturbing the Graves...",
    "Conjuring Spirits..."
  ];

  // Text rotation effect
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 1500);

    return () => clearInterval(textInterval);
  }, [loadingTexts.length]);

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const targetDuration = duration * 1000;
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / targetDuration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        if (onLoadingComplete) {
          setTimeout(onLoadingComplete, 500);
        }
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [duration, onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
      {/* Space/Stars background */}
      <div className="absolute inset-0">
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Larger twinkling stars */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Fog layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800/20 via-gray-600/10 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-700/15 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-900/25 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Graveyard silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
        {/* Tombstones */}
        <div className="absolute bottom-8 left-[10%] w-4 h-8 bg-gray-800 rounded-t-full opacity-60"></div>
        <div className="absolute bottom-6 left-[25%] w-3 h-6 bg-gray-700 rounded-t-md opacity-50"></div>
        <div className="absolute bottom-10 right-[15%] w-5 h-10 bg-gray-800 opacity-70" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}></div>
        <div className="absolute bottom-7 right-[35%] w-3 h-7 bg-gray-700 rounded-t-full opacity-55"></div>
        <div className="absolute bottom-9 left-[60%] w-4 h-9 bg-gray-800 opacity-65" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div>
        
        {/* Dead trees */}
        <div className="absolute bottom-0 left-[5%] w-1 h-20 bg-gray-900 opacity-80">
          <div className="absolute top-8 -left-2 w-4 h-1 bg-gray-900 opacity-80 rotate-45"></div>
          <div className="absolute top-12 -right-1 w-3 h-1 bg-gray-900 opacity-80 -rotate-45"></div>
        </div>
        <div className="absolute bottom-0 right-[8%] w-1 h-16 bg-gray-900 opacity-70">
          <div className="absolute top-6 -left-1 w-3 h-1 bg-gray-900 opacity-70 rotate-30"></div>
          <div className="absolute top-10 right-0 w-2 h-1 bg-gray-900 opacity-70 -rotate-30"></div>
        </div>
      </div>

      <div className="text-center relative z-10 p-5">
        {/* Reaper wrapper */}
        <div className="relative mb-8">
          {/* Ethereal glow around reaper */}
          <div className="absolute top-1/2 left-1/2 w-64 md:w-80 h-40 md:h-48 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-gray-400/10 via-gray-500/5 to-transparent rounded-full blur-xl animate-pulse"></div>
          
          {/* Floating spirits/souls */}
          <div className="absolute top-1/2 left-1/2 w-56 h-56 md:w-72 md:h-72 transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '20s' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-white/30 rounded-full blur-sm animate-pulse"
                style={{
                  top: `${Math.cos((i * Math.PI * 2) / 8) * 50 + 50}%`,
                  left: `${Math.sin((i * Math.PI * 2) / 8) * 50 + 50}%`,
                  animationDelay: `${i * -0.7}s`,
                  animationDuration: `${2 + i * 0.3}s`,
                }}
              />
            ))}
          </div>
          
          {/* Grim Reaper - More detailed and scary */}
          <div className="w-32 h-40 md:w-40 md:h-48 mx-auto relative" style={{ animation: 'float 4s ease-in-out infinite' }}>
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(-1deg); }
                50% { transform: translateY(-8px) rotate(1deg); }
              }
            `}</style>
            
            <svg
              viewBox="0 0 140 180"
              className="w-full h-full filter drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(200, 200, 200, 0.3)) drop-shadow(0 0 60px rgba(150, 150, 150, 0.2))',
              }}
            >
              {/* Main robe/cloak */}
              <path
                d="M70 30 C55 25, 45 35, 50 55 L45 70 L40 120 L35 160 C35 170, 40 180, 50 180 L90 180 C100 180, 105 170, 105 160 L100 120 L95 70 L90 55 C95 35, 85 25, 70 30 Z"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="0.5"
                opacity="0.9"
              />
              
              {/* Hood shadow */}
              <path
                d="M70 30 C60 28, 50 35, 55 50 L58 65 C60 68, 65 70, 70 70 C75 70, 80 68, 82 65 L85 50 C90 35, 80 28, 70 30 Z"
                fill="#000000"
              />
              
              {/* Face void */}
              <ellipse cx="70" cy="55" rx="15" ry="18" fill="#000000" opacity="0.95"/>
              
              {/* Glowing eyes */}
              <circle cx="65" cy="50" r="2.5" fill="#ff6666" className="animate-pulse">
                <animate attributeName="fill" values="#ff6666;#ff3333;#ff6666" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="75" cy="50" r="2.5" fill="#ff6666" className="animate-pulse">
                <animate attributeName="fill" values="#ff6666;#ff3333;#ff6666" dur="2s" repeatCount="indefinite"/>
              </circle>
              
              {/* Eye glow effect */}
              <circle cx="65" cy="50" r="4" fill="none" stroke="#ff4444" strokeWidth="0.5" opacity="0.6"/>
              <circle cx="75" cy="50" r="4" fill="none" stroke="#ff4444" strokeWidth="0.5" opacity="0.6"/>
              
              {/* Skeletal hands */}
              <g fill="#d4d4d4" stroke="#999999" strokeWidth="0.3">
                {/* Left hand */}
                <path d="M45 90 L35 95 L30 100 L32 102 L40 98 L47 92 Z" />
                <line x1="32" y1="100" x2="30" y2="105" strokeWidth="0.5"/>
                <line x1="35" y1="100" x2="33" y2="105" strokeWidth="0.5"/>
                <line x1="38" y1="99" x2="36" y2="104" strokeWidth="0.5"/>
                
                {/* Right hand holding scythe */}
                <path d="M95 90 L105 95 L110 100 L108 102 L100 98 L93 92 Z" />
                <line x1="108" y1="100" x2="110" y2="105" strokeWidth="0.5"/>
                <line x1="105" y1="100" x2="107" y2="105" strokeWidth="0.5"/>
                <line x1="102" y1="99" x2="104" y2="104" strokeWidth="0.5"/>
              </g>
              
              {/* Scythe with animation */}
              <g style={{ transformOrigin: '108px 100px', animation: 'scytheSwing 6s ease-in-out infinite' }}>
                <style>{`
                  @keyframes scytheSwing {
                    0%, 100% { transform: rotate(0deg); }
                    30% { transform: rotate(-6deg); }
                    70% { transform: rotate(6deg); }
                  }
                `}</style>
                
                {/* Scythe handle */}
                <line x1="108" y1="100" x2="125" y2="15" stroke="#2a2a2a" strokeWidth="3"/>
                
                {/* Scythe blade */}
                <path
                  d="M125 15 C135 8, 150 8, 160 20 C155 35, 140 40, 125 25 Z"
                  fill="#444444"
                  stroke="#666666"
                  strokeWidth="0.8"
                />
                
                {/* Blade edge glow */}
                <path
                  d="M125 15 C135 8, 150 8, 160 20 C155 35, 140 40, 125 25 Z"
                  fill="none"
                  stroke="#cccccc"
                  strokeWidth="0.3"
                  opacity="0.8"
                />
                
                {/* Scythe shine effect */}
                <path
                  d="M130 18 C135 15, 145 15, 150 22"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
              </g>
              
              {/* Robe tattered edges */}
              <path
                d="M40 160 L42 165 L38 170 L44 175 L36 178 M100 160 L98 165 L102 170 L96 175 L104 178"
                fill="none"
                stroke="#333333"
                strokeWidth="0.5"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
        
        {/* Loading text with better styling */}
        <div 
          className="text-gray-300 text-lg md:text-2xl font-bold uppercase tracking-widest mb-6 transition-opacity duration-500" 
          style={{
            textShadow: '0 0 15px rgba(200, 200, 200, 0.4), 0 0 30px rgba(150, 150, 150, 0.2)',
            fontFamily: 'Georgia, serif',
          }}
        >
          {loadingTexts[currentTextIndex]}
        </div>
        
        {/* Progress bar */}
        <div className="w-full max-w-sm mx-auto h-1 bg-gray-800 rounded overflow-hidden border border-gray-700">
          <div
            className="h-full bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded transition-all duration-100"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 10px rgba(200, 200, 200, 0.3)',
            }}
          />
        </div>
        
        {/* Loading percentage */}
        <div className="text-gray-500 text-sm mt-2 font-mono">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default GrimReaperLoader;