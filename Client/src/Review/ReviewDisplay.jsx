import React from 'react';
import StarDisplay from './StarDisplay';

function ReviewDisplay(props) {
    return (
        <div>
            <h2>Reviews</h2>
            {props.reviewsToDisplay.map((review) => (
                <div className='review-container' key={review.id}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src="/profileimage.jpeg" alt="Profile" style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius:'70%' }} />
                        <div>
                            <div><StarDisplay rating={review.rating} /></div>
                            <div><strong>Review posted on:</strong> {new Date(review.review_datetime).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <p><strong>Review:</strong> {review.review}</p>
                    {review.reply && (
                      <div><strong>Response:</strong> {review.reply}</div>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default ReviewDisplay;
