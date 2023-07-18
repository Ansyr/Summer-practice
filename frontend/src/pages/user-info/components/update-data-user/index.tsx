import {Form, Input, Button, Typography} from "antd";
import {useEffect, useState} from "react";
import {BookWithPrice} from "../../../../modules/book/api/type.ts";
import SelectField from "../../../../shared/components/select-field";
import {useGetAllBooksQuery} from "../../../../modules/book/api/api.ts";
import {UserApi} from "../../../../modules/user/api/type.ts";
import DateFormat from "../../../../shared/components/date-format";
import PhoneNumberInput from "../../../../shared/components/phone-number-input";


interface UpdateDataBookProps{
    initialValues: UserApi[],
    onSave: (values: BookWithPrice[]) => void,
    onCancel: ()=> void
}

const UpdateDataUser = ({ initialValues, onSave, onCancel } : UpdateDataBookProps) => {
    console.log("#######",initialValues)
    const [form] = Form.useForm();
    const {data: dataBooks} = useGetAllBooksQuery([])
    const [select,setSelect] = useState(initialValues.books)
    const user = {
        firstname: initialValues.first_name,
        lastname: initialValues.last_name,
        surname: initialValues.sur_name,
        apartment: initialValues.user_info.location.apartment,
        city: initialValues.user_info.location.city,
        birthDate: initialValues.user_info.birth_date,
        degreeEducation: initialValues.user_info.degree_education,
        houseNum: initialValues.user_info.location.house_num,
        microdistrict: initialValues.user_info.location.microdistrict,
        region: initialValues.user_info.location.region,
        phoneNumber:initialValues.phone_number,
    }
    const handleSelectChange = (selectedOptions: any) => {
        setSelect(selectedOptions);
    };


    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {

                console.log("res",values)
                const updatedValues = {
                    ...values,
                    booksIds: select,
                    id: initialValues.id// Add selected option to the form values
                };
                onSave(updatedValues);

            })
            .catch((error) => {
                // Handle validation errors if needed
                console.log("Form validation error:", error);
            });
    };



    useEffect(() => {
        form.setFieldsValue(user);
    }, [form, initialValues]);

    return (
        <Form form={form} layout="vertical">

            <Typography>Изменить данные о пользователе</Typography>

            <Form.Item name={"lastname"} label={"Фамилия"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={"firstname"} label={"Имя"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>


            <Form.Item name={"surname"} label={"Отчество"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <DateFormat label={"Дата рождения"} name={["birthDate"]} onChange={()=>{}}/>

            <Form.Item name={["degreeEducation"]} label={"Образование"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>


            <Form.Item name={["region"]} label={"Область"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={["city"]} label={"Город"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={["microdistrict"]} label={"Микрорайон"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={["houseNum"]} label={"Номер дома"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input  type={"number"} min={0}/>
            </Form.Item>

            <Form.Item name={["apartment"]} label={"Номер квартиры"}>
                <Input  type={"number"} min={0}/>
            </Form.Item>

            <Form.Item name={"phoneNumber"} label={"Номер телефона"}>
                <PhoneNumberInput />
            </Form.Item>

            <SelectField
                text={"Книги"}
                mode="multiple"
                data={dataBooks ? dataBooks : []}
                displayField={"book_name"}
                onChange={handleSelectChange}
                valueField={"id"}
            />





            <Button type="primary" onClick={handleSave}>
                Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
        </Form>
    );
};

export default UpdateDataUser;