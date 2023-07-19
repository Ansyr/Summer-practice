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
import {useGetPredictSaleQuery, useGetReadableCityQuery} from "../../../../modules/statistic/api.ts";
import {Card, Typography} from "antd";

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
    },
};



export function PredictSaleChart() {
    const {data: predictSaleData} = useGetPredictSaleQuery([])
    const labels = predictSaleData?.map(item => item.year)
    const dataSet = predictSaleData?.map(item => item.salesVolume)
    const data = {
        labels,
        datasets: [
            {
                label: 'Книги',
                data: dataSet,
                borderColor: 'rgb(99,161,255)',
                backgroundColor: 'rgb(255,255,255)',
            },
        ],
    };
    console.log(predictSaleData)
    if (!predictSaleData) {
        return null; // Если данные еще не загружены, не отображаем график
    }
    return(
        <Card style={{backgroundColor: "rgb(225,225,225)",width:'100'}}>
            <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
                Тенденция развития рынка книг
            </Typography.Title>
            <Line options={options} data={data} />;
        </Card>
    )
}
