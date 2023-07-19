import AreaPopularBooks from "./components/area-popular-book";
import {ReadableCityChart} from "./components/readable-city-chart";
import {Col, Row} from "antd";
import {PredictSaleChart} from "./components/predict-sale-chart";

const Statistic = () => {
    return (
        < >
            <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={24} md={24} lg={6}>
                    <AreaPopularBooks />
                </Col>
                <Col xs={24} sm={24} md={24} lg={9}>
                    <PredictSaleChart />
                </Col>
                <Col xs={24} sm={24} md={24} lg={9}>
                    <ReadableCityChart />
                </Col>
            </Row>
        </>
    );
};

export default Statistic;






