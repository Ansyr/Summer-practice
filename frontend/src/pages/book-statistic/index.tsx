import AreaPopularBooks from "./components/area-popular-book";
import {ReadableCityChart} from "./components/readable-city-chart";
import {Col, Row} from "antd";

const Statistic = () => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <AreaPopularBooks />
                </Col>
                <Col xs={24} sm={12}>
                    <ReadableCityChart />
                </Col>
            </Row>
        </div>
    );
};

export default Statistic;