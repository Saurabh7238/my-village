"use client";

import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageForUpload, setSelectedImageForUpload] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageTags, setImageTags] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        const imageArray = Array.isArray(data) ? data : data.images;
        setImages(imageArray || []);
      });
  }, []);

  const addNotification = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const newItem = await res.json();
    setNotifications((prev) => [...prev, newItem]);
    setTitle("");
    setDescription("");
  };

  const deleteNotification = async (id) => {
    await fetch("/api/notifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");
    setUploadProgress(0);

    const formData = new FormData();

    if (selectedFile) {
      if (!(selectedFile instanceof File)) {
        setUploadError("Please select a valid image file.");
        return;
      }
      formData.append("file", selectedFile);
    } else if (selectedImageForUpload) {
      setUploading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploading(false);
      alert(`Image from gallery selected: ${selectedImageForUpload.title}`);
      setSelectedImageForUpload(null);
      setImageTitle("");
      setImageTags("");
      return;
    } else {
      setUploadError("Please select a file or choose from the gallery.");
      return;
    }

    formData.append("title", imageTitle);
    formData.append("tags", imageTags);

    setUploading(true);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        setImages((prev) => [
          ...prev,
          {
            filename: result.filename,
            title: imageTitle,
            tags: imageTags.split(",").map((t) => t.trim()),
          },
        ]);
        setSelectedFile(null);
        setFileName("No file chosen");
        setImageTitle("");
        setImageTags("");
        setUploadProgress(0);
      } else {
        const error = JSON.parse(xhr.responseText);
        setUploadError(error.error || "Upload failed.");
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setUploadError("Something went wrong during upload.");
    };

    xhr.send(formData);
  };

  const handleDeleteImage = async (filename) => {
    await fetch(`/api/delete?file=${filename}`, { method: "DELETE" });
    setImages((prev) => prev.filter((img) => img.filename !== filename));
  };

  const handleGallerySelect = (img) => {
    setSelectedImageForUpload(img);
    setSelectedFile(null);
    setFileName(`Gallery: ${img.title || img.filename}`);
    setImageTitle(img.title || "");
    setImageTags(img.tags?.join(", ") || "");
    setShowGalleryPicker(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* 🔔 Notifications Section */}
        <section>
          <h1 className="text-3xl font-bold mb-6 text-green-700 dark:text-yellow-400">Admin Notifications</h1>
          <form onSubmit={addNotification} className="mb-8 space-y-4">
            <input
              className="border p-2 w-full rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border p-2 w-full rounded"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Notification
            </button>
          </form>
          <ul className="space-y-4">
            {notifications.map((n) => (
              <li key={n.id} className="border rounded p-4 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{n.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{n.description}</p>
                </div>
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* 🖼️ Gallery Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Manage Gallery Images</h2>
          <form onSubmit={handleUpload} className="mb-6 space-y-4">
            <div className="flex items-center space-x-4">
              {/* Custom file upload button */}
              <label
                htmlFor="file-upload"
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out"
              >
                {fileName}
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden" // Hide the original input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  setSelectedImageForUpload(null);
                  setFileName(file ? file.name : "No file chosen");
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Image title"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={imageTags}
              onChange={(e) => setImageTags(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex gap-4 flex-wrap">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload / Use Image"}
              </button>
            </div>
            {uploading && (
              <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
          </form>

          {Array.isArray(images) && images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={`/gallery/${img.filename}`}
                    alt={img.title || `Image ${idx}`}
                    className="w-full h-48 object-cover rounded shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 text-center truncate">
                    {img.title || "Untitled"}
                    {img.tags?.length > 0 && (
                      <div className="mt-1 text-[10px] text-gray-300">
                        {img.tags.join(", ")}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteImage(img.filename)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleGallerySelect(img)}
                    className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No images found.</p>
          )}
        </section>
      </div>
    </div>
  );
}