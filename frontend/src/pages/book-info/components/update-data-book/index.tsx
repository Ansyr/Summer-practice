import {Form, Input, Button, Typography} from "antd";
import {useEffect, useState} from "react";
import {BookWithPrice} from "../../../../modules/book/api/type.ts";
import {useFetchAuthorQuery} from "../../../../modules/author/api/api.ts";
import SelectField from "../../../../shared/components/select-field";


interface UpdateDataBookProps{
    initialValues: BookWithPrice[],
    onSave: (values: BookWithPrice) => void,
    onCancel: ()=> void
}

const UpdateDataBook = ({ initialValues, onSave, onCancel } : UpdateDataBookProps) => {
    const [form] = Form.useForm();
    const {data: authors} = useFetchAuthorQuery([])
    const [select,setSelect] = useState(null)
    const handleSelectChange = (selectedOptions: any) => {
        setSelect(selectedOptions);
    };


    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const updatedValues = {
                    ...values,
                    authorId: select // Add selected option to the form values
                };
                onSave(updatedValues);
            })
            .catch((error) => {
                // Handle validation errors if needed
                console.log("Form validation error:", error);
            });
    };



    useEffect(() => {
            form.setFieldsValue(initialValues);
        }, [form, initialValues]);

        return (
            <Form form={form} layout="vertical">
                <Form.Item name={["id"]} ><Typography>Изменить данные о книге</Typography></Form.Item>
                <SelectField data={authors ? authors : []} onChange={handleSelectChange} valueField={"id"}
                             displayField={"last_name"} text={"Автор"}/>

                <Form.Item name={"book_name"}  label="Название книги" rules={[{ required: true, message: "Заполните поле" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={"publish_year"}  label="Год публикации" rules={[{ required: true, message: "Заполните поле" }]}>
                    <Input type={"number"} min={0}/>
                </Form.Item>


                <Form.Item name={["sale","price"]}  label="цена" rules={[{ required: true, message: "Заполните поле" }]}>
                    <Input type={"number"} min={0}/>
                </Form.Item>


                <Form.Item name={["sale","discount"]}  label="Скидка">
                    <Input type={"number"} min={0}/>
                </Form.Item>

                <Form.Item name={["sale","amount"]}  label="Скидка">
                    <Input type={"number"} min={0}/>
                </Form.Item>


                <Button type="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Form>
        );
};

export default UpdateDataBook;