import {
    Button,
    Form,
    Input, TreeSelect,
} from 'antd';
import DateFormat from "../../../../shared/components/date-format";
import FormField from "../../../../shared/components/form-field";
import {ChangeEvent, useCallback} from "react";
import SelectorInput from "../../../../shared/components/selector-input";
import styles from './styles.module.scss'
interface DataFrom {
    lastname: string,
    firstname: string,
    surname: string,
    birthDate: string,
    region: string,
    city: string,
    microdistrict: string,
    phoneNum: string,
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
    const onChangeField = useCallback((name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        ( onChange({...data, [name]: e.currentTarget.value}))
    },[])

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


                <FormField label={"Фамилия"} value={data.lastname} onChangeField={onChangeField("lastname")}/>

                <FormField label={"Имя"} value={data.firstname} onChangeField={onChangeField("firstname")}/>

                <FormField label={"Отчество"} value={data.surname} onChangeField={onChangeField("surname")}/>


                <Form.Item label="Номер">
                    <Input

                        placeholder="+_ (___) ___-____"
                        autoComplete="on"
                        onChange={onChangeField("phoneNum")}
                        value={data.phoneNum}
                    />
                </Form.Item>

                <SelectorInput label={"Образование"}/>


                <SelectorInput label={"Регион"}/>


                <FormField label={"Город"} value={data.city} onChangeField={onChangeField("city")}/>


                <FormField label={"Микрорайон"} value={data.microdistrict}
                           onChangeField={onChangeField("microdistrict")}/>

                <FormField label={"Номер дома"} value={data.houseNum} onChangeField={onChangeField("houseNum")}/>

                <FormField label={"Номер квартиры"} value={data.apartNum} onChangeField={onChangeField("apartNum")}/>

                <Form.Item label="Книги">
                    <TreeSelect
                        treeData={[
                            { title: 'Light', value: "light", children: [{ title: 'Bamboo', value: 'bamboo' }] },
                        ]}
                    />
                </Form.Item>

                <DateFormat label={"Дата рождения"} value={data.birthDate} onChangeField={onChangeField("birthDate")}/>

                <Form.Item >
                    <Button htmlType={"submit"} className={styles.btnComfirm} type={"primary"}>Подтвердить</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default UserForm;