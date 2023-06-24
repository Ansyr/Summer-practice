import { useState } from 'react';
import UserForm from "./components/user-form";



const UserCreatePage = () => {

    const [dataForm,setDataForm] = useState({
        lastname:'',
        firstname:'',
        surname:''
    })


    return (
        <UserForm data={dataForm} onChange={setDataForm}/>
    );
};

export default UserCreatePage;