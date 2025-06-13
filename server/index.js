// ===== AI Remix Engine Server =====

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const remixRoutes = require('./routes/remixRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.send('🎨 AI Remix Engine is alive.');
});

// Remix API
app.use('/api/remix', remixRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Remix Engine running at http://localhost:${PORT}`);
});
