import React,{useState, useEffect} from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import PieChart from './PieChart.jsx';

 // Import your PieChart component

function PieChartDisplay() {
  const location = useLocation();
  const isAuthenticated = location.state && location.state.isAuthenticated;
  const [reviewData, setReviewData] = useState([]);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  useEffect(() =>{
    fetchData();
  },[]);

  const fetchData = async()=>{
    try {
        const response = await axios.post('http://localhost:3000/viewstats');
        setReviewData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  return (
    <div>
      <h1>Review Statistics</h1>
      <PieChart data={reviewData} />
    </div>
  );
}

export default PieChartDisplay;
