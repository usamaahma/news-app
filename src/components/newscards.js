import React from 'react';
import './newscards.css';

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
        <img alt="" src={article.urlToImage}></img>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <div className="news-footer">
        <span>{article.source.name}</span>
        <span>{article.publishedAt}</span>
      </div>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default NewsCard;
