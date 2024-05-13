import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const PieDisplay = ({ positiveCount, negativeCount }) => {
  const chartData = [
    { value: positiveCount, color: '#4CAF50' }, // Green for positive
    { value: negativeCount, color: '#ff0000' }, // Orange for negative
  ];
  const overallCount = positiveCount+negativeCount;

  return (
    <div className='pie-display-container'>
    <div className="pie-chart-container">
      <PieChart
        data={chartData}
        lineWidth={40}
        startAngle={0}
        lengthAngle={360}
        animate
        animationDuration={500}
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
        labelPosition={100 - 40 / 2}
        labelStyle={{
          fontSize: '5px',
          fontFamily: 'sans-serif',
          fill: '#fff',
        }}
      />
    </div>
    <div className="information-box">

    <p>Overall Reviews = {overallCount}</p>
          <div className="color-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
              <p>Positive {positiveCount}</p>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#ff0000' }}></div>
              <p>Negative {negativeCount}</p>
            </div>
          </div>


    </div>
    </div>
  );
};

export default PieDisplay;
