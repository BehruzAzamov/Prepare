import React from 'react';
import PieChart from './PieChart';

const PieChartContainer = () => {
  const data = [
    { type: 'Type A', value: 30 },
    { type: 'Type B', value: 40 },
    { type: 'Type C', value: 20 },
    { type: 'Type D', value: 10 },
  ];

  return (
    <div className="pie-chart-container">
      <h2>Pie Chart by Type</h2>
      <PieChart data={data} />
    </div>
  );
};

export default PieChartContainer;
