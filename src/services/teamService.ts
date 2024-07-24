import axios from 'axios';
import { Client } from '@notionhq/client';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
const notion = new Client({ auth: 'secret_fbrN9wJ2EnLQkLv7K9u74Sn2jYlyRsmT7EoZfhpSpem' });

const API_URL = 'http://localhost:1337/team';

function isFullPageObjectResponse(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return 'properties' in page;
}

export const getTeamPoints = async (number: number) => {
  try {
    console.log("CALL MADE HERE");
    const response = await notion.databases.query({
      database_id: 'c84b190cdbaf4e2a8683a9229e51696a?v=6ed5745825a641ed9b09007d8756ab2e',
      filter: {
        property: 'Name',
        title: {
          equals: 'Team ' + number,
        },
      },
    });
    console.log("RESPONSE: ", response);

    
    const points = {total_points: number}
    points.total_points = 0;

    return points;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};