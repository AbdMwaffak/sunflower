import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';

const LineChart = () => {

    const data1 = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [{
            label: 'My First Dataset',
            data: [10, 59, 56, 55, 40, 60, 65, 59, 40, 20, 56, 55, 40, 22, 20, 56, 65, 59, 20, 30, 56, 55, 40, 20, 30, 56, 55, 20, 40],
            fill: false,
            borderColor: "#f1c92f",
            tension: 0.1
        }]
    };
    return (
        <Line data={data1} />

    )
}
export default LineChart 
