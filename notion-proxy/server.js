const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

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
    // console.log(`Received request for team number: ${teamNumber}`);

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
      const points = page.properties.total_points.formula.number;
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

      if (page.properties.team.number === 1) {
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

      if (page.properties.team.number === 1) {
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

app.post("/task/:id", async (req, res) => {
  // MAYBE TRASH
  const completion_id = req.body.completion_id;
  console.log("COMPLETION ID: ", completion_id);
  process.exit(99);

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.TASK_DB}/query`,
      {
        filter: {
          property: "completions",
          relation: {
            contains: completion_id,
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

    //console.log(response.data);

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

app.post("/person", async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.PERSON_DB}/query`,
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

    const person_array = [];

    response.data.results.forEach((page) => {
      let person = {
        person_id: page.properties.person_id.formula.string,
        name: page.properties.person_name.title
          .map((item) => item.plain_text)
          .join(""),
        team_number: page.properties.team_number.relation
          .map((item) => item.id)
          .join(""),
      };

      switch (person.team_number) {
        case process.env.TEAM1_ID:
          person.team_number = 1;
          break;
        case process.env.TEAM2_ID:
          person.team_number = 2;
          break;
        case process.env.TEAM3_ID:
          person.team_number = 3;
          break;
        default:
          person.team_number = 0;
      }
      person_array.push(person);
    });

    res.json(person_array);
  } catch (error) {
    console.error(
      "Error occurred while fetching data from Notion API:",
      error.message
    );
  }
});

app.post("/person/:name", async (req, res) => {
  const name = req.body.name;

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.PERSON_DB}/query`,
      {
        filter: {
          property: "person_name",
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

    const person_array = [];

    response.data.results.forEach((page) => {
      let person = {
        person_id: page.properties.person_id.formula.string,
        name: page.properties.person_name.title
          .map((item) => item.plain_text)
          .join(""),
        team_number: page.properties.team_number.relation
          .map((item) => item.id)
          .join(""),
      };
      switch (person.team_number) {
        case process.env.TEAM1_ID:
          person.team_number = 1;
          break;
        case process.env.TEAM2_ID:
          person.team_number = 2;
          break;
        case process.env.TEAM3_ID:
          person.team_number = 3;
          break;
        default:
          person.team_number = 0;
      }
      person_array.push(person);
    });

    res.json(person_array);
  } catch (error) {
    console.error(
      "Error occurred while fetching data from Notion API:",
      error.message
    );
  }
});

app.post("/task/person/:id", async (req, res) => {
  const person_id = req.body.person.person_id;

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.COMPLETION_DB}/query`, //FILTERING IS CURRENTLY NOT WORKING
      {},
      {
        headers: {
          Authorization: `${process.env.NOTION_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );
    //console.log("RESPONSE: ", response.data);

    //console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    const completion_array = [];

    response.data.results.forEach((page) => {
      let person_completion = false;
      page.properties.person.relation.forEach((uuid) => {
        const id = uuid.id.replace(/-/g, "");
        if (person_id === id) {
          person_completion = true;
        }
      });
      if (person_completion) {
        page.properties.task.relation.forEach((task_id) => {
          completion_array.push(task_id.id.replace(/-/g, ""));
        });
      }
    });

    res.json(completion_array);
  } catch (error) {
    console.error(
      "Error occurred while fetching data from Notion API:",
      error.message
    );
  }
});

app.post("/person/:name/points", async (req, res) => {
  const name = req.body.person.name;

  try {
    // console.log(`Received request for person: ${name}`);

    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.PERSON_DB}/query`,
      {
        filter: {
          property: "person_name",
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

    // console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    let total_points = 0;

    response.data.results.forEach((page) => {
      const points = page.properties.points.formula.number;
      total_points += points;
    });

    res.json({ total_points });
  } catch (error) {
    console.error(
      "Error occurred while fetching data from Notion API:",
      error.message
    );
  }
});

app.post("/completion", async (req, res) => {
  const task_name = req.body.task.task_name;
  const person = req.body.person.person_id;
  const task = req.body.task.task_id;
  const notes = req.body.comment;
  const link = req.body.link;

  try {
    console.log(`Received post request for completion`);

    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: process.env.COMPLETION_DB,
      },
      properties: {
        task_name: {
          title: [
            {
              type: "text",
              text: {
                content: task_name,
              },
            },
          ],
        },
        person: {
          relation: [
            {
              id: person,
            },
          ],
        },
        task: {
          relation: [
            {
              id: task,
            },
          ],
        },
        notes: {
          rich_text: [
            {
              type: "text",
              text: {
                content: notes,
              },
            },
          ],
        },
        link: {
          rich_text: [
            {
              type: "text",
              text: {
                content: link,
              },
            },
          ],
        },
      },
    });

    // console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    res.json(response);
  } catch (error) {
    console.error(
      "Error occurred while posting data to Notion API:",
      error.message
    );
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
