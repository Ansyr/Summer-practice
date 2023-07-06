import {Form, Input} from "antd";
import {ChangeEvent} from "react";



interface FormFieldProps {
    label: string
    onChangeField: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string | number
}



const FormField = (props: FormFieldProps) => {
    const {label, onChangeField, value} = props
    return (
        <Form.Item label={label}>
            <Input value={value} onChange={onChangeField}/>
        </Form.Item>
    );
};

export default FormField;