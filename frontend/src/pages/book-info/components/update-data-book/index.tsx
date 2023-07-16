import { Form, Input, Button } from "antd";
import {useEffect} from "react";
import BookForm from "../../../create-book/components/book-form";

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
                <BookForm/>
                <Button type="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Form>
        );
};

export default UpdateDataBook;