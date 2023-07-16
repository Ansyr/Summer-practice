import {Form} from "antd";

interface DateFormatProps {
    label: string
    value: string
    onChange: (name: any) => void,
}

const DateFormat = (props: DateFormatProps) => {
    const {label, value, onChange} = props
    return (
        <Form.Item label={label}>
            <input type="date" value={value} onChange={onChange}/>
        </Form.Item>

    )
}

export default DateFormat