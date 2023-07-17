import {Form} from "antd";

interface DateFormatProps {
    label: string
    value: string
    name:string
    onChange: (name: any) => void,
}

const DateFormat = (props: DateFormatProps) => {
    const {label, value, onChange,name} = props
    return (
        <Form.Item label={label} name={name}>
            <input type="date" value={value} onChange={onChange}/>
        </Form.Item>

    )
}

export default DateFormat