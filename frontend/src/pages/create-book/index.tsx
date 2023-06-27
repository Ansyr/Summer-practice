import { useState } from 'react';
import BookForm from "./components/book-form";
import {Typography} from "antd";
import styles from './styles.module.scss'


const BookCreatePage = () => {

    const [dataForm,setDataForm] = useState({
        lastname:'',
        firstname:'',
        surname:'',
        birthDate:'',
        region: '',
        city: '',
        microdistrict: '',
        houseNum: '',
        apartNum: '',
        book: ''
    })


    return (
        <>
            <Typography.Title className={styles.bookForm} level={2}>Добавить книгу</Typography.Title>
            <BookForm data={dataForm} onChange={setDataForm}/>
        </>

    );
};

export default BookCreatePage;