import {Form, Input, Button, Typography} from "antd";
import {useEffect} from "react";

const UpdateDataAuthors = ({ initialValues, onSave, onCancel } : any) => {
    const [form] = Form.useForm();
    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave(values);
        }).catch((error) => {
            // Handle validation errors if needed
            console.log("Form validation error:", error);
        });
    };


    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [form, initialValues]);

    return (
        <Form form={form} layout="vertical">
            <Form.Item name={["id"]} ><Typography >Изменить данные автора</Typography></Form.Item>
            <Form.Item name={["first_name"]}  label="Имя автора" rules={[{ required: true, message: "Введите имя" }]}>
                <Input />
            </Form.Item>
            <Form.Item name={["last_name"]} label="Фамилия автора" rules={[{ required: true, message: "Введите фамилию" }]}>
                <Input />
            </Form.Item>
            <Form.Item name={["sur_name"]} label="Отчество автора">
                <Input />
            </Form.Item>

            <Button type="primary" onClick={handleSave}>
                Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
        </Form>
    );
};

export default UpdateDataAuthors;