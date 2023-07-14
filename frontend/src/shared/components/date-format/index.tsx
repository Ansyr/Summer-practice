import {Form} from "antd";

interface DateFormatProps {
    label: string
    value: string
    onChangeField: (name: any) => void,
}

const DateFormat = (props: DateFormatProps) => {
    const {label, value, onChangeField} = props
    return (
        <Form.Item label={label}>
            <input type="date" value={value}/>
            <input type="date" value={value} onChange={onChangeField}/>
        </Form.Item>

    )
}

export default DateFormat