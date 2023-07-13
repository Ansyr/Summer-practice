import { Form, Input } from "antd";
import { ChangeEvent } from "react";

interface FormFieldProps {
    label: string;
    onChangeField: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    required: boolean;
    message: string;
}

const FormField = (props: FormFieldProps) => {
    const { label, onChangeField, value, required, message } = props;
    const validationRules = required ? [{ required: true, message }] : [];

    return (
        <Form.Item label={label} rules={validationRules}>
            <Input value={value} onChange={onChangeField} />
        </Form.Item>
    );
};

export default FormField;
