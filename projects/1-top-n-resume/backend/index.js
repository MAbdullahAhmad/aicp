const express = require('express');
const app = express();
const port = 3000;

// Import router
const router = require('routes');

// Set up routes
app.use('/', router);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});