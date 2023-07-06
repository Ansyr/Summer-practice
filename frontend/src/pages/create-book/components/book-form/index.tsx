import {
    Button,
    Form,
} from 'antd';

import {ChangeEvent, useMemo, useState} from "react";
import FormField from "../../../../shared/components/form-field";

interface DataFromBook {
    key?: number,
    lastname: string,
    firstname: string,
    surname: string,
    bookName: string,
    price: number | string,
    sale: number | string,
    publishYear: string,
    amount: number | string,
}

interface UserFormProps {
    data: DataFromBook
    onChange: (data: DataFromBook) => void
    onSubmit?: () => void
}

const BookForm = (props: UserFormProps) => {
    const {data, onChange,onSubmit} = props;
    const [dataForm,setDataForm] = useState({
        lastname: "",
        firstname: "",
        surname: "",
        bookName: "",
        price: "",
        sale: "",
        publishYear: "",
        amount: "",
    })

    const onChangeField = useMemo(()=>(name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange({...data, [name]: e.currentTarget.value})
    },[data]);


    return (
        <>


            <Form
                onSubmitCapture={onSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
            >


                <FormField label={"Фамилия автора"} value={data.lastname} onChangeField={onChangeField("lastname")}/>

                <FormField label={"Имя автора"} value={data.firstname} onChangeField={onChangeField("firstname")}/>

                <FormField label={"Отчество автора"} value={data.surname} onChangeField={onChangeField("surname")}/>


                <FormField label={"Дата публикации"} value={data.publishYear} onChangeField={onChangeField("publishYear")}/>


                <FormField label={"Цена"} value={data.price} onChangeField={onChangeField("price")}/>

                <FormField label={"Скидка"} value={data.sale} onChangeField={onChangeField("sale")}/>

                <FormField label={"Количество"} value={data.amount} onChangeField={onChangeField("amount")}/>

                <FormField label={"Книга"} value={data.bookName} onChangeField={onChangeField("bookName")}/>


            </Form>
        </>
    );
};

export default BookForm;