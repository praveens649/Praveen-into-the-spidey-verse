import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  src: string;
  duration: string;
  cover: string;
}

const PLAYLIST: Track[] = [
  {
    title: 'Am I Dreaming',
    artist: 'Metro Boomin, A$AP Rocky',
    src: '/playlists/ami-dreaming.mp3',
    duration: '4:16',
    cover: '/home/spiderverse-logo.jpeg',
  },
  {
    title: 'Sunflower',
    artist: 'Post Malone, Swae Lee',
    src: '/playlists/sunflower.mp3',
    duration: '2:38',
    cover: '/home/spiderverse-logo.jpeg',
  },
  {
    title: 'Calling',
    artist: 'Metro Boomin, NAV',
    src: '/playlists/calling.mp3',
    duration: '3:39',
    cover: '/home/spiderverse-logo.jpeg',
  },
  {
    title: 'Hummingbird',
    artist: 'Metro Boomin, James Blake',
    src: '/playlists/hummingbird.mp3',
    duration: '5:19',
    cover: '/home/spiderverse-logo.jpeg',
  },
  {
    title: 'Self Love',
    artist: 'Metro Boomin, Coi Leray',
    src: '/playlists/self-love.mp3',
    duration: '3:09',
    cover: '/home/spiderverse-logo.jpeg',
  },
];

export const AudioPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(256);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = track.src;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative group select-none pointer-events-auto origin-top">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        preload="metadata"
      />

      {/* Spider-Verse Authentic Smartphone Shell */}
      <div
        className="w-14 flex flex-col px-0.5 pb-2 shadow-2xl transition-transform hover:scale-110 active:scale-95"
        style={{
          height: '100px',
          borderRadius: '3px',
          backgroundColor: '#FAF2DE',
          position: 'relative',
          border: '1.5px solid #1a1a1a',
          boxShadow: '0 8px 24px rgba(0,0,0,0.65), 0 0 10px rgba(230,62,55,0.2)',
        }}
      >
        {/* Speaker slot at top */}
        <div className="flex flex-col items-center gap-0.5 my-0.5">
          <div
            style={{
              width: '15px',
              height: '2px',
              borderRadius: '9999px',
              backgroundColor: '#000',
            }}
          />
          <div
            style={{
              width: '15px',
              height: '0.5px',
              backgroundColor: '#7D8176',
              borderRadius: '1px',
            }}
          />
        </div>

        {/* Screen container */}
        <div
          className="flex-1 flex flex-col overflow-hidden cursor-pointer"
          style={{
            borderRadius: '2px',
            backgroundColor: '#FAF2DE',
            position: 'relative',
          }}
          onClick={togglePlay}
        >
          {/* Phone cracks overlay */}
          <img
            src="/home/phone-cracks.svg"
            alt="Phone Cracks"
            aria-hidden="true"
            width={400}
            height={400}
            style={{
              position: 'absolute',
              top: -10,
              left: -15,
              pointerEvents: 'none',
              zIndex: 10,
              opacity: 0.9,
              transform: 'rotate(140deg)',
            }}
          />

          {/* Album Cover Art */}
          <div className="flex justify-center pt-0.5 relative z-5">
            <img
              src="/home/spiderverse-logo.jpeg"
              alt="Spiderverse Logo"
              width={45}
              height={45}
              className="rounded-sm object-cover"
              style={{ width: '45px', height: '45px' }}
            />
          </div>

          {/* Track Name */}
          <p
            className="truncate px-1 mt-0.5 text-center font-bold tracking-tight"
            style={{
              fontSize: '5.5px',
              color: '#1a1a1a',
              lineHeight: 1.2,
            }}
          >
            {track.title}
          </p>

          {/* Time & Progress */}
          <div className="px-1 mt-0.5">
            <div
              style={{
                height: 2,
                backgroundColor: 'rgba(0,0,0,0.15)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#E63E37',
                  transition: 'width 0.2s linear',
                }}
              />
            </div>
            <div
              className="flex justify-between font-mono"
              style={{ fontSize: '4.5px', color: '#555', marginTop: '1px' }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* Micro Playback Controls */}
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-0.5 text-black hover:text-[#E63E37] transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={7} fill="currentColor" />
              ) : (
                <Play size={7} fill="currentColor" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextTrack();
              }}
              className="p-0.5 text-black hover:text-[#E63E37] transition-colors"
              title="Next Track"
            >
              <SkipForward size={7} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
