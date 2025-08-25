import React, { useState } from "react";
import axios from "axios";
import ImageUploadForm from "./ImageUploadForm";
import AdminList from "./AdminList";
import UploadMultipleImages from "./UploadMultipleImages";

export default function App() {
    const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ImageUploadForm selectedId={selectedId} />
      <AdminList setSelectedId={setSelectedId} />
      {/* <UploadMultipleImages /> */}
    </div>
  );
}
