import { useState } from 'react';
import UserForm from "./components/user-form";
import styles from './styles.module.scss'
import {Typography} from "antd";



const UserCreatePage = () => {

    const [dataForm,setDataForm] = useState({
        lastname:'',
        firstname:'',
        surname:'',
        birthDate:'',
        region: '',
        city: '',
        microdistrict: '',
        phoneNum: '',
        houseNum: '',
        apartNum: '',
        book: ''
    })


    return (
        <>
            <Typography.Title className={styles.userForm} level={2}>Добавить пользователя</Typography.Title>
            <UserForm data={dataForm} onChange={setDataForm}/>
        </>

    );
};

export default UserCreatePage;