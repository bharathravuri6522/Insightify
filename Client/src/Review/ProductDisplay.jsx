import React from 'react';
import RatingsDisplay from './RatingDisplay';
import { useNavigate } from 'react-router-dom';


function ProductDisplay(props){
  const navigate = useNavigate();

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth' // Optional: adds smooth scrolling behavior
    });
  }
  function viewStats(){
    navigate("/view", { state: { isAuthenticated: true } });
  }
    return (
        <div className= "productdisplay" style={{ display: 'flex', alignItems: 'center' }}>
      {/* Product Image */}

      <div style={{ marginRight:'20px', paddingRight:'2%'}}>
        <img src= "/Product1.jpg" alt="Product" style={{ Width: '250px', height: '250px', objectFit:'cover' }} />
      </div>

      {/* Product Description */}
      <div style={{ flex: '1', padding: '0 5%' }}>
       <div>
          <p className='productName'>iHealth No-Touch Forehead Thermometer, Digital Infrared Thermometer for Adults 
          and Kids, Non-Contact Baby Thermometer, 3 Ultra-Sensitive Sensors, Large LED Digits,
         Quiet Vibration Feedback, Black</p>
       </div>
       <div>
         <h3>Customer Reviews</h3>
         <RatingsDisplay reviews={props.reviews}/>
         <button className='button' onClick={scrollToBottom}>Write a review</button>
         <button className='button2' onClick={viewStats}>View Stats</button>
         
        </div>
      </div>
    </div>

    );
}

export default ProductDisplay;