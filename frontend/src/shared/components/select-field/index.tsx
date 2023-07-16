import { Form, Select} from "antd";

const SelectField = ({ data, valueField, displayField, onChange,selectedValues,text,...props} : any) => {
    return (
        <Form.Item label={text}>
            <Select

                style={{ width: "50%", height: "50%" }}
                onChange={onChange}
                optionFilterProp="children"
                value={selectedValues}
                showSearch={true}
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
        </Form.Item>
    );
};

export default SelectField;