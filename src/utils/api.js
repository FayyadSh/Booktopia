// Base URL for the Big Book API
const BASE_URL = 'https://api.bigbookapi.com/'

// Array of API keys loaded from environment variables
// Using multiple keys to distribute requests since each key has a rate limit
// of 50 requests per day per user
const apiKeys = [
  process.env.REACT_APP_FIRST_API_KEY,
  process.env.REACT_APP_SECOND_API_KEY,
  process.env.REACT_APP_THIRD_API_KEY,
  process.env.REACT_APP_FOURTH_API_KEY,
  process.env.REACT_APP_FIFTH_API_KEY,
  process.env.REACT_APP_SIXTH_API_KEY,
  process.env.REACT_APP_SEVENTH_API_KEY,
  process.env.REACT_APP_EIGHTH_API_KEY,
  process.env.REACT_APP_NINTH_API_KEY,
  process.env.REACT_APP_TENTH_API_KEY,
]

/**
 * Fetches data from the Big Book API using a randomly selected API key
 * Note: Each API key has a rate limit of 50 requests per day per user
 * 
 * @param {string} url - The endpoint URL to append to BASE_URL
 * @returns {Promise<Object>} - The parsed JSON response from the API
 * @throws Will log errors to console if the request fails
 */
const fetchData = async (url) => {
  // Helper function to generate a random integer between 0 and 9
  // This helps distribute requests across all available API keys
  function getRandomInt() {
    return Math.floor(Math.random() * 10);
  }
  
  // Get a random index to select an API key
  // Random selection helps distribute the 50-request daily limit
  // across multiple keys to increase total available requests
  const randIndex = getRandomInt()
  
  // Request headers including the randomly selected API key
  const headers = {
    'x-api-key': apiKeys[randIndex]
  }

  try {
    // Make the API request
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers,
    })
    
    // Parse the JSON response
    const data = await response.json()
    return data
    
  } catch (error) {
    // Log any errors that occur during the request
    console.log('API request failed:', error);
    // Note: The function will return undefined if there's an error
  }
}

export default fetchData