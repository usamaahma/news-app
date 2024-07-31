import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const fetchNews = async (query = '') => {
  const url = `${BASE_URL}/top-headlines?country=us&q=${query}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data.articles;
    } else {
      console.error(`Error: ${response.statusText}`);
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default fetchNews;
