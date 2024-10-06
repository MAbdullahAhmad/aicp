// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploadPage from "./pages/FileUploadPage";
import StatusPage from "./pages/StatusPage";
import './styles/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUploadPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;
