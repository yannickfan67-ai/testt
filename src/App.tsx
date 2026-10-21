import { useState, useEffect, useCallback } from 'react';
import TitleScene from './scenes/TitleScene';
import Win11Scene from './scenes/Win11Scene';
import LTSCScene from './scenes/LTSCScene';
import CompareScene from './scenes/CompareScene';
import DesktopScene from './scenes/DesktopScene';
import ClosingScene from './scenes/ClosingScene';
import ProgressBar from './components/ProgressBar';
import Controls from './components/Controls';

const SCENES = [
  { id: 'title', duration: 5000 },
  { id: 'desktop', duration: 8000 },
  { id: 'win11', duration: 8000 },
  { id: 'ltsc', duration: 8000 },
  { id: 'compare', duration: 10000 },
  { id: 'closing', duration: 6000 },
];

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

  const renderScene = () => {
    const sceneId = SCENES[currentScene].id;
    switch (sceneId) {
      case 'title': return <TitleScene />;
      case 'desktop': return <DesktopScene />;
      case 'win11': return <Win11Scene />;
      case 'ltsc': return <LTSCScene />;
      case 'compare': return <CompareScene />;
      case 'closing': return <ClosingScene />;
      default: return <TitleScene />;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative font-sans">
      {/* Scene Container */}
      <div className={`w-full h-full transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderScene()}
      </div>

      {/* Progress Bar */}
      <ProgressBar
        current={currentScene}
        total={SCENES.length}
        progress={progress}
        scenes={SCENES}
        onSceneClick={goToScene}
      />

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={nextScene}
        onPrev={prevScene}
        currentScene={currentScene}
        totalScenes={SCENES.length}
      />

      {/* Scene indicator dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToScene(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentScene ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
