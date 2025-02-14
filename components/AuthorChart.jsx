import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AuthorChart = ({ data }) => {


    const labels = data.map(({ name }) => name);

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Top 5 Authors of Papers That You Have Read',
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
                  ],
            },
        ],
    };

    return (
        <div style={{ position: 'relative', width: "80%" }}>
            <Pie data={dataToPass} options={options} />
        </div>
    );
};

export default AuthorChart;