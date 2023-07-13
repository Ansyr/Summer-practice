import { useState } from 'react';
import BookForm from "./components/book-form";
import {Button, Typography} from "antd";
import {useCreateFullBookMutation} from "../book-info/model/api.ts";
import UserForm from "../create-user/components/user-form";



const BookCreatePage = () => {
    const [addBook] = useCreateFullBookMutation()
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

    const onSubmit = async () => {
        console.log(dataForm)
        await addBook(dataForm)
    }

    return (
        <>
            <Typography.Title level={2}>Добавить книгу</Typography.Title>
            <BookForm data={dataForm} onChange={setDataForm} onSubmit={onSubmit}/>
            {/*<UserForm></UserForm>*/}
            <Button onClick={onSubmit}>Добавить</Button>
        </>

    );
};

export default BookCreatePage;