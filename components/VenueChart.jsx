import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const VenueChart = ({ data }) => {
    const labels = data.map(({ name }) => name);

    const options = {
        indexAxis: 'y', // Set the index axis to 'y' for horizontal bars
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        // Github copilot suggested the following options:
        plugins: {
            title: {
                display: true,
                text: 'Top 10 Venues of Papers That You Have Read',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        const fullName = labels[context.dataIndex];
                        return `${label}: ${value} (${fullName})`;
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, values) {
                        const fullName = labels[index];
                        const truncatedName = fullName.length > 15 ? fullName.substring(0, 15) + '...' : fullName;
                        return truncatedName;
                    },
                },
            },
        },
    };

    const dataToPass = {
        labels,
        datasets: [
            {
                label: 'Number of Papers',
                data: data.map(({ count }) => count),
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(248, 17, 67)',
                    'rgba(4, 102, 167)',
                    'rgb(255, 207, 86)',
                    'rgba(45, 239, 239)',
                ],
            },
        ],
    };

    return (
        <div>
            <Bar data={dataToPass} options={options} />
        </div>
    );
};

export default VenueChart;