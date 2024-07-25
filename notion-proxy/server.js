const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5001;

// Use cors middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.post('/getTotalPointsForTeam', async (req, res) => {
  const teamNumber = req.body.number;

  try {
    console.log(`Received request for team number: ${teamNumber}`);
    
    const response = await axios.post(`https://api.notion.com/v1/databases/${process.env.TEAM_DB}/query`, {
      filter: {
        property: 'Team',
        number: {
          equals: teamNumber,
        },
      }
    }, {
      headers: {
        'Authorization': 'secret_fbrN9wJ2EnLQkLv7K9u74Sn2jYlyRsmT7EoZfhpSpem',
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      }
    });

    console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    let totalPoints = 0;

    response.data.results.forEach(page => {
      const points = page.properties.total_points.number;
      
      totalPoints += points;
    });

    console.log(`Total points for team ${teamNumber}: ${totalPoints}`);

    res.json({ totalPoints });
  } catch (error) {
    console.error('Error occurred while fetching data from Notion API:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('Request made but no response received:', error.request);
      res.status(500).json({ error: 'No response from Notion API' });
    } else {
      console.error('Error in setting up request:', error.message);
      res.status(500).json({ error: 'Error in setting up request' });
    }
  }
});

// Debug route to test CORS
app.get('/test-cors', (req, res) => {
  res.send('CORS is working');
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});