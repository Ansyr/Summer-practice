import {Form, Input} from "antd";



interface FormFieldProps {
    label: string
    onChangeField: (name : any) => void,
    value: string
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