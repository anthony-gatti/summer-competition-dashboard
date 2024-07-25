const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5001;

// Use cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.post("/team/points", async (req, res) => {
  const teamNumber = req.body.number;

  try {
    console.log(`Received request for team number: ${teamNumber}`);

    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.TEAM_DB}/query`,
      {
        filter: {
          property: "Team",
          number: {
            equals: teamNumber,
          },
        },
      },
      {
        headers: {
          Authorization: `${process.env.NOTION_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );

    // console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    let totalPoints = 0;

    response.data.results.forEach((page) => {
      const points = page.properties.total_points.number;
      totalPoints += points;
    });

    res.json({ totalPoints });
  } catch (error) {
    console.error(
      "Error occurred while fetching data from Notion API:",
      error.message
    );
  }
});

app.post("/task", async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.TASK_DB}/query`,
      {},
      {
        headers: {
          Authorization: `${process.env.NOTION_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );

    //console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    const task_array = [];

    response.data.results.forEach((page) => {
      let task = {
        task_id: page.properties.task_id.formula.string,
        task_name: page.properties.task_name.title
          .map((item) => item.plain_text)
          .join(""),
        description: page.properties.description.rich_text
          .map((item) => item.plain_text)
          .join(""),
        points: page.properties.points.number,
        restrictions: page.properties.restrictions.rich_text
          .map((item) => item.plain_text)
          .join(""),
        team: false,
        repititions: page.properties.repititions.number,
      };

      if (page.properties.Team.number === 1) {
        task.team = true;
      }

      task_array.push(task);
    });

    res.json(task_array);
  } catch (error) {
    console.error(
      "Error occurred while fetching data from Notion API:",
      error.message
    );
  }
});

app.post("/task/:name", async (req, res) => {
  const name = req.body.name;

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.TASK_DB}/query`,
      {
        filter: {
          property: "task_name",
          title: {
            equals: name,
          },
        },
      },
      {
        headers: {
          Authorization: `${process.env.NOTION_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );

    //console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    const task_array = [];

    response.data.results.forEach((page) => {
      let task = {
        task_id: page.properties.task_id.formula.string,
        task_name: page.properties.task_name.title
          .map((item) => item.plain_text)
          .join(""),
        description: page.properties.description.rich_text
          .map((item) => item.plain_text)
          .join(""),
        points: page.properties.points.number,
        restrictions: page.properties.restrictions.rich_text
          .map((item) => item.plain_text)
          .join(""),
        team: false,
        repititions: page.properties.repititions.number,
      };

      if (page.properties.Team.number === 1) {
        task.team = true;
      }

      task_array.push(task);
    });
    
    res.json(task_array);
  } catch (error) {
    console.error(
      "Error occurred while fetching data from Notion API:",
      error.message
    );
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
