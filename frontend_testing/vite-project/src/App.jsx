import React, { useState } from "react";
import axios from "axios";
import ImageUploadForm from "./ImageUploadForm";
import AdminList from "./AdminList";

export default function App() {
    const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <ImageUploadForm selectedId={selectedId} />
      <AdminList setSelectedId={setSelectedId} />
    </>
  );
}
