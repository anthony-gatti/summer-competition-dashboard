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

app.post("/task/:id", async (req, res) => { // MAYBE TRASH
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
        case "146ad3be-b221-422d-8dde-d0e4c2fd6314":
          person.team_number = 1;
          break;
        case "bb16b126-976e-45bf-bcbd-067342ff0e05":
          person.team_number = 2;
          break;
        case "7599ad5f-9949-4fad-ba30-2a6dbfaaacf4":
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

// app.post("/task/person/:id", async (req, res) => { // GETS COMPLETIONS from A PERSON ID
//   const name = req.body.person.name;

//   try {
//     const response = await axios.post(
//       `https://api.notion.com/v1/databases/${process.env.PERSON_DB}/query`,
//       {
//         filter: {
//           property: "person_name",
//           title: {
//             equals: name,
//           },
//         },
//       },
//       {
//         headers: {
//           Authorization: `${process.env.NOTION_KEY}`,
//           "Content-Type": "application/json",
//           "Notion-Version": "2022-06-28",
//         },
//       }
//     );

//     //console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

//     const task_array = [];

//     response.data.results.forEach((page) => {
//         console.log(page.properties.completions);
//       page.properties.completions.relation.forEach((id) => {
//         task_array.push(id);
//       });
//     });
    
//     res.json(task_array);
//   } catch (error) {
//     console.error(
//       "Error occurred while fetching data from Notion API:",
//       error.message
//     );
//   }
// });

app.post("/task/person/:id", async (req, res) => { 
  const person_id = req.body.person.person_id;
  console.log("PERSON ID: ", person_id);

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.COMPLETION_DB}/query`, //FILTERING IS CURRENTLY NOT WORKING
      {
        filter: {
          property: "person_relation",
          relation: {
            contains: person_id,
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
    console.log("RESPONSE: ", response);

    //console.log(`Received response from Notion API: ${JSON.stringify(response.data)}\n`);

    const task_array = [];

    response.data.results.forEach((page) => {
        console.log(page.properties);
      page.properties.completions.relation.forEach((id) => {
        task_array.push(id);
      });
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
