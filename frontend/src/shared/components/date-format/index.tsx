import {Form} from "antd";
import styles from './styles.module.scss'

interface DateFormatProps {
    label: string
    value: string
    onChangeField: (name : any) => void,
}

const DateFormat = (props: DateFormatProps) => {
    const {label,value,onChangeField} = props
    return (
        <Form.Item label={label}>
            <input type="date" className={styles.date} value={value} onChange={onChangeField}/>
        </Form.Item>

    );
};

export default DateFormat;