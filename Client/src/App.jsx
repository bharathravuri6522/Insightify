import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductOverview from './Review/ProductOverview.jsx'
import Login from './Login.jsx'; 
import PieChartDisplay from './PieChart/PieChartDisplay.jsx'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<ProductOverview />} />
          <Route path='/login' element={<Login />} /> 
          <Route path='/view' element={<PieChartDisplay />} /> 
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
