import { useState, useEffect } from 'react';

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const scenes = ['title', 'desktop', 'win11', 'ltsc', 'compare', 'closing'];

  useEffect(() => {
    if (!isPlaying) return;
    const duration = 5000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentScene(s => (s + 1) % scenes.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, scenes.length]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Title Scene */}
      {currentScene === 0 && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 50%, #1a1a2e 100%)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            width: 96,
            height: 96,
            marginBottom: 32,
          }}>
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 2 }} />
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 2 }} />
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 2 }} />
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 2 }} />
          </div>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
          }}>
            Windows 11
          </h1>
          <p style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'rgba(255,255,255,0.8)',
            marginTop: 16,
          }}>
            & LTSC 2024
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255,255,255,0.6)',
            marginTop: 32,
          }}>
            UI 與設計深度解析
          </p>
        </div>
      )}

      {/* Desktop Scene */}
      {currentScene === 1 && (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, #1a1a3e 0%, #0d1b2a 50%, #2d1b69 100%)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 32,
            left: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {['💻', '🗑️', '🌐'].map((icon, i) => (
              <div key={i} style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}>{icon}</div>
            ))}
          </div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.2)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              padding: 10,
            }}>
              <div style={{ background: 'white', borderRadius: 1 }} />
              <div style={{ background: 'white', borderRadius: 1 }} />
              <div style={{ background: 'white', borderRadius: 1 }} />
              <div style={{ background: 'white', borderRadius: 1 }} />
            </div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}>
            <div style={{
              padding: '12px 24px',
              borderRadius: 16,
              background: 'rgba(0,0,0,0.4)',
            }}>
              <p style={{ color: 'white', fontSize: 18, margin: 0 }}>Windows 11 桌面</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 4 }}>
                居中工作列 · Mica 材質 · 圓角設計
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Win11 Scene */}
      {currentScene === 2 && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 100%)',
        }}>
          <div style={{
            width: '50%',
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <h2 style={{ fontSize: 40, fontWeight: 'bold', color: 'white', margin: 0 }}>
              Windows 11
            </h2>
            <p style={{ color: 'rgb(147 197 253)', marginTop: 8 }}>全新設計語言</p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '🎨', title: 'Fluent Design System' },
                { icon: '⭕', title: '圓角 UI' },
                { icon: '📐', title: '居中工作列' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: 16,
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <span style={{ color: 'white', fontSize: 14 }}>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 320,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{
                height: 40,
                background: '#202020',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>📁 檔案總管</span>
              </div>
              <div style={{ height: 208, background: '#282832' }}>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    {['📁', '🖼️', '📄'].map((icon, i) => (
                      <div key={i} style={{
                        padding: 16,
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.05)',
                        textAlign: 'center',
                        fontSize: 24,
                      }}>{icon}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LTSC Scene */}
      {currentScene === 3 && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        }}>
          <div style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 320,
              height: 208,
              borderRadius: 16,
              background: 'linear-gradient(160deg, #003366 0%, #001a33 100%)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 12,
                left: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                {['💻', '🗑️'].map((icon, i) => (
                  <div key={i} style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}>{icon}</div>
                ))}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 32,
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                  padding: 4,
                }}>
                  <div style={{ background: 'rgba(255,255,255,0.7)' }} />
                  <div style={{ background: 'rgba(255,255,255,0.7)' }} />
                  <div style={{ background: 'rgba(255,255,255,0.7)' }} />
                  <div style={{ background: 'rgba(255,255,255,0.7)' }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{
            width: '50%',
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <h2 style={{ fontSize: 40, fontWeight: 'bold', color: 'white', margin: 0 }}>
              LTSC 2024
            </h2>
            <p style={{ color: 'rgb(110 231 183)', marginTop: 8 }}>長期服務通道 · 企業級穩定</p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '⚡', title: '極簡化系統' },
                { icon: '🔒', title: '長期支援' },
                { icon: '🏢', title: '企業導向' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: 16,
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <span style={{ color: 'white', fontSize: 14 }}>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compare Scene */}
      {currentScene === 4 && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}>
          <h2 style={{ fontSize: 40, fontWeight: 'bold', color: 'white', margin: 0 }}>
            UI 設計對比
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            Windows 11 vs LTSC 2024
          </p>
          <div style={{ marginTop: 32, width: '100%', maxWidth: 800 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                比較項目
              </div>
              <div style={{
                textAlign: 'center',
                color: 'rgb(147 197 253)',
                fontSize: 14,
                padding: 8,
                borderRadius: 12,
                background: 'rgba(59,130,246,0.1)',
              }}>
                Windows 11
              </div>
              <div style={{
                textAlign: 'center',
                color: 'rgb(110 231 183)',
                fontSize: 14,
                padding: 8,
                borderRadius: 12,
                background: 'rgba(16,185,129,0.1)',
              }}>
                LTSC 2024
              </div>
            </div>
            {[
              { category: '設計語言', win11: 'Fluent Design', ltsc: '相同基礎' },
              { category: '預裝應用', win11: '完整應用', ltsc: '僅核心' },
              { category: '更新策略', win11: '持續更新', ltsc: '僅安全更新' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 16,
                marginBottom: 12,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 14,
                }}>
                  {item.category}
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 14,
                }}>
                  {item.win11}
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 14,
                }}>
                  {item.ltsc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing Scene */}
      {currentScene === 5 && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 100%)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            width: 64,
            height: 64,
            marginBottom: 32,
          }}>
            <div style={{ background: '#60a5fa', borderRadius: 2 }} />
            <div style={{ background: '#34d399', borderRadius: 2 }} />
            <div style={{ background: '#34d399', borderRadius: 2 }} />
            <div style={{ background: '#60a5fa', borderRadius: 2 }} />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 'bold', color: 'white', margin: 0 }}>
            總結
          </h2>
          <p style={{
            maxWidth: 600,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 18,
            lineHeight: 1.6,
            marginTop: 24,
          }}>
            Windows 11 帶來了全新的 Fluent Design 設計語言，
            而 LTSC 2024 則在保持相同設計基礎的同時，
            提供了更精簡、更穩定的企業級體驗。
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginTop: 32,
          }}>
            <div style={{
              padding: '12px 24px',
              borderRadius: 16,
              background: 'rgba(59,130,246,0.2)',
              border: '1px solid rgba(96,165,250,0.3)',
            }}>
              <span style={{ color: 'rgb(147 197 253)', fontWeight: 500 }}>Windows 11</span>
              <p style={{ color: 'rgba(191,219,254,0.6)', fontSize: 12, marginTop: 4 }}>
                創新 · 豐富
              </p>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 24 }}>VS</span>
            <div style={{
              padding: '12px 24px',
              borderRadius: 16,
              background: 'rgba(16,185,129,0.2)',
              border: '1px solid rgba(52,211,153,0.3)',
            }}>
              <span style={{ color: 'rgb(110 231 183)', fontWeight: 500 }}>LTSC 2024</span>
              <p style={{ color: 'rgba(167,243,208,0.6)', fontSize: 12, marginTop: 4 }}>
                穩定 · 精簡
              </p>
            </div>
          </div>
          <p style={{
            position: 'absolute',
            bottom: 96,
            color: 'rgba(255,255,255,0.4)',
            fontSize: 14,
          }}>
            感謝觀看
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        display: 'flex',
        zIndex: 50,
      }}>
        {scenes.map((_, i) => {
          const isActive = i === currentScene;
          const isPast = i < currentScene;
          const fillWidth = isActive ? progress : isPast ? 100 : 0;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCurrentScene(i);
                setProgress(0);
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.1)',
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: `${fillWidth}%`,
                background: isActive
                  ? 'linear-gradient(90deg, #3b82f6, #06b6d4)'
                  : isPast
                  ? 'rgba(255,255,255,0.5)'
                  : 'transparent',
                transition: 'width 0.1s linear',
              }} />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 50,
      }}>
        <button
          onClick={() => setCurrentScene(s => Math.max(0, s - 1))}
          disabled={currentScene === 0}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            cursor: currentScene === 0 ? 'not-allowed' : 'pointer',
            opacity: currentScene === 0 ? 0.3 : 1,
          }}
        >
          ◀
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={() => setCurrentScene(s => (s + 1) % scenes.length)}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          ▶
        </button>
        <span style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 12,
          fontFamily: 'monospace',
          marginLeft: 8,
        }}>
          {currentScene + 1}/{scenes.length}
        </span>
      </div>

      {/* Scene Dots */}
      <div style={{
        position: 'absolute',
        bottom: 64,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        zIndex: 50,
      }}>
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentScene(i);
              setProgress(0);
            }}
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

export default App;
