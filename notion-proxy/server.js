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

app.post('/team/points', async (req, res) => {
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

    // console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    let totalPoints = 0;

    response.data.results.forEach(page => {
      const points = page.properties.total_points.number;
      totalPoints += points;
    });


    res.json({ totalPoints });
  } catch (error) {
    console.error('Error occurred while fetching data from Notion API:', error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});