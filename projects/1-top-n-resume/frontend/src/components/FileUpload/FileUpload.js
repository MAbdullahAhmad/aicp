// FileUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaTimes } from "react-icons/fa";

const api = axios.create({
  baseURL: 'http://localhost:5005',
});

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const response = await api.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      setUploading(false);
      setUploaded(true);
      console.log("File uploaded successfully:", response.data);
      
      // Redirect to status page
      navigate("/status");
    } catch (error) {
      setUploading(false);
      alert("Upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setUploaded(false);
    setProgress(0);
  };

  return (
    <div className="file-upload-container">
      {!uploaded && !uploading && (
        <button
          className="upload-button"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FaUpload className="upload-icon" />
          File Upload
        </button>
      )}

      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {uploading && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {uploaded && (
        <div className="success-message">
          <span className="success-text">File uploaded successfully!</span>
          <button className="cancel-button" onClick={handleCancel}>
            <FaTimes />
          </button>
        </div>
      )}

      {file && !uploaded && !uploading && (
        <button className="upload-button" onClick={handleUpload}>
          <FaUpload className="upload-icon" />
          Upload
        </button>
      )}

      <button
        className="submit-button"
        disabled={!uploaded}
        onClick={() => {
          // Handle form submission
          console.log("Submitting the form...");
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default FileUpload;
