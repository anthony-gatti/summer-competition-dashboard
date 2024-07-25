import { Router, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { Client } from '@notionhq/client';
import { Controller } from '../decorators/controller';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Type guard to check if a property is of type 'number'
function isNumberProperty(
  property: any
): property is { type: 'number'; number: number } {
  return property.type === 'number';
}

// Type guard to ensure we are working with full page objects
function isFullPageObjectResponse(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return 'properties' in page;
}

@Controller('/team')
class TeamController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.post('/getTotalPointsForTeam', this.getTotalPointsForTeam);
  }

  async getTotalPointsForTeam(req: Request, res: Response) {
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
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        }
      });

      console.log(`Received response from Notion API: ${JSON.stringify(response.data, null, 2)}`);
  
      let totalPoints = 0;
  
      // Calculate total points for the specified team
      response.data.results.forEach((page: PageObjectResponse | PartialPageObjectResponse) => {
        if (isFullPageObjectResponse(page)) {
          const teamProperty = page.properties.Team;
          const pointsProperty = page.properties.Points;
          
          if (isNumberProperty(teamProperty) && teamProperty.number === teamNumber && isNumberProperty(pointsProperty)) {
            totalPoints += pointsProperty.number;
          }
        }
      });
  
      console.log(`Total points for team ${teamNumber}: ${totalPoints}`);
  
      res.json({ totalPoints });
    } catch (error) {
      console.error('Error occurred while fetching data from Notion API:', (error as AxiosError).message);
      if ((error as AxiosError).response) {
        console.error('Response data:', JSON.stringify((error as AxiosError).response?.data, null, 2));
        console.error('Response status:', (error as AxiosError).response?.status);
        console.error('Response headers:', JSON.stringify((error as AxiosError).response?.headers, null, 2));
        res.status((error as AxiosError).response?.status || 500).json({ error: (error as AxiosError).response?.data });
      } else if ((error as AxiosError).request) {
        console.error('Request made but no response received:', (error as AxiosError).request);
        res.status(500).json({ error: 'No response from Notion API' });
      } else {
        console.error('Error in setting up request:', (error as AxiosError).message);
        res.status(500).json({ error: 'Error in setting up request' });
      }
    }
  }
}

export default TeamController;