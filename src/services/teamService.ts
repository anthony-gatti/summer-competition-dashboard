import axios from 'axios';
import { Client } from '@notionhq/client';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
const notion = new Client({ auth: 'secret_fbrN9wJ2EnLQkLv7K9u74Sn2jYlyRsmT7EoZfhpSpem' });

const API_URL = 'http://localhost:5001/team';

function isFullPageObjectResponse(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return 'properties' in page;
}

export const getTeamPoints = async (number: number) => {
  try {
    console.log("Found the call!");
    const response = await fetch(`${API_URL}/points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number })
    });

    const data = await response.json();
    console.log(`Total points for team ${number}:`, data.totalPoints);
    console.log('Reprint of total points: ', data.totalPoints);


    const points = {total_points: number}
    points.total_points = parseInt(data.totalPoints);

    return points;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};