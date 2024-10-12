const express = require('express');
const router = express.Router();

// Import controllers
const ResumeController = require('controllers/ResumeController');

// Routing Table
const routes = [
    {method: 'get', path: '', handler: ResumeController.hello}
];

// Register Routes
routes.forEach(
    ({ method, path, handler}) => router[method](path, handler)
);

// Export Router
module.exports = router;