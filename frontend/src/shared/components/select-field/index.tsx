import {Select} from "antd";

const SelectField = ({ data, valueField, displayField, onChange,selectedValues,...props} : any) => {

    return (
        <div>
            <Select

                style={{ width: "50%", height: "50%" }}
                mode="multiple"
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