const BASE_URL = 'https://api.bigbookapi.com/'

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

const fetchData = async (url) => {
  function getRandomInt() {
    return Math.floor(Math.random() * 10);
  }
  const randIndex = getRandomInt()
  console.log(randIndex);
  const headers = {
    'x-api-key': apiKeys[randIndex]
  }
  console.log(randIndex);

  try{
    const response  = await fetch(`${BASE_URL}${url}`,{
      method: 'GET',
      headers,
    })
    const data = await response.json()
    return data
    
  } catch (error) {
    console.log(error);
  }
}

export default fetchData