import {
    Button,
    Form, Input, message,
} from 'antd';

import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../shared/hooks/redux.ts";
import {setFormData} from "../../model/slice.ts";
import {useCreateAuthorMutation} from "../../model/api.ts";



const AuthorForm = () => {
    const dispatch = useDispatch()
    const {data} = useAppSelector(state => state.authorForm)
    const [createAuthorApi]  = useCreateAuthorMutation()
    const [form] = Form.useForm()
    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormData({...data, [name]: e.currentTarget.value}));
    };

    const onSubmit = async () => {
        try {
            await createAuthorApi(data);
            // Reset the form fields
            await form.validateFields()
            // Show success message
            message.success("Author added successfully");
            form.resetFields();
        } catch (error) {
            // Show error message
            message.error("Failed to add author");
        }
    };


    return (
        <>
            <Form
                form={form}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
            >

                <Form.Item name={"last_name"} label={"Фамилия автора"} rules={[{ required: true, message: "Заполните поле" },{type: "string"}]}>
                    <Input value={data.lastname} onChange={onChangeField("lastname")} />
                </Form.Item>


                <Form.Item name={"first_name"} label={"Имя автора"} rules={[{ required: true, message: "Заполните поле" },{type: "string"}]}>
                    <Input value={data.firstname} onChange={onChangeField("firstname")} />
                </Form.Item>


                <Form.Item name={"sur_name"} label={"Отчество автора"} rules={[{ required: true, message: "Заполните поле" },{type: "string"}]}>
                    <Input value={data.surname} onChange={onChangeField("surname")}/>
                </Form.Item>




            </Form>
            <Button onClick={onSubmit}>Добавить</Button>
        </>
    );
};

export default AuthorForm;