import { useState, useEffect, useCallback } from 'react';

const SCENES = [
  { id: 'title', duration: 5000 },
  { id: 'desktop', duration: 8000 },
  { id: 'win11', duration: 8000 },
  { id: 'ltsc', duration: 8000 },
  { id: 'compare', duration: 10000 },
  { id: 'closing', duration: 6000 },
];

const sceneLabels: Record<string, string> = {
  title: '開場',
  desktop: '桌面',
  win11: 'Win11',
  ltsc: 'LTSC',
  compare: '對比',
  closing: '結尾',
};

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goToScene = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentScene(index);
      setProgress(0);
      setTransitioning(false);
    }, 500);
  }, [transitioning]);

  const nextScene = useCallback(() => {
    if (currentScene < SCENES.length - 1) {
      goToScene(currentScene + 1);
    } else {
      goToScene(0);
    }
  }, [currentScene, goToScene]);

  const prevScene = useCallback(() => {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  }, [currentScene, goToScene]);

  useEffect(() => {
    if (!isPlaying) return;
    const duration = SCENES[currentScene].duration;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextScene();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentScene, isPlaying, nextScene]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextScene();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevScene();
      } else if (e.key === 'p') {
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScene, prevScene]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000', position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Scene Container */}
      <div style={{ width: '100%', height: '100%', transition: 'opacity 0.5s', opacity: transitioning ? 0 : 1 }}>
        {currentScene === 0 && <TitleScene />}
        {currentScene === 1 && <DesktopScene />}
        {currentScene === 2 && <Win11Scene />}
        {currentScene === 3 && <LTSCScene />}
        {currentScene === 4 && <CompareScene />}
        {currentScene === 5 && <ClosingScene />}
      </div>

      {/* Progress Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', height: 4 }}>
        {SCENES.map((scene, i) => {
          const isActive = i === currentScene;
          const isPast = i < currentScene;
          const fillWidth = isActive ? progress : isPast ? 100 : 0;
          return (
            <div
              key={i}
              style={{ flex: 1, position: 'relative', cursor: 'pointer' }}
              onClick={() => goToScene(i)}
              title={sceneLabels[scene.id]}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: 0,
                width: `${fillWidth}%`,
                background: isActive ? 'linear-gradient(90deg, #3b82f6, #06b6d4)' : isPast ? 'rgba(255,255,255,0.5)' : 'transparent',
                transition: 'width 0.1s linear',
              }} />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, zIndex: 50 }}>
        <button onClick={prevScene} disabled={currentScene === 0}
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: currentScene === 0 ? 'not-allowed' : 'pointer', opacity: currentScene === 0 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ◀
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)}
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={nextScene} disabled={currentScene === SCENES.length - 1}
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: currentScene === SCENES.length - 1 ? 'not-allowed' : 'pointer', opacity: currentScene === SCENES.length - 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ▶
        </button>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'monospace', marginLeft: 8 }}>
          {currentScene + 1}/{SCENES.length}
        </span>
      </div>

      {/* Scene dots */}
      <div style={{ position: 'absolute', bottom: 64, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 50 }}>
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToScene(i)}
            style={{
              width: i === currentScene ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === currentScene ? 'white' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ===== Scene Components =====

function TitleScene() {
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 200);
    const t2 = setTimeout(() => setShow(true), 800);
    const t3 = setTimeout(() => setShowSub(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 30%, #003a6a 60%, #1a1a2e 100%)',
    }}>
      {/* Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%', opacity: 0.2,
          width: Math.random() * 80 + 20, height: Math.random() * 80 + 20,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}

      {/* Windows Logo */}
      <div style={{
        transition: 'all 1s', opacity: showLogo ? 1 : 0, transform: showLogo ? 'scale(1)' : 'scale(0.5)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: 96, height: 96, marginBottom: 32 }}>
          {[0.2, 0.4, 0.6, 0.8].map((delay, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.9)', borderRadius: 2,
              animation: showLogo ? `logoReveal 0.5s ease forwards ${delay}s` : 'none',
              opacity: 0,
            }} />
          ))}
        </div>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 'bold', color: 'white',
        letterSpacing: '-0.025em', transition: 'all 1s',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(32px)',
        margin: 0,
      }}>
        Windows 11
      </h1>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, marginTop: 16,
        transition: 'all 1s', opacity: showSub ? 1 : 0, transform: showSub ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'rgb(191 219 254)', fontWeight: 300 }}>&</span>
        <span style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>LTSC 2024</span>
      </div>

      <p style={{
        marginTop: 32, fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.7)',
        transition: 'all 1s 0.5s', opacity: showSub ? 1 : 0,
      }}>
        UI 與設計深度解析
      </p>

      <div style={{
        marginTop: 48, height: 2,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)',
        transition: 'all 1.5s', width: showSub ? 256 : 0, opacity: showSub ? 1 : 0,
      }} />
    </div>
  );
}

