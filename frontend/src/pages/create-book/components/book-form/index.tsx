import {
    Button,
    Form, Input, message,
} from 'antd';

import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../shared/hooks/redux.ts";
import {setFormData, setSelectedAuthorIds} from "../../model/slice.ts";
import {useFetchAuthorQuery} from "../../../create-author/model/api.ts";
import SelectField from "../../../../shared/components/select-field";
import {useCreateBookMutation} from "../../model/api.ts";


const BookForm = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const {data} = useAppSelector(state => state.bookForm)

    const {data: authors} = useFetchAuthorQuery([])
    const [createBookApi] = useCreateBookMutation()
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
            console.log(data)
            if (data.authorId === null) {
                throw new Error()
            }
            await createBookApi({
                bookName: data.bookName,
                publishYear: data.publishYear,
                price: Number(data.price),
                discount: Number(data.discount),
                authorId: Number(data.authorId),
                amount: Number(data.amount)
            })

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
                <Form.Item name={"book_name"} label={"Название книги"}
                           rules={[{required: true, message: "Заполните поле"}, {type: "string"}]}>
                    <Input value={data.bookName} onChange={onChangeField("bookName")}/>
                </Form.Item>


                <Form.Item name={"publish_year"} label={"Год публикации"}
                           rules={[{required: true, message: "Заполните поле"}]}>
                    <Input value={data.publishYear} onChange={onChangeField("publishYear")} type={"number"} min={0}/>
                </Form.Item>


                <SelectField data={authors ? authors : []} onChange={handleSelectChange} valueField={"id"}
                             displayField={"last_name"} text={"Автор"}/>

                <Form.Item name={"price"} label={"Стоимость"}
                           rules={[{required: true, message: "Заполните поле"},]}>
                    <Input value={data.price} onChange={onChangeField("price")} type={"number"} min={0}/>
                </Form.Item>

                <Form.Item name={"discount"} label={"Скидка"}>
                    <Input value={data.discount} onChange={onChangeField("discount")} type={"number"} min={0}/>
                </Form.Item>

                <Form.Item name={"amount"} label={"Количество"}
                           rules={[{required: true, message: "Заполните поле"}]}>
                    <Input value={data.amount} onChange={onChangeField("amount")} type={"number"} min={0}/>
                </Form.Item>


            </Form>
            <Button onClick={onSubmit}>Добавить</Button>
        </>
    );
};

export default BookForm;