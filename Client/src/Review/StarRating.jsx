import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ onStarClick }) => {
  const [rating, setRating] = useState(null);

  const handleClick = (starIndex) => {
    const newRating = starIndex + 1;
    setRating(newRating);
    // Call the parent component's function to handle the rating
    onStarClick(newRating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          onClick={() => handleClick(index)}
          color={rating && index < rating ? '#ffc107' : '#e4e5e9'}
          size={24}
          style={{ marginRight: 10, cursor: 'pointer' }}
        />
      ))}
      {rating && <p>You rated {rating} out of 5</p>}
    </div>
  );
};

export default StarRating;
