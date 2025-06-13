// ===== Remix Routes =====

const express = require('express');
const router = express.Router();
const { remixText, remixImage, remixMusic, remixVideo } = require('../services/remixService');

// POST /api/remix/text
router.post('/text', async (req, res) => {
  try {
    const { input, style } = req.body;
    const output = await remixText(input, style);
    res.json({ success: true, output });
  } catch (err) {
    console.error('Text remix error:', err);
    res.status(500).json({ error: 'Failed to remix text.' });
  }
});

// POST /api/remix/image
router.post('/image', async (req, res) => {
  try {
    const { imageUrl, style } = req.body;
    const outputUrl = await remixImage(imageUrl, style);
    res.json({ success: true, output: outputUrl });
  } catch (err) {
    console.error('Image remix error:', err);
    res.status(500).json({ error: 'Failed to remix image.' });
  }
});

// POST /api/remix/music
router.post('/music', async (req, res) => {
  try {
    const { inputPrompt, genre } = req.body;
    const trackUrl = await remixMusic(inputPrompt, genre);
    res.json({ success: true, output: trackUrl });
  } catch (err) {
    console.error('Music remix error:', err);
    res.status(500).json({ error: 'Failed to remix music.' });
  }
});

// POST /api/remix/video
router.post('/video', async (req, res) => {
  try {
    const { videoUrl, effect } = req.body;
    const resultUrl = await remixVideo(videoUrl, effect);
    res.json({ success: true, output: resultUrl });
  } catch (err) {
    console.error('Video remix error:', err);
    res.status(500).json({ error: 'Failed to remix video.' });
  }
});

module.exports = router;
