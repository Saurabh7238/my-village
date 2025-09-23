"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        const imageArray = Array.isArray(data) ? data : data.images;
        setImages(imageArray || []);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white pt-10 pb-20">
      <h1 className="text-center text-2xl font-bold mb-6 text-green-700 dark:text-yellow-400">
        📸 Gram Panchayat Gallery
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden rounded-lg shadow-md cursor-zoom-in relative"
            onClick={() => window.open(`/gallery/${img.filename}`, "_blank")}
          >
            <Image
              src={`/gallery/${img.filename}`}
              alt={img.title || `Gallery ${index + 1}`}
              width={400}
              height={300}
              className="object-cover w-full h-60 transition-transform duration-300 ease-in-out"
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 text-center truncate">
              {img.title || "Untitled"}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}