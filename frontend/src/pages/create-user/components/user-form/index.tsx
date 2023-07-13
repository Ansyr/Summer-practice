
import {
    Button,
    Form,
    Input,TreeSelect,Typography
} from 'antd';
import {ChangeEvent} from "react";

import FormField from "../../../../shared/components/form-field";

interface DataFrom {
    lastname: string,
    firstname: string,
    surname: string,
    birthDate: string,
    region: string,
    city: string,
    microdistrict: string,
    houseNum: string,
    apartNum: string
    book: any
}

interface UserFormProps {
    data: DataFrom
    onChange: (data: DataFrom) => void
    onSubmit?: () => void

}

const UserForm = (props: UserFormProps) => {
    const {data, onChange} = props;
    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange({...data, [name]: e.currentTarget.value});
    };

    const onSubmit = (val) => {
        console.log(data)
    }


    console.log(data)
    return (
        <>


            <Form
                onSubmitCapture={onSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
            >


                <FormField label={"Фамилия"} onChangeField={onChangeField("lastname")}/>

                <FormField label={"Имя"}  onChangeField={onChangeField("firstname")}/>

                <FormField label={"Отчество"}  onChangeField={onChangeField("surname")}/>


                <FormField label={"Образование"}  onChangeField={onChangeField("city")}/>


                <FormField label={"Регион"}  onChangeField={onChangeField("city")}/>

                <FormField label={"Город"} onChangeField={onChangeField("city")}/>

                <FormField label={"Номер дома"}  onChangeField={onChangeField("city")}/>

                <FormField label={"книги"}  onChangeField={onChangeField("city")}/>



                <Form.Item>
                    <Button htmlType={"submit"} type={"primary"}>Подтвердить</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default UserForm;