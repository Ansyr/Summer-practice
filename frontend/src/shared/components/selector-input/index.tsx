import {Form, Select} from "antd";


interface SelectorInputProps{
    label: string
    value: string
}


const SelectorInput = (props: SelectorInputProps) => {
    const {label,value} = props
    return (
        <Form.Item
            name="gender"
            label={label}
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Select
                placeholder="Select a option and change input text above"
                allowClear
            >
                <Option value={"1"}>male</Option>
                <Option value={"2"}>female</Option>
                <Option value={"3"}>other</Option>
            </Select>
        </Form.Item>
    );
};

export default SelectorInput;