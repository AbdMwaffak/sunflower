import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';

const BarChart = () => {

    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [{
            label: 'My First Dataset',
            data: [20, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
            // data2: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
            backgroundColor: [
                "#f1c92f",
            ],
            borderColor: [

                'rgb(255, 205, 86)',

                'rgb(54, 162, 235)',

            ],
            borderWidth: 1
        }]
    };
    const data2 = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [{
            label: 'My First Dataset',
            data: [10, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
            // data2: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
            backgroundColor: [
                "#f1c92f",
            ],
            borderColor: [

                'rgb(255, 205, 86)',

                // 'rgb(54, 162, 235)',

            ],
            borderWidth: 1
        }]
    };
    return (
        <Bar data={data} />,
        <Bar data={data2} />

    )
}

export default BarChart 
