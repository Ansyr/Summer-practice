import {
    Button,
    Form,
    Input,TreeSelect,Typography
} from 'antd';
import FormField from "../../../../shared/components/form-field";
import {ChangeEvent} from "react";
import styles from './styles.module.scss'

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

const BookForm = (props: UserFormProps) => {
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


                <FormField label={"Фамилия автора"} value={data.lastname} onChangeField={onChangeField("lastname")}/>

                <FormField label={"Имя автора"} value={data.firstname} onChangeField={onChangeField("firstname")}/>

                <FormField label={"Отчество автора"} value={data.surname} onChangeField={onChangeField("surname")}/>


                <FormField label={"Дата публикации"} value={data.city} onChangeField={onChangeField("city")}/>


                <FormField label={"Цена"} value={data.city} onChangeField={onChangeField("city")}/>

                <FormField label={"Скидка"} value={data.city} onChangeField={onChangeField("city")}/>

                <FormField label={"Количество"} value={data.city} onChangeField={onChangeField("city")}/>



                <Form.Item>
                    <Button className={styles.buttonConfirm} htmlType={"submit"} type={"primary"}>Подтвердить</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default BookForm;