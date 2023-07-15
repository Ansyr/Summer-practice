import { Form, Input } from "antd";
import { ChangeEvent } from "react";

interface FormFieldProps {
    label: string;
    onChangeField: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string | number | null;
    required: boolean;
    name:string
}

const FormField = (props: FormFieldProps) => {
    const { label, onChangeField, value, required,name } = props;
    const validationRules = required ? [{ required: true, message: "Заполните поле" }] : [];

    return (
        <Form.Item name={name} label={label} rules={validationRules}>
            <Input value={value} onChange={onChangeField} />
        </Form.Item>
    );
};

export default FormField;