import React, { useState } from "react";
import axios from "axios";

const ImageUploader = ({ onPrediction }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onPrediction({ ...response.data, image: imagePreview });
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="border p-2 rounded-md w-full"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Upload & Predict"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {imagePreview && (
        <img src={imagePreview} alt="Uploaded" className="w-full max-w-xs rounded-lg shadow-lg" />
      )}
    </div>
  );
};

export default ImageUploader;
