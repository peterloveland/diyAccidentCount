// const fetch = require('node-fetch')
import fetch from "node-fetch";

const API_ENDPOINT = 'https://api.netlify.com/api/v1/sites?';

const handler = async (event, context) => {
  try {
    const response = await fetch(API_ENDPOINT);
    console.log("SUCCESS")
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log("ERROR: " + error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' })
    };
  }
};

module.exports = { handler }