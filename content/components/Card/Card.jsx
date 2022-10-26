import React from 'react';
import "./Card.css";

const Card = ({ title, content }) => {
  return <div className="card">
    <h3 className='card__title'>{title}</h3>
    <p className='card__content'>{content}</p>
  </div>
}

export default Card