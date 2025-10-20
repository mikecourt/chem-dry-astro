import AOS from "aos";
import React, { useEffect, useState } from "react";

interface VideoPlayerProps {
  video: {
    thumbnail: string;
    url: string;
  };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      AOS.init({ duration: 600, once: true });
    }
  }, [isMounted]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openVideo = () => {
    setIsOpen(true);
  };

  const closeVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className="md:w-[40%] relative"
        data-aos={isMounted ? "zoom-in-sm" : undefined}>
        <img
          src={video.thumbnail}
          alt="video thumbnail"
          width={300}
          height={500}
          className="max-md:aspect-video max-md:w-full md:size-full object-cover"
          loading="lazy"
        />

        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer w-3/12 text-secondary"
          xmlns="http://www.w3.org/2000/svg"
          width="124"
          height="124"
          fill="none"
          viewBox="0 0 124 124"
          onClick={openVideo}
          data-aos={isMounted ? "zoom-in-sm" : undefined}
          data-aos-delay={isMounted ? "100" : undefined}>
          <circle cx="62" cy="62" r="62" fill="currentcolor" />
          <path
            className="text-black"
            fill="currentcolor"
            d="M71.692 61.948 57.32 52.153c-.536-.364-1.321-.036-1.321.551v19.592c0 .587.785.915 1.32.551l14.372-9.795c.41-.28.41-.823 0-1.104"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out opacity-100"
          onClick={closeVideo}>
          <div
            className="relative w-[80%] aspect-video! max-w-3xl transition-all duration-500 ease-in-out transform scale-100 opacity-100"
            data-aos="fade-in-sm">
            <iframe
              width="100%"
              height="500"
              src={video.url}
              title="YouTube Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-lg shadow-lg"></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
