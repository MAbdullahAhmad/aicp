// src/pages/StatusPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

let socket;

function StatusPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize socket connection
    socket = io("http://localhost:5000");

    // Listen for messages
    socket.on("statusUpdate", (message) => {
      console.log("Status Update:", message);
      // Handle status updates here
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Resume Upload Status</h1>
      <p>Processing your resume...</p>
      {/* Add more status details here */}
    </div>
  );
}

export default StatusPage;
