import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ data }) => {
  const chartData = {
    series: data.map(item => item.value),
    options: {
      chart: {
        type: 'pie',
      },
      labels: data.map(item => item.type),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <div className="pie-chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height={200}
      />
    </div>
  );
};

export default PieChart;
