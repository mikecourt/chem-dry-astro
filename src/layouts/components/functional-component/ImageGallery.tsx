import { markdownify } from "@/lib/utils/textConverter";
import React, { useEffect, useState } from "react";

const ImageGallery = ({
  images,
}: {
  images: {
    image: string;
    description?: string;
  }[];
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setTimeout(() => setSelectedImage(null), 300);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openImage = (img: string) => {
    setSelectedImage(img);
    setTimeout(() => setIsOpen(true), 10);
  };

  const closeImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setTimeout(() => setSelectedImage(null), 300);
    }
  };

  return (
    <>
      <div className="row g-4 justify-center items-center">
        {images.map((img, i: number) => (
          <div
            key={i}
            className="col-12 md:col-6 group relative overflow-hidden cursor-pointer"
            onClick={() => openImage(img.image)}>
            <img
              src={img.image}
              alt={img.description || "Image"}
              width={635}
              height={433}
            />
            <div className="absolute -bottom-36 group-hover:bottom-3 left-1/2 transform -translate-x-1/2 duration-500 ease-in-out w-[90%] flex items-center justify-between ">
              {img.description && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: markdownify(img.description),
                  }}
                  className="bg-text/50 px-3 py-2 text-base rounded-2xl text-text-light"
                />
              )}
              <div className="bg-text/50 px-3 py-2 rounded-2xl ">
                <svg
                  className="w-6 h-6 rotate-45 text-base text-text-light inline-block"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path d="M13 6.99h3L12 3 8 6.99h3v10.02H8L12 21l4-3.99h-3z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image Viewer */}
      {selectedImage && (
        <div className={`overlay ${isOpen ? "open" : ""}`} onClick={closeImage}>
          <img
            src={selectedImage}
            alt="Preview"
            className={`floating-image ${isOpen ? "open" : ""}`}
          />
        </div>
      )}
    </>
  );
};

export default ImageGallery;
