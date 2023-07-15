import {
    Button,
    Form, message,
} from 'antd';

import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../shared/hooks/redux.ts";
import {setFormData, setSelectedAuthorIds} from "../../model/slice.ts";
import {useFetchAuthorMutation, useFetchAuthorQuery} from "../../../create-author/model/api.ts";
import SelectField from "../../../../shared/components/select-field";
import {setSelectedBookIds} from "../../../create-user/model/slice.ts";
import FormField from "../../../../shared/components/form-field";


const BookForm = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const {data} = useAppSelector(state => state.bookForm)

    const {data: authors} = useFetchAuthorQuery([])
    console.log(authors)

    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormData({...data, [name]: e.currentTarget.value}));
    };

    const handleSelectChange = (selectedOptions: string) => {
        dispatch(setSelectedAuthorIds(selectedOptions));
    };
    const onSubmit = async () => {
        try {
            // Reset the form fields
            if (data.authorId === null){
                throw new Error ()
            }
            await form.validateFields()
            // Show success message
            message.success("Author added successfully");
            form.resetFields();

        } catch (error) {
            // Show error message
            message.error("Failed to add author");
        }
    };

    return (
        <>
            <Form
                form={form}
                onSubmitCapture={onSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
            >
                <FormField label={"Название книги"} onChangeField={onChangeField("bookName")} value={data.bookName}
                           required={true} name={"book_name"}/>
                <FormField label={"Год публикации"} onChangeField={onChangeField("publishYear")}
                           value={data.publishYear} required={true} name={"publish_date"}/>
                <SelectField data={authors ? authors : []} onChange={handleSelectChange} valueField={"id"}
                             displayField={"last_name"} text={"Автор"}/>

                <FormField label={"Стоимость"} onChangeField={onChangeField("price")}
                           value={data.price} required={true} name={"price"}/>

                <FormField label={"Скидка"} onChangeField={onChangeField("discount")}
                           value={data.price} required={false} name={"discount"}/>

                <FormField label={"Количество"} onChangeField={onChangeField("amount")}
                           value={data.amount} required={true} name={"amount"}/>
            </Form>
            <Button onClick={onSubmit}>Добавить</Button>
        </>
    );
};

export default BookForm;