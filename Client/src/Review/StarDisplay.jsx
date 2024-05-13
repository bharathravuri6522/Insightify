import React from 'react';
import { FaStar } from 'react-icons/fa';

function StarDisplay(props) {
    const rating = props.rating;
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<FaStar key={i} color='#ffc107'/>); // Filled star
        } else {
            stars.push(<FaStar key={i} color='#e4e5e9'/>); // Empty star
        }
    }
    return <div>{stars}</div>;
}

export default StarDisplay;