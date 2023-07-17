import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import {  } from '../../../../modules/book/api/api.ts';
import { Typography } from 'antd';
import {useGetPopularBooksQuery} from "../../../../modules/statistic/api.ts";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const { Title } = Typography;

const AreaPopularBooks = () => {
    const { data: popularBooks } = useGetPopularBooksQuery([]);
    const count = popularBooks?.map(item => item.added_count);
    const bookNames = popularBooks?.map(item => item.book_name);
    console.log(popularBooks);

    const data = {
        labels: bookNames,
        datasets: [
            {
                label: '# of Votes',
                data: count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div style={{ width: 400 }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
                Популярные книги
            </Title>
            <PolarArea width={200} height={150} data={data} options={options} />
        </div>
    );
};

export default AreaPopularBooks;