function DesktopScene() {
  const [show, setShow] = useState(false);
  const [taskbarShow, setTaskbarShow] = useState(false);
  const [widgetsShow, setWidgetsShow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 300);
    const t2 = setTimeout(() => setTaskbarShow(true), 1000);
    const t3 = setTimeout(() => setWidgetsShow(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Wallpaper */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #1a1a3e 0%, #0d1b2a 30%, #1b2838 50%, #2d1b69 80%, #1a0533 100%)',
      }}>
        <div style={{
          position: 'absolute', top: '33%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 384, height: 384, borderRadius: '50%', opacity: 0.3,
          background: 'radial-gradient(circle, #4a90d9 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '25%', right: '25%',
          width: 256, height: 256, borderRadius: '50%', opacity: 0.2,
          background: 'radial-gradient(circle, #9b59b6 0%, transparent 70%)',
        }} />
      </div>

      {/* Desktop Icons */}
      <div style={{
        position: 'absolute', top: 32, left: 32, display: 'flex', flexDirection: 'column', gap: 16,
        transition: 'all 0.7s', opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-32px)',
      }}>
        {[
          { icon: '💻', name: '此電腦' },
          { icon: '🗑️', name: '資源回收筒' },
          { icon: '🌐', name: 'Edge' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 8, background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }}>{item.icon}</div>
            <span style={{
              fontSize: 12, color: 'rgba(255,255,255,0.9)', textAlign: 'center',
              padding: '2px 4px', borderRadius: 4, background: 'rgba(0,0,0,0.2)',
            }}>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Widgets Panel */}
      <div style={{
        position: 'absolute', top: 32, right: 32, width: 280,
        transition: 'all 0.7s', opacity: widgetsShow ? 1 : 0, transform: widgetsShow ? 'translateX(0)' : 'translateX(32px)',
      }}>
        <div style={{
          borderRadius: 16, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)', padding: 16,
        }}>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>小工具</div>
          <div style={{ borderRadius: 12, background: 'rgba(255,255,255,0.1)', padding: 12, marginBottom: 8 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>天氣</div>
            <div style={{ color: 'white', fontSize: 28, fontWeight: 300, marginTop: 4 }}>23°C ☀️</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>台北市 · 晴天</div>
          </div>
          <div style={{ borderRadius: 12, background: 'rgba(255,255,255,0.1)', padding: 12 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>股票</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{ color: 'white', fontSize: 18, fontWeight: 500 }}>TSMC</span>
              <span style={{ color: '#4ade80', fontSize: 14 }}>+2.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.7s', opacity: taskbarShow ? 1 : 0, transform: taskbarShow ? 'translateY(0)' : 'translateY(100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Start */}
          <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: 20, height: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
              <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
              <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
              <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
            </div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}>🔍</div>
          <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}>📋</div>
          {['📁', '🌐', '💬'].map((icon, i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20 }}>{icon}</div>
          ))}
        </div>
        {/* System Tray */}
        <div style={{ position: 'absolute', right: 16, display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
          <span>🔊</span><span>📶</span><span>🔋</span><span>14:30</span>
        </div>
      </div>

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', transition: 'all 0.7s', opacity: taskbarShow ? 1 : 0,
      }}>
        <div style={{ padding: '12px 24px', borderRadius: 16, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontWeight: 500, margin: 0 }}>Windows 11 桌面</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 4 }}>居中工作列 · Mica 材質 · 圓角設計</p>
        </div>
      </div>
    </div>
  );
}

