import {
    Button,
    Form, Input, message,
} from 'antd';
import {ChangeEvent, useState} from "react";

import SelectField from "../../../../shared/components/select-field";
import DateFormat from "../../../../shared/components/date-format";
import {useGetAllBooksQuery} from "../../../../modules/book/api/api.ts";
import PhoneNumberInput from "../../../../shared/components/phone-number-input";
import {useCreateUserMutation} from "../../../../modules/user/api/api.ts";


const UserForm = () => {
    const [form] = Form.useForm()
    const {data: dataBooks} = useGetAllBooksQuery([])
    const [createUser] = useCreateUserMutation()
    const [data, setData] = useState({
        lastname: '',
        firstname: '',
        surname: '',
        birthDate: '',
        region: '',
        phoneNumber: '',
        city: '',
        microdistrict: '',
        degreeEducation: '',
        houseNum: '',
        apartament: '',
        booksIds: [],
    })
    const [select, setSelect] = useState([])
    const handleSelectChange = (selectedOptions: []) => {
        const selectedIds = selectedOptions.map((option) => option);
        console.log(selectedIds)
        setSelect(selectedIds);
    };
    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [name]: e.currentTarget.value});
    };


    const handleFormSubmit = async () => {
        console.log(select)
        const updatedData = {
            lastname: data.lastname,
            firstname: data.firstname,
            surname: data.surname,
            birthDate: data.birthDate,
            region: data.region,
            phoneNumber: data.phoneNumber,
            city: data.city,
            microdistrict: data.microdistrict,
            degreeEducation: data.degreeEducation,
            houseNum: Number(data.houseNum),
            apartment: Number(data.apartament),
            booksIds: select
        };
        try {
            console.log(updatedData)
            await createUser(updatedData);
            // Reset the form fields
            await form.validateFields()
            // Show success message

            message.success("Author added successfully");
            form.resetFields();
        } catch (error) {
            // Show error message
            message.error("Failed to add author");
        }
    }

    return (
        <Form
            form={form}
            onFinish={handleFormSubmit}
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            style={{maxWidth: 600}}
        >


            <Form.Item name={"last_name"} label={"Фамилия"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.lastname} onChange={onChangeField("lastname")}/>
            </Form.Item>

            <Form.Item name={"first_name"} label={"Имя"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.firstname} onChange={onChangeField("firstname")}/>
            </Form.Item>


            <Form.Item name={"sur_name"} label={"Отчество"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.surname} onChange={onChangeField("surname")}/>
            </Form.Item>

            <DateFormat label={"Дата рождения"} value={data.birthDate} onChange={onChangeField("birthDate")}/>

            <Form.Item name={"degree_education"} label={"Образование"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.degreeEducation} onChange={onChangeField("degreeEducation")}/>
            </Form.Item>


            <Form.Item name={"region"} label={"Область"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.region} onChange={onChangeField("region")}/>
            </Form.Item>

            <Form.Item name={"city"} label={"Город"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.city} onChange={onChangeField("city")}/>
            </Form.Item>

            <Form.Item name={"microdistrict"} label={"Микрорайон"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.microdistrict} onChange={onChangeField("microdistrict")}/>
            </Form.Item>

            <Form.Item name={"house_num"} label={"Номер дома"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.houseNum} onChange={onChangeField("houseNum")} type={"number"} min={0}/>
            </Form.Item>

            <Form.Item name={"apartment"} label={"Номер квартиры"}>
                <Input value={data.apartament} onChange={onChangeField("apartment")} type={"number"} min={0}/>
            </Form.Item>

            <Form.Item name={"phone_number"} label={"Номер телефона"}>
                <PhoneNumberInput value={data.phoneNumber} onChange={onChangeField("phoneNumber")}/>
            </Form.Item>

            <SelectField
                text={"Книги"}
                mode="multiple"
                data={dataBooks ? dataBooks : []}
                displayField={"book_name"}
                onChange={handleSelectChange}
                valueField={"id"}
            />

            <Form.Item>
                <Button htmlType="submit" type="primary">Подтвердить</Button>
            </Form.Item>
        </Form>
    );
};

export default UserForm