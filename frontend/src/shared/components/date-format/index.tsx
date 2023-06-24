import {Form} from "antd";
import styles from './styles.module.scss'

interface DateFormatProps {
    label: string
    value: string
}

const DateFormat = (props: DateFormatProps) => {
    const {label,value} = props
    return (
        <Form.Item label={label}>
            <input type="date" className={styles.date} value={value}/>
        </Form.Item>

    );
};

export default DateFormat;