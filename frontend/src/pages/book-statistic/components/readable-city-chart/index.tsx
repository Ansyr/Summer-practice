import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import {useGetReadableCityQuery} from "../../../../modules/statistic/api.ts";
import {Typography} from "antd";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};



export function ReadableCityChart() {
    const {data: readableCityData} = useGetReadableCityQuery([])
    const labels = readableCityData?.map(item => item.city)

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: readableCityData?.map(() => faker.datatype.number({ min: 0, max: 10 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    console.log(readableCityData)
    return(
        <div style={{ width: 700 }}>
            <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
                Самый читающий слой
            </Typography.Title>
            <Line options={options} data={data} />;
        </div>
    )
}
