import {Form, Input, Button, Typography} from "antd";
import {useEffect, useState} from "react";
import {BookWithPrice} from "../../../../modules/book/api/type.ts";
import SelectField from "../../../../shared/components/select-field";
import {useGetAllBooksQuery} from "../../../../modules/book/api/api.ts";
import {UserApi} from "../../../../modules/user/api/type.ts";


interface UpdateDataBookProps{
    initialValues: UserApi[],
    onSave: (values: BookWithPrice[]) => void,
    onCancel: ()=> void
}

const UpdateDataUser = ({ initialValues, onSave, onCancel } : UpdateDataBookProps) => {
    console.log(initialValues)
    const [form] = Form.useForm();
    const {data: dataBooks} = useGetAllBooksQuery([])
    const [select,setSelect] = useState(null)
    const handleSelectChange = (selectedOptions: any) => {
        setSelect(selectedOptions);
    };


    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {

                console.log(values)
                const updatedValues = {
                    ...values,
                    booksIds: select // Add selected option to the form values
                };
                onSave(updatedValues);

            })
            .catch((error) => {
                // Handle validation errors if needed
                console.log("Form validation error:", error);
            });
    };



    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [form, initialValues]);

    return (
        <Form form={form} layout="vertical">

            <Form.Item name={["id"]} ><Typography>Изменить данные о пользователе</Typography></Form.Item>

            <Form.Item name={"last_name"} label={"Фамилия"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={"first_name"} label={"Имя"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>


            <Form.Item name={"sur_name"} label={"Отчество"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            {/*<DateFormat label={"Дата рождения"} name={"birth_date"}/>*/}

            <Form.Item name={["user_info","degree_education"]} label={"Образование"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>


            <Form.Item name={["user_info","location","region"]} label={"Область"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={["user_info","location","city"]} label={"Город"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={["user_info","location","microdistrict"]} label={"Микрорайон"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input />
            </Form.Item>

            <Form.Item name={["user_info","location","house_num"]} label={"Номер дома"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input  type={"number"} min={0}/>
            </Form.Item>

            <Form.Item name={["user_info","location","apartment"]} label={"Номер квартиры"}>
                <Input  type={"number"} min={0}/>
            </Form.Item>

            {/*<Form.Item name={"phoneNumber"} label={"Номер телефона"}>*/}
            {/*    <PhoneNumberInput />*/}
            {/*</Form.Item>*/}

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