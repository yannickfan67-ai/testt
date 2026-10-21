import { useEffect, useState } from 'react';

export default function Win11Scene() {
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
    { icon: '🎨', title: 'Fluent Design System', desc: '現代化設計語言，支援 Mica、Acrylic 材質效果' },
    { icon: '⭕', title: '圓角 UI', desc: '所有視窗、按鈕、對話框採用 8px 圓角設計' },
    { icon: '📐', title: '居中工作列', desc: '開始按鈕和應用圖標居中排列，全新佈局' },
    { icon: '🪟', title: 'Snap Layouts', desc: '智能視窗排列，支援多種佈局預設' },
    { icon: '🎯', title: '虛擬桌面', desc: '每個桌面可獨立設定桌布和配置' },
    { icon: '📱', title: '觸控優化', desc: '針對觸控螢幕優化的間距和互動' },
  ];

  return (
    <div className="w-full h-full flex relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0d2137 100%)' }}>
      
      {/* Left side - Feature list */}
      <div className="w-1/2 h-full flex flex-col justify-center p-12 relative z-10">
        <h2 className={`text-4xl font-bold text-white mb-2 transition-all duration-700 ${
          step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          Windows 11
        </h2>
        <p className={`text-blue-300 mb-8 transition-all duration-700 delay-200 ${
          step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          全新設計語言
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

      {/* Right side - Visual showcase */}
      <div className="w-1/2 h-full flex items-center justify-center p-8">
        <div className={`relative transition-all duration-1000 ${
          step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          {/* Simulated window */}
          <div className="w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Title bar */}
            <div className="h-10 bg-[#202020] flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-xs">📁</span>
                <span className="text-white/70 text-xs">檔案總管</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full hover:bg-white/20 flex items-center justify-center">
                  <span className="text-white/50 text-[8px]">─</span>
                </div>
                <div className="w-3 h-3 rounded-full hover:bg-white/20 flex items-center justify-center">
                  <span className="text-white/50 text-[8px]">□</span>
                </div>
                <div className="w-3 h-3 rounded-full hover:bg-red-500/80 flex items-center justify-center">
                  <span className="text-white/50 text-[8px]">✕</span>
                </div>
              </div>
            </div>
            {/* Content - Mica effect simulation */}
            <div className="h-52 relative" style={{
              background: 'linear-gradient(180deg, rgba(32,32,32,0.95) 0%, rgba(40,40,50,0.9) 100%)',
              backdropFilter: 'blur(20px)'
            }}>
              {/* Ribbon/Toolbar */}
              <div className="h-10 border-b border-white/10 flex items-center px-3 gap-2">
                {['📋', '✂️', '📄', '↩️', '↪️'].map((icon, i) => (
                  <div key={i} className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer">
                    <span className="text-sm">{icon}</span>
                  </div>
                ))}
              </div>
              {/* Sidebar */}
              <div className="flex">
                <div className="w-32 border-r border-white/10 p-2 space-y-1">
                  {['⭐ 快速存取', '🏠 主頁', '📁 桌面', '📥 下載'].map((item, i) => (
                    <div key={i} className={`text-[10px] text-white/60 px-2 py-1 rounded ${i === 0 ? 'bg-white/10 text-white/90' : ''}`}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-2">
                  <div className="grid grid-cols-3 gap-2">
                    {['📁', '🖼️', '📄', '🎵', '📊', '📁'].map((icon, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5">
                        <span className="text-lg">{icon}</span>
                        <span className="text-[8px] text-white/50">檔案{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Annotation */}
          <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-700 ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
              <p className="text-blue-200 text-xs">↑ Mica 材質 · 圓角視窗 · 現代化檔案總管</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10"
        style={{ background: 'radial-gradient(circle, #0078d4 0%, transparent 70%)' }} />
    </div>
  );
}
