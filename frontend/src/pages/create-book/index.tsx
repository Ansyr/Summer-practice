import { useState } from 'react';
import BookForm from "./components/book-form";
import {Typography} from "antd";



const BookCreatePage = () => {

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


    return (
        <>
            <Typography.Title level={2}>Добавить книгу</Typography.Title>
            <BookForm data={dataForm} onChange={setDataForm}/>
        </>

    );
};

export default BookCreatePage;