import { useEffect, useState } from 'react';

export default function TitleScene() {
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 200);
    setTimeout(() => setShow(true), 800);
    setTimeout(() => setShowSub(true), 1500);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 30%, #003a6a 60%, #1a1a2e 100%)' }}>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Windows Logo */}
      <div className={`transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="grid grid-cols-2 gap-2 w-24 h-24 mb-8">
          <div className="bg-white/90 rounded-sm" style={{ animation: 'logoReveal 0.5s ease forwards', animationDelay: '0.2s', opacity: 0 }} />
          <div className="bg-white/90 rounded-sm" style={{ animation: 'logoReveal 0.5s ease forwards', animationDelay: '0.4s', opacity: 0 }} />
          <div className="bg-white/90 rounded-sm" style={{ animation: 'logoReveal 0.5s ease forwards', animationDelay: '0.6s', opacity: 0 }} />
          <div className="bg-white/90 rounded-sm" style={{ animation: 'logoReveal 0.5s ease forwards', animationDelay: '0.8s', opacity: 0 }} />
        </div>
      </div>

      {/* Title */}
      <h1 className={`text-6xl md:text-8xl font-bold text-white tracking-tight transition-all duration-1000 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        Windows 11
      </h1>
      
      <div className={`flex items-center gap-4 mt-4 transition-all duration-1000 ${
        showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <span className="text-2xl md:text-3xl text-blue-200 font-light">&</span>
        <span className="text-3xl md:text-5xl font-semibold text-white/90">LTSC 2024</span>
      </div>

      <p className={`mt-8 text-xl text-white/70 transition-all duration-1000 delay-500 ${
        showSub ? 'opacity-100' : 'opacity-0'
      }`}>
        UI 與設計深度解析
      </p>

      {/* Decorative line */}
      <div className={`mt-12 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-1500 ${
        showSub ? 'w-64 opacity-100' : 'w-0 opacity-0'
      }`} />
    </div>
  );
}
