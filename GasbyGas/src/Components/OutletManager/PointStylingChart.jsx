import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const PointStylingChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
    datasets: [
      {
        label: 'Monthly Sales',
        data: [300, 500, 200, 400, 100, 600], // Sales data
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Point fill color
        pointBorderColor: 'rgba(255, 99, 132, 1)', // Point border color
        pointBackgroundColor: 'rgba(255, 99, 132, 0.5)', // Point background color
        pointRadius: 6, // Size of points
        pointHoverRadius: 8, // Hover size
        pointStyle: 'rectRounded', // Shape of the points (e.g., circle, rect, star, etc.)
        tension: 0.4, // Curve smoothness
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: false,
        text: 'Monthly Sales Data with Point Styling', // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the Y-axis starts at 0
        title: {
          display: true,
          text: 'Sales (in LKR (000))', 
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months', 
        },
      },
    },
  };

  return (

      <Line data={data} options={options} width={1000} height={400} />
 
  );
};

export default PointStylingChart;
