const API_URL = 'http://localhost:5001/team';

export const getTeamPoints = async (number: number) => {
  try {
    const response = await fetch(`${API_URL}/points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number })
    });

    const data = await response.json();
    console.log(`Total points for team ${number}:`, data.totalPoints);


    const points = {total_points: number}
    points.total_points = parseInt(data.totalPoints);

    return points;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};