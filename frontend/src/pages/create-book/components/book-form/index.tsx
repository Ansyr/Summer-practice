import {
    Button,
    Form, Input, message,
} from 'antd';

import {ChangeEvent, useState} from "react";
import {useFetchAuthorQuery} from "../../../../modules/author/api/api.ts";
import SelectField from "../../../../shared/components/select-field";
import {useCreateBookMutation} from "../../../../modules/book/api/api.ts";



const BookForm = () => {
    const [form] = Form.useForm()

    const [data,setData] = useState({
        bookName: '',
        publishYear: '',
        authorId: null,
        price: 0,
        discount: 0,
        amount: 0,
    })

    const [select,setSelect] = useState(null)

    const {data: authors} = useFetchAuthorQuery([])
    const [createBookApi] = useCreateBookMutation()

    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [name]: e.currentTarget.value});
    };

    const handleSelectChange = (selectedOptions: any) => {
       setSelect(selectedOptions);
    };
    const onSubmit = async () => {
        try {
            // Reset the form fields
            if (select === null) {
                throw new Error()
            }
           const updateData =  await createBookApi({
                bookName: data.bookName,
                publishYear: data.publishYear,
                price: Number(data.price),
                discount: Number(data.discount),
                authorId: Number(select),
                amount: Number(data.amount)
            })


           //@ts-ignore
           if(updateData?.error?.status === 409){
               message.error("Book already exist");
               form.resetFields();
               return
           }

            await form.validateFields()
            // Show success message
            message.success("Book added successfully");
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