function Win11Scene() {
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
    <div style={{
      width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0d2137 100%)',
    }}>
      {/* Left */}
      <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 48, position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 'bold', color: 'white', marginBottom: 8,
          transition: 'all 0.7s', opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateX(0)' : 'translateX(-32px)',
          margin: 0,
        }}>Windows 11</h2>
        <p style={{
          color: 'rgb(147 197 253)', marginBottom: 32,
          transition: 'all 0.7s 0.2s', opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateX(0)' : 'translateX(-32px)',
        }}>全新設計語言</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 16, padding: 16,
              borderRadius: 16, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.5s', transitionDelay: `${i * 150}ms`,
              opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'translateX(0)' : 'translateX(-32px)',
            }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{feature.icon}</span>
              <div>
                <h3 style={{ color: 'white', fontWeight: 500, fontSize: 14, margin: 0 }}>{feature.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2, margin: '2px 0 0' }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Visual */}
      <div style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{
          position: 'relative', transition: 'all 1s',
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'scale(1)' : 'scale(0.9)',
        }}>
          {/* Window */}
          <div style={{ width: 320, borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Title bar */}
            <div style={{ height: 40, background: '#202020', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>📁</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>檔案總管</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }}>─</span>
                </div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }}>□</span>
                </div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }}>✕</span>
                </div>
              </div>
            </div>
            {/* Content */}
            <div style={{ height: 208, background: 'linear-gradient(180deg, rgba(32,32,32,0.95) 0%, rgba(40,40,50,0.9) 100%)', backdropFilter: 'blur(20px)' }}>
              {/* Toolbar */}
              <div style={{ height: 40, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
                {['📋', '✂️', '📄', '↩️', '↪️'].map((icon, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14 }}>{icon}</div>
                ))}
              </div>
              {/* Body */}
              <div style={{ display: 'flex' }}>
                <div style={{ width: 128, borderRight: '1px solid rgba(255,255,255,0.1)', padding: 8 }}>
                  {['⭐ 快速存取', '🏠 主頁', '📁 桌面', '📥 下載'].map((item, i) => (
                    <div key={i} style={{
                      fontSize: 10, color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                      padding: '4px 8px', borderRadius: 4,
                      background: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
                    }}>{item}</div>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 8 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    {['📁', '🖼️', '📄', '🎵', '📊', '📁'].map((icon, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 8, borderRadius: 8 }}>
                        <span style={{ fontSize: 18 }}>{icon}</span>
                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>檔案{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Annotation */}
          <div style={{
            position: 'absolute', bottom: -64, left: '50%',
            whiteSpace: 'nowrap', transition: 'all 0.7s',
            opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
          }}>
            <div style={{ padding: '8px 16px', borderRadius: 12, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(96,165,250,0.3)', backdropFilter: 'blur(8px)' }}>
              <p style={{ color: 'rgb(191 219 254)', fontSize: 12, margin: 0 }}>↑ Mica 材質 · 圓角視窗 · 現代化檔案總管</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 384, height: 384, opacity: 0.1,
        background: 'radial-gradient(circle, #0078d4 0%, transparent 70%)',
      }} />
    </div>
  );
}

function LTSCScene() {
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
    <div style={{
      width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a2e 100%)',
    }}>
      {/* Left - Visual */}
      <div style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{
          position: 'relative', transition: 'all 1s',
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'scale(1)' : 'scale(0.9)',
        }}>
          {/* Clean desktop */}
          <div style={{ width: 320, height: 208, borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #003366 0%, #001a33 50%, #000d1a 100%)' }} />
            {/* Minimal taskbar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 2, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, width: 12, height: 12 }}>
                    <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 0.5 }} />
                    <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 0.5 }} />
                    <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 0.5 }} />
                    <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 0.5 }} />
                  </div>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: 2, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>📁</div>
              </div>
              <div style={{ position: 'absolute', right: 8, fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>14:30</div>
            </div>
            {/* Few icons */}
            <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ icon: '💻', name: '此電腦' }, { icon: '🗑️', name: '回收筒' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 4, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{item.icon}</div>
                  <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Annotation */}
          <div style={{
            position: 'absolute', bottom: -64, left: '50%', whiteSpace: 'nowrap',
            transition: 'all 0.7s',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
          }}>
            <div style={{ padding: '8px 16px', borderRadius: 12, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(52,211,153,0.3)', backdropFilter: 'blur(8px)' }}>
              <p style={{ color: 'rgb(167 243 208)', fontSize: 12, margin: 0 }}>↑ 精簡桌面 · 無多餘應用 · 純淨體驗</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 48, position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 'bold', color: 'white', marginBottom: 8,
          transition: 'all 0.7s', opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateX(0)' : 'translateX(-32px)',
          margin: 0,
        }}>LTSC 2024</h2>
        <p style={{
          color: 'rgb(110 231 183)', marginBottom: 32,
          transition: 'all 0.7s 0.2s', opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateX(0)' : 'translateX(-32px)',
        }}>長期服務通道 · 企業級穩定</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 16, padding: 16,
              borderRadius: 16, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.5s', transitionDelay: `${i * 150}ms`,
              opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'translateX(0)' : 'translateX(-32px)',
            }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{feature.icon}</span>
              <div>
                <h3 style={{ color: 'white', fontWeight: 500, fontSize: 14, margin: 0 }}>{feature.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2, margin: '2px 0 0' }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: 384, height: 384, opacity: 0.1,
        background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
      }} />
    </div>
  );
}

