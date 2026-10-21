interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentScene: number;
  totalScenes: number;
}

export default function Controls({ isPlaying, onPlayPause, onNext, onPrev, currentScene, totalScenes }: ControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-50">
      {/* Previous */}
      <button
        onClick={onPrev}
        disabled={currentScene === 0}
        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
          flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
      >
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Play/Pause */}
      <button
        onClick={onPlayPause}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center
          transition-all backdrop-blur-sm border border-white/10"
      >
        {isPlaying ? (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        disabled={currentScene === totalScenes - 1}
        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
          flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
      >
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scene counter */}
      <span className="text-white/40 text-xs ml-2 font-mono">
        {currentScene + 1}/{totalScenes}
      </span>
    </div>
  );
}
