
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);





const CategoryChart = ({ data }) => {



    const labels = data.map(({ name }) => name);

    const options = {
        responsive: true,
        plugins: {
 
            title: {
                display: true,
                text: 'Top 10 Categories of Papers That You Have Read',
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
    )

}

export default CategoryChart