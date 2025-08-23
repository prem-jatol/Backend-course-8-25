import React, { useState } from "react";
import axios from "axios";

export default function UploadMultipleImages() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [images, setImages] = useState([]);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle file change
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);

    // append multiple files
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/admin/upload-multiple",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload success:", res.data);
      alert("Images uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Multiple Images
        </h2>

        {/* Name field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Images field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Images
          </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-black py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
