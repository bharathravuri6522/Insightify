import React from 'react';
import StarDisplay from './StarDisplay.jsx';
import {Rate} from 'antd'


function Bar({ percentage }) {
    return (
        <div className="barContainer">
            <div className="barFill" style={{ width: `${percentage}%` }} />
        </div>
    );
}

function RatingsDisplay(props) {
    const reviews = props.reviews;
    // Calculate the total number of reviews
    const totalReviews = reviews.length;

    // Calculate the average rating
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    console.log("This is the average reading", averageRating);


    // Calculate the percentage of each star review
    const starPercentages = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
        starPercentages[review.rating - 1]++;
    });
    for (let i = 0; i < 5; i++) {
        starPercentages[i] = (starPercentages[i] / totalReviews) * 100;
    }

    return (
        <div>
           {/* <p><StarDisplay rating={averageRating} /> ({averageRating.toFixed(1)})</p> */}
           {/* <Rate value={averageRating} disabled /> */}
           {/* <p>({averageRating.toFixed(1)})</p> */}
           <p>Overall Reviews :  {totalReviews}</p>
            {[5, 4, 3, 2, 1].map(star => (
            <div className="BarDisplay" key={star} style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ marginRight: '10px' }}>{star} Star:</p>
                 <Bar percentage={starPercentages[star - 1]} />
                <p style={{ marginLeft: '10px' }}>{starPercentages[star - 1].toFixed(1)}%</p>
           </div>
          ))}
        </div>

    );
}

export default RatingsDisplay;
