import { useEffect, useState } from 'react';

export default function LTSCScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3500),
      setTimeout(() => setStep(4), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const features = [
    { icon: '⚡', title: '極簡化系統', desc: '移除消費級應用，保留核心功能' },
    { icon: '🔒', title: '長期支援', desc: '5 年安全更新支援週期' },
    { icon: '🏢', title: '企業導向', desc: '專為企業環境設計，穩定優先' },
    { icon: '🛡️', title: '安全性強化', desc: '內建 Defender、BitLocker、安全啟動' },
    { icon: '📦', title: '精簡安裝', desc: '安裝佔用空間更小，資源消耗更低' },
    { icon: '🔧', title: '可控更新', desc: 'IT 管理員完全控制更新排程' },
  ];

  return (
    <div className="w-full h-full flex relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a2e 100%)' }}>
      
      {/* Left side - Visual */}
      <div className="w-1/2 h-full flex items-center justify-center p-8">
        <div className={`relative transition-all duration-1000 ${
          step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          {/* Clean desktop simulation */}
          <div className="w-80 h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(160deg, #003366 0%, #001a33 50%, #000d1a 100%)'
            }} />
            {/* Minimal taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/60 backdrop-blur flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-white/20 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-[1px] w-3 h-3">
                    <div className="bg-white/70 rounded-[0.5px]" />
                    <div className="bg-white/70 rounded-[0.5px]" />
                    <div className="bg-white/70 rounded-[0.5px]" />
                    <div className="bg-white/70 rounded-[0.5px]" />
                  </div>
                </div>
                <div className="w-5 h-5 rounded-sm bg-white/10 flex items-center justify-center">
                  <span className="text-[8px] text-white/50">📁</span>
                </div>
              </div>
              <div className="absolute right-2 text-[8px] text-white/40">14:30</div>
            </div>
            {/* Few desktop icons only */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                  <span className="text-sm">💻</span>
                </div>
                <span className="text-[7px] text-white/60 mt-0.5">此電腦</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                  <span className="text-sm">🗑️</span>
                </div>
                <span className="text-[7px] text-white/60 mt-0.5">回收筒</span>
              </div>
            </div>
          </div>

          {/* Annotation */}
          <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-700 ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
              <p className="text-emerald-200 text-xs">↑ 精簡桌面 · 無多餘應用 · 純淨體驗</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Feature list */}
      <div className="w-1/2 h-full flex flex-col justify-center p-12 relative z-10">
        <h2 className={`text-4xl font-bold text-white mb-2 transition-all duration-700 ${
          step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          LTSC 2024
        </h2>
        <p className={`text-emerald-300 mb-8 transition-all duration-700 delay-200 ${
          step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          長期服務通道 · 企業級穩定
        </p>

        <div className="space-y-4">
          {features.map((feature, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10
              transition-all duration-500 hover:bg-white/10 ${
              step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`} style={{ transitionDelay: `${i * 150}ms` }}>
              <span className="text-2xl flex-shrink-0">{feature.icon}</span>
              <div>
                <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                <p className="text-white/50 text-xs mt-0.5">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />
    </div>
  );
}
