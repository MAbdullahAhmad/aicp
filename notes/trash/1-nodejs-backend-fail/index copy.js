// backend/index.js
const express = require("express");
const cors = require('cors');
const multer = require("multer");
const neo4j = require("neo4j-driver");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
}));

const server = http.createServer(app);
const io = socketIo(server);

// Configure Multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Neo4j Setup
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "NewPassword@1234")
);
const session = driver.session();

// Handle File Upload
app.post("/api/upload", upload.single("resume"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Save record to Neo4j
  try {
    await session.run(
      "CREATE (r:Resume {filename: $filename, path: $path, uploadedAt: $uploadedAt}) RETURN r",
      {
        filename: file.filename,
        path: file.path,
        uploadedAt: new Date().toISOString(),
      }
    );

    // Emit socket event
    io.emit("statusUpdate", { message: "New resume uploaded." });

    res.status(200).json({ message: "File uploaded successfully." });
  } catch (error) {
    console.error("Neo4j Error:", error);
    res.status(500).send("Error saving to database.");
  }
});

// Start Server
const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
