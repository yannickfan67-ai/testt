import { useEffect, useState } from 'react';

export default function CompareScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => setStep(4), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const comparisons = [
    {
      category: '設計語言',
      win11: 'Fluent Design · Mica/Acrylic',
      ltsc: 'Fluent Design · 相同基礎',
    },
    {
      category: '預裝應用',
      win11: 'Teams、Clipchamp、Xbox 等',
      ltsc: '僅核心系統應用',
    },
    {
      category: '更新策略',
      win11: '持續功能更新',
      ltsc: '僅安全更新 · 5年支援',
    },
    {
      category: '系統資源',
      win11: '較多背景服務',
      ltsc: '精簡服務 · 低資源佔用',
    },
    {
      category: '適用場景',
      win11: '個人用戶 · 創意工作者',
      ltsc: '企業 · 伺服器 · 穩定環境',
    },
    {
      category: 'UI 差異',
      win11: '完整 Widget、Copilot',
      ltsc: '無 Widget · 無 Copilot',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      
      {/* Title */}
      <div className={`text-center mb-8 transition-all duration-700 ${
        step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h2 className="text-4xl font-bold text-white">UI 設計對比</h2>
        <p className="text-white/50 mt-2">Windows 11 一般版 vs LTSC 2024</p>
      </div>

      {/* Comparison Table */}
      <div className={`w-full max-w-4xl transition-all duration-700 ${
        step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center text-white/60 text-sm font-medium py-2">比較項目</div>
          <div className="text-center text-blue-300 text-sm font-medium py-2 px-4 rounded-xl bg-blue-500/10 border border-blue-400/20">
            Windows 11
          </div>
          <div className="text-center text-emerald-300 text-sm font-medium py-2 px-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
            LTSC 2024
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {comparisons.map((item, i) => (
            <div key={i} className={`grid grid-cols-3 gap-4 transition-all duration-500 ${
              step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="flex items-center justify-center">
                <span className="text-white/70 text-sm font-medium">{item.category}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm
                hover:bg-blue-500/10 hover:border-blue-400/20 transition-all">
                <p className="text-white/80 text-sm text-center">{item.win11}</p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm
                hover:bg-emerald-500/10 hover:border-emerald-400/20 transition-all">
                <p className="text-white/80 text-sm text-center">{item.ltsc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className={`mt-8 transition-all duration-700 ${
        step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-white/10 backdrop-blur-sm">
          <p className="text-white/80 text-center text-sm">
            💡 <span className="text-white font-medium">核心差異：</span>
            LTSC 2024 基於 Windows 11 24H2，擁有相同的 Fluent Design 基礎，但移除了消費級功能和持續更新
          </p>
        </div>
      </div>

      {/* Animated divider */}
      <div className={`absolute top-0 left-1/3 w-px h-full transition-all duration-1000 ${
        step >= 2 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
