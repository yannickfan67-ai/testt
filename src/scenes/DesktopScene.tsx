import { useEffect, useState } from 'react';

export default function DesktopScene() {
  const [show, setShow] = useState(false);
  const [taskbarShow, setTaskbarShow] = useState(false);
  const [widgetsShow, setWidgetsShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
    setTimeout(() => setTaskbarShow(true), 1000);
    setTimeout(() => setWidgetsShow(true), 2000);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Desktop wallpaper simulation */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(160deg, #1a1a3e 0%, #0d1b2a 30%, #1b2838 50%, #2d1b69 80%, #1a0533 100%)'
      }}>
        {/* Bloom effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #4a90d9 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #9b59b6 0%, transparent 70%)' }} />
      </div>

      {/* Desktop Icons */}
      <div className={`absolute top-8 left-8 flex flex-col gap-4 transition-all duration-700 ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}>
        {['此電腦', '資源回收筒', 'Edge'].map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer"
            style={{ animationDelay: `${i * 200}ms` }}>
            <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center
              group-hover:bg-white/20 transition-all">
              <span className="text-2xl">{['💻', '🗑️', '🌐'][i]}</span>
            </div>
            <span className="text-xs text-white/90 text-center px-1 rounded bg-black/20">{name}</span>
          </div>
        ))}
      </div>

      {/* Widgets Panel */}
      <div className={`absolute top-8 right-8 w-72 transition-all duration-700 ${
        widgetsShow ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}>
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 space-y-3">
          <div className="text-white/80 text-sm font-medium">小工具</div>
          <div className="rounded-xl bg-white/10 p-3">
            <div className="text-white/60 text-xs">天氣</div>
            <div className="text-white text-2xl font-light mt-1">23°C ☀️</div>
            <div className="text-white/50 text-xs mt-1">台北市 · 晴天</div>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <div className="text-white/60 text-xs">股票</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white text-lg font-medium">TSMC</span>
              <span className="text-green-400 text-sm">+2.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Taskbar - Windows 11 centered */}
      <div className={`absolute bottom-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-xl border-t border-white/10
        flex items-center justify-center transition-all duration-700 ${
        taskbarShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}>
        <div className="flex items-center gap-3">
          {/* Start Button */}
          <div className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all">
            <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
              <div className="bg-white/80 rounded-[1px]" />
              <div className="bg-white/80 rounded-[1px]" />
              <div className="bg-white/80 rounded-[1px]" />
              <div className="bg-white/80 rounded-[1px]" />
            </div>
          </div>
          {/* Search */}
          <div className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all">
            <span className="text-white/70">🔍</span>
          </div>
          {/* Task View */}
          <div className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all">
            <span className="text-white/70">📋</span>
          </div>
          {/* Apps */}
          {['📁', '🌐', '💬'].map((icon, i) => (
            <div key={i} className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all">
              <span className="text-xl">{icon}</span>
            </div>
          ))}
        </div>

        {/* System Tray */}
        <div className="absolute right-4 flex items-center gap-3 text-white/60 text-xs">
          <span>🔊</span>
          <span>📶</span>
          <span>🔋</span>
          <span>14:30</span>
        </div>
      </div>

      {/* Label */}
      <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
        taskbarShow ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
          <p className="text-white/90 text-lg font-medium">Windows 11 桌面</p>
          <p className="text-white/50 text-sm mt-1">居中工作列 · Mica 材質 · 圓角設計</p>
        </div>
      </div>
    </div>
  );
}
