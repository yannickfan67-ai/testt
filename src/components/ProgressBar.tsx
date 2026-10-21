interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
  scenes: { id: string; duration: number }[];
  onSceneClick: (index: number) => void;
}

const sceneLabels: Record<string, string> = {
  title: '開場',
  desktop: '桌面',
  win11: 'Win11',
  ltsc: 'LTSC',
  compare: '對比',
  closing: '結尾',
};

export default function ProgressBar({ current, total, progress, scenes, onSceneClick }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      {/* Scene segments */}
      <div className="flex h-1">
        {scenes.map((scene, i) => {
          const isActive = i === current;
          const isPast = i < current;
          const fillWidth = isActive ? progress : isPast ? 100 : 0;

          return (
            <div
              key={i}
              className="relative flex-1 cursor-pointer group"
              onClick={() => onSceneClick(i)}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-white/10" />
              {/* Fill */}
              <div
                className="absolute inset-y-0 left-0 transition-all duration-100"
                style={{
                  width: `${fillWidth}%`,
                  background: isActive
                    ? 'linear-gradient(90deg, #3b82f6, #06b6d4)'
                    : isPast
                    ? 'rgba(255,255,255,0.5)'
                    : 'transparent',
                }}
              />
              {/* Hover tooltip */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-[10px] text-white bg-black/60 px-2 py-0.5 rounded whitespace-nowrap">
                  {sceneLabels[scene.id] || scene.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
