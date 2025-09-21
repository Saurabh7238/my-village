"use client";

export default function GalleryPage() {
  return (
    <div className="pt-36 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Gallery</h1>
      <p className="text-gray-700 mb-6">Photos of Gram Panchayat activities.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img src="/panchayat1.jpg" className="rounded-lg shadow" alt="" />
        <img src="/panchayat2.jpg" className="rounded-lg shadow" alt="" />
        <img src="/panchayat3.jpg" className="rounded-lg shadow" alt="" />
      </div>
    </div>
  );
}