function CompareScene() {
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
    { category: '設計語言', win11: 'Fluent Design · Mica/Acrylic', ltsc: 'Fluent Design · 相同基礎' },
    { category: '預裝應用', win11: 'Teams、Clipchamp、Xbox 等', ltsc: '僅核心系統應用' },
    { category: '更新策略', win11: '持續功能更新', ltsc: '僅安全更新 · 5年支援' },
    { category: '系統資源', win11: '較多背景服務', ltsc: '精簡服務 · 低資源佔用' },
    { category: '適用場景', win11: '個人用戶 · 創意工作者', ltsc: '企業 · 伺服器 · 穩定環境' },
    { category: 'UI 差異', win11: '完整 Widget、Copilot', ltsc: '無 Widget · 無 Copilot' },
  ];

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 32, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    }}>
      {/* Title */}
      <div style={{
        textAlign: 'center', marginBottom: 32, transition: 'all 0.7s',
        opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateY(0)' : 'translateY(-32px)',
      }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 'bold', color: 'white', margin: 0 }}>UI 設計對比</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>Windows 11 一般版 vs LTSC 2024</p>
      </div>

      {/* Table */}
      <div style={{
        width: '100%', maxWidth: 896, transition: 'all 0.7s',
        opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'translateY(0)' : 'translateY(32px)',
      }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500, padding: 8 }}>比較項目</div>
          <div style={{ textAlign: 'center', color: 'rgb(147 197 253)', fontSize: 14, fontWeight: 500, padding: 8, borderRadius: 12, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>Windows 11</div>
          <div style={{ textAlign: 'center', color: 'rgb(110 231 183)', fontSize: 14, fontWeight: 500, padding: 8, borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>LTSC 2024</div>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {comparisons.map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
              transition: 'all 0.5s', transitionDelay: `${i * 200}ms`,
              opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'translateY(0)' : 'translateY(16px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500 }}>{item.category}</span>
              </div>
              <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', margin: 0 }}>{item.win11}</p>
              </div>
              <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', margin: 0 }}>{item.ltsc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div style={{
        marginTop: 32, transition: 'all 0.7s',
        opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? 'translateY(0)' : 'translateY(16px)',
      }}>
        <div style={{ padding: '16px 32px', borderRadius: 16, background: 'linear-gradient(to right, rgba(59,130,246,0.1), rgba(16,185,129,0.1))', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: 14, margin: 0 }}>
            💡 <span style={{ color: 'white', fontWeight: 500 }}>核心差異：</span>
            LTSC 2024 基於 Windows 11 24H2，擁有相同的 Fluent Design 基礎，但移除了消費級功能和持續更新
          </p>
        </div>
      </div>
    </div>
  );
}

function ClosingScene() {
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
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',
    }}>
      {/* Stars */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          width: Math.random() * 4 + 2, height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '16, 185, 129'}, ${Math.random() * 0.5 + 0.2})`,
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}

      {/* Logo */}
      <div style={{
        transition: 'all 1s', opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'scale(1)' : 'scale(0.9)',
        zIndex: 10,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: 64, height: 64, margin: '0 auto 32px' }}>
          <div style={{ background: '#60a5fa', borderRadius: 2 }} />
          <div style={{ background: '#34d399', borderRadius: 2 }} />
          <div style={{ background: '#34d399', borderRadius: 2 }} />
          <div style={{ background: '#60a5fa', borderRadius: 2 }} />
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', fontWeight: 'bold', color: 'white', marginBottom: 16, textAlign: 'center', margin: 0 }}>總結</h2>
      </div>

      <div style={{
        maxWidth: 672, textAlign: 'center', zIndex: 10, transition: 'all 1s 0.3s',
        opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.625, marginBottom: 24 }}>
          Windows 11 帶來了全新的 Fluent Design 設計語言，
          而 LTSC 2024 則在保持相同設計基礎的同時，
          提供了更精簡、更穩定的企業級體驗。
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 32 }}>
          <div style={{
            padding: '12px 24px', borderRadius: 16, background: 'rgba(59,130,246,0.2)',
            border: '1px solid rgba(96,165,250,0.3)',
            transition: 'all 0.5s',
            opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? 'translateX(0)' : 'translateX(-32px)',
          }}>
            <span style={{ color: 'rgb(147 197 253)', fontWeight: 500 }}>Windows 11</span>
            <p style={{ color: 'rgba(191,219,254,0.6)', fontSize: 12, marginTop: 4, margin: '4px 0 0' }}>創新 · 豐富</p>
          </div>

          <div style={{
            color: 'rgba(255,255,255,0.3)', fontSize: 24,
            transition: 'all 0.5s',
            opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? 'scale(1)' : 'scale(0.5)',
          }}>VS</div>

          <div style={{
            padding: '12px 24px', borderRadius: 16, background: 'rgba(16,185,129,0.2)',
            border: '1px solid rgba(52,211,153,0.3)',
            transition: 'all 0.5s',
            opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? 'translateX(0)' : 'translateX(32px)',
          }}>
            <span style={{ color: 'rgb(110 231 183)', fontWeight: 500 }}>LTSC 2024</span>
            <p style={{ color: 'rgba(167,243,208,0.6)', fontSize: 12, marginTop: 4, margin: '4px 0 0' }}>穩定 · 精簡</p>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 96, textAlign: 'center',
        transition: 'all 1s 0.5s', opacity: step >= 3 ? 1 : 0,
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>感謝觀看 · 使用代碼構建的 UI 展示</p>
      </div>
    </div>
  );
}

export default App;
