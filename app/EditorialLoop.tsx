"use client";

import { useEffect, useRef } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type EditorialLoopProps = {
  poster: string;
  source: string;
};

export default function EditorialLoop({ poster, source }: EditorialLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.dataset.loaded !== "true") {
            video.dataset.loaded = "true";
            video.src = source;
            video.load();
          }
          void video.play().catch(() => {});
          return;
        }

        video.pause();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [source]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="none"
      poster={poster}
    />
  );
}
