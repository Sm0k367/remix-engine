// ===== App.jsx =====
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [mode, setMode] = useState('text'); // text | image | music | video
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('cyberpunk');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRemix = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/remix/${mode}`, {
        input,
        style,
        imageUrl: input,
        videoUrl: input,
        inputPrompt: input,
        genre: style,
        effect: style
      });
      setOutput(res.data.output);
    } catch (err) {
      console.error('Remix failed:', err);
      setOutput('❌ Remix failed.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎨 AI Remix Engine</h1>
      <p>Transform your content into a new style using AI.</p>

      <label>
        <strong>Type:</strong>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="music">Music</option>
          <option value="video">Video</option>
        </select>
      </label>

      <br /><br />

      <label>
        <strong>{mode === 'text' ? 'Enter text:' : 'Enter URL:'}</strong>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'text' ? 'Enter text to remix...' : 'Paste image/video/music URL...'}
          style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
        />
      </label>

      <br /><br />

      <label>
        <strong>Style:</strong>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="cyberpunk">Cyberpunk</option>
          <option value="anime">Anime</option>
          <option value="lofi">Lo-Fi</option>
          <option value="trap">Trap</option>
          <option value="vhs">VHS</option>
          <option value="glitchcore">Glitchcore</option>
          <option value="cinematic">Cinematic</option>
          <option value="haiku">Haiku</option>
          <option value="rap">Rap</option>
        </select>
      </label>

      <br /><br />

      <button onClick={handleRemix} disabled={loading}>
        {loading ? 'Remixing...' : 'Remix It'}
      </button>

      <br /><br />

      <div>
        <h3>🧠 Output:</h3>
        {mode === 'text' ? (
          <pre style={{ whiteSpace: 'pre-wrap' }}>{output}</pre>
        ) : (
          <a href={output} target="_blank" rel="noreferrer">{output}</a>
        )}
      </div>
    </div>
  );
};

export default App;
