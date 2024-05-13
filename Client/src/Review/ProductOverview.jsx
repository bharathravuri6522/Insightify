import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDisplay from './ProductDisplay';
import ReviewDisplay from './ReviewDisplay';
import StarRating from './StarRating';

function ProductOverview() {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [response, setResponse] = useState('');
  const [userID, setUserID] = useState('')
  const [rating, setRating] = useState(0);

  // Function to handle review submission
  const handleSubmitReview = async () => {
    try {
      await axios.post('http://localhost:3000/chat', { prompt: review , user : userID, starrating: rating});
      setReview('');
      fetchReviews();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchReviews = async() =>{
    try{
      const reviewData = await axios.post('http://localhost:3000/dashboard');
      setReviews(reviewData.data);
      console.log(reviewData.data);
    }catch(error){
      console.error('Error:',error);
    }
  };
  useEffect(()=> {
    fetchReviews();
  }, []);
  const handleStarClick = (starRating) => {
    console.log(starRating);
    setRating(starRating);
  };
  

  return (
    <div>
    <ProductDisplay reviews={reviews}/>
      <div>
      <ReviewDisplay reviewsToDisplay = {reviews} />
      <form>
      <div className='userDetails'>
        <input className='username'
          type='email'
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          placeholder ='Email Id'
          required
        />
        <div className='rating'>
        <StarRating onStarClick={handleStarClick} />
        </div>
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder='Write your review...'
          rows={4}
          cols={100}
        ></textarea>
        
        <br />
        <button className ="button" onClick={handleSubmitReview}>Submit Review</button>
        {response && <div>Response: {response}</div>}
        </form>
        </div>
      </div>

  );
}

export default ProductOverview;
