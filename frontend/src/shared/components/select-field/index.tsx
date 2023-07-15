import {Col, Select, Typography} from "antd";
import styles from "./styles.module.scss"

const SelectField = ({ data, valueField, displayField, onChange,selectedValues,text,...props} : any) => {
    console.log(data)
    return (
        <div className={styles.selectFieldText}>
            <Col>
                <Typography>{text}</Typography>
            </Col>

            <Select

                style={{ width: "50%", height: "50%" }}
                onChange={onChange}
                
                value={selectedValues}
                showSearch={false}
                allowClear={true}
                {...props}
            >
                {data.map((item: any, index:number) => {
                    const value = item[valueField];
                    const display = item[displayField];

                    return (
                        <Select.Option key={index} value={value}>
                            {display}
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default SelectField;