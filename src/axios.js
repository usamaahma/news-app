import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const fetchNews = async (query = '') => {
  const url = `${BASE_URL}/top-headlines?q=${query}&apiKey=${API_KEY}`;
  console.log("Fetching from URL:", url); 
  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error); 
    throw error;
  }
};

export default fetchNews;
