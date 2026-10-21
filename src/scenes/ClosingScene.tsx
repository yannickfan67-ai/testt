import { useEffect, useState } from 'react';

export default function ClosingScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)' }}>
      
      {/* Background effects */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '16, 185, 129'}, ${Math.random() * 0.5 + 0.2})`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={`text-center z-10 transition-all duration-1000 ${
        step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}>
        <div className="grid grid-cols-2 gap-3 w-16 h-16 mx-auto mb-8">
          <div className="bg-blue-400 rounded-sm" />
          <div className="bg-emerald-400 rounded-sm" />
          <div className="bg-emerald-400 rounded-sm" />
          <div className="bg-blue-400 rounded-sm" />
        </div>

        <h2 className="text-5xl font-bold text-white mb-4">
          總結
        </h2>
      </div>

      <div className={`max-w-2xl text-center z-10 transition-all duration-1000 delay-300 ${
        step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          Windows 11 帶來了全新的 Fluent Design 設計語言，
          而 LTSC 2024 則在保持相同設計基礎的同時，
          提供了更精簡、更穩定的企業級體驗。
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className={`px-6 py-3 rounded-2xl bg-blue-500/20 border border-blue-400/30 transition-all duration-500 ${
            step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <span className="text-blue-300 font-medium">Windows 11</span>
            <p className="text-blue-200/60 text-xs mt-1">創新 · 豐富</p>
          </div>
          
          <div className={`text-white/30 text-2xl transition-all duration-500 ${
            step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            VS
          </div>
          
          <div className={`px-6 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 transition-all duration-500 ${
            step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <span className="text-emerald-300 font-medium">LTSC 2024</span>
            <p className="text-emerald-200/60 text-xs mt-1">穩定 · 精簡</p>
          </div>
        </div>
      </div>

      {/* Thank you */}
      <div className={`absolute bottom-24 text-center transition-all duration-1000 delay-500 ${
        step >= 3 ? 'opacity-100' : 'opacity-0'
      }`}>
        <p className="text-white/40 text-sm">感謝觀看 · 使用代碼構建的 UI 展示</p>
      </div>
    </div>
  );
}
