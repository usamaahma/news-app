import React, { useState, useEffect } from 'react';
import './news.css';
import NewsCard from './newscards';
import fetchNews from '../axios';
import { Atom } from 'react-loading-indicators';

const NewsList = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const getNews = async (query = '') => {
        setLoading(true);
        setError(null);

        const cachedData = localStorage.getItem(`news-${query}`);
        if (cachedData) {
            setArticles(JSON.parse(cachedData));
            setLoading(false);
            return;
        }

        try {
            const articles = await fetchNews(query || 'general');
            localStorage.setItem(`news-${query}`, JSON.stringify(articles));
            setArticles(articles);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        getNews(searchQuery);
    };

    if (loading) return <Atom color="#32cd32" size="medium" text="" textColor="" />;
    if (error) return <p>Error fetching news: {error}</p>;

    const recommendedNews = articles.slice(0, 1);
    const hotNews = articles.slice(1, 4);
    const latestNews = articles.slice(4);

    return (
        <div className="news-container">
            <div className='logo-center'>
                <a href="/">
                    <img className='logo-image' alt='Logo' src='logo.png' />
                </a>
                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="news-content">
                <div className="left-column">
                    <h2>Recommended News</h2>
                    {recommendedNews.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                    <h2>Hot News</h2>
                    {hotNews.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
                <div className="right-column">
                    <h2>Latest News</h2>
                    {latestNews.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsList;
