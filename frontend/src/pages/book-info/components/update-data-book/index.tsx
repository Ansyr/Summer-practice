import { Form, Input, Button } from "antd";
import {useEffect} from "react";

const UpdateDataBook = ({ initialValues, onSave, onCancel }) => {
        const [form] = Form.useForm();
        const handleSave = () => {
            form.validateFields().then((values) => {
                console.log(values)
                onSave(values);
            });
        };


        useEffect(() => {
            form.setFieldsValue(initialValues);
        }, [form, initialValues]);

        return (
            <Form form={form} layout="vertical">
                <Form.Item name={["id"]} ><div></div></Form.Item>
                <Form.Item name={["author","first_name"]} label="Имя автора" rules={[{ required: true, message: "Введите имя" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={["author","last_name"]} label="Фамилия автора" rules={[{ required: true, message: "Введите фамилию" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={["author","sur_name"]} label="Отчество автора">
                    <Input />
                </Form.Item>

                <Form.Item name={["book_name"]} label="Название книги" rules={[{ required: true, message: "Введите название книги" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={["publish_year"]} label="Год публикации" rules={[{ required: true, message: "Введите год публикации" }]}>
                    <Input />
                </Form.Item>


                <Form.Item name={["sale","price"]} label="Цена" rules={[{ required: true, message: "Введите цену" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={["sale","discount"]} label="Скидка">
                    <Input />
                </Form.Item>

                <Form.Item name={["sale","amount"]} label="Количество" rules={[{ required: true, message: "Введите количество" }]}>
                    <Input />
                </Form.Item>

                <Button type="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Form>
        );
};

export default UpdateDataBook;