import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UploadForm({ selectedId }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
    oldImage: "",
  });

  // Fetch user by ID if editing
  useEffect(() => {
    if (selectedId) {
      axios
        .get("http://localhost:5000/admin/" + selectedId)
        .then((res) => {
          const u = res.data.user;
          setUser(u);

          // Pre-fill values
          setFormData({
            name: u.name || "",
            email: u.email || "",
            image: null,
            oldImage: u.image || "",
          });
        })
        .catch((err) => console.error(err));
    } else {
      // reset form when adding new
      setFormData({
        name: "",
        email: "",
        image: null,
        oldImage: "",
      });
    }
  }, [selectedId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);

    if (formData.image) {
      data.append("image", formData.image); // field should match backend: req.files.image
    }
    if (selectedId) {
      data.append("_id", selectedId); // needed for update
      data.append("oldImage", formData.oldImage); // send old image
    }

    try {
      let res;
      if (selectedId) {
        // UPDATE
        res = await axios.put("http://localhost:5000/admin/update", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // CREATE
        res = await axios.post("http://localhost:5000/admin/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert(res.data.msg || "Success!");
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {selectedId ? "Update Admin" : "Create Admin"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Current Image Preview (only when updating) */}
        {selectedId && formData.oldImage && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Image:</p>
            <img
              src={`http://localhost:5000/image/${formData.oldImage}`}
              alt="Current"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {selectedId ? "Upload New Image" : "Upload Image"}
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          {selectedId ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
