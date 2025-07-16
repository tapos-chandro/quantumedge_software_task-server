const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded())

app.get('/api/jobs', async (req, res) => {
  try {
    const response = await fetch('https://api.mnimedu.com/api/browse/pro-jobs/');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});



app.post('/api/signup', async (req, res) => {
  try {
    const fromData = req.body;
    console.log("Received signup data:", fromData);

    const response = await fetch('https://api.mnimedu.com/api/auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData),
    });

    const data = await response.json();
    res.send(data);

  } catch (err) {
    console.error("❌ Server Fetch error:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/login', async (req, res) => {
  try {
    const fromData = req.body;
    console.log("Received login data:", fromData);

    const response = await fetch('http://api.mnimedu.com/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData),
    });


    const data = await response.json();
    res.send(data);

    console.log("Login response:", data);
  } catch (err) {
    console.error("❌ Server Fetch error:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy Server is running at http://localhost:${PORT}`);
});
