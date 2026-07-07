const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Progree DevOps Task 2!', env: process.env.NODE_ENV });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Only start the server if this file is run directly (not when imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;