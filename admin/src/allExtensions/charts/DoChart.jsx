import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as Chartjs, plugins, ArcElement, Tooltip, Legend } from 'chart.js/auto';

Chartjs.register(
    ArcElement,
    Tooltip,
    Legend
)
const DoChart = () => {

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const textCenter = {
        id: 'textCenter ',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;
            ctx.save();
            ctx.font = "bold 30px sans-serif ";
            ctx.fillStyle = "red";
            ctx.textAlign = 'center';
            ctx.textBaseline = "middle"
            ctx.fillText(data.datasets[0].data[0], chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }

    }
    return (
        <Doughnut data={data} plugins={[textCenter]} />

    )
}

export default DoChart 
