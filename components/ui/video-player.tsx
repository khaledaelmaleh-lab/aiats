"use client";

import { useState, useRef } from "react";

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

export default function VideoPlayer({ src, poster, title, description, className = "" }: {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (!videoRef.current) return;
    if (!playing) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleEnded = () => setPlaying(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-zinc-200 shadow-md bg-black cursor-pointer select-none ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onEnded={handleEnded}
        className="w-full h-full object-cover block"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
        style={{
          background: playing
            ? hovered
              ? "rgba(0,0,0,0.25)"
              : "rgba(0,0,0,0)"
            : "rgba(0,0,0,0.1)",
        }}
      >
        {/* Play/Pause Button */}
        <div
          className="flex items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg transition-all duration-200"
          style={{
            width: 64,
            height: 64,
            opacity: playing ? (hovered ? 1 : 0) : 1,
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        >
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <PlayIcon />
          )}
        </div>

        {/* Title / description shown when paused */}
        {!playing && (title || description) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            {title && <p className="text-white font-semibold text-base leading-tight">{title}</p>}
            {description && <p className="text-zinc-300 text-sm mt-0.5">{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
