import {
    Button,
    Form, Input, message,
} from 'antd';

import {ChangeEvent} from "react";
import FormField from "../../../../shared/components/form-field";
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
                <FormField name={"last_name"} label={"Фамилия автора"} value={data.lastname} onChangeField={onChangeField("lastname")} required={true}/>

                <FormField name={"first_name"} label={"Имя автора"} value={data.firstname} onChangeField={onChangeField("firstname")} required={true}/>

                <FormField name={"sur_name"} label={"Отчество автора"} value={data.surname} onChangeField={onChangeField("surname")} required={true} />

            </Form>
            <Button onClick={onSubmit}>Добавить</Button>
        </>
    );
};

export default AuthorForm;