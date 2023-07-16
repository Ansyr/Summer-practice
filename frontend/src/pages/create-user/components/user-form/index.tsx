import {
    Button,
    Form, Input,
} from 'antd';
import {ChangeEvent} from "react";

import SelectField from "../../../../shared/components/select-field";
import {useDispatch} from "react-redux";
import {setSelectedBookIds, setFormData} from "../../model/slice.ts";
import {useAppSelector} from "../../../../shared/hooks/redux.ts";
import DateFormat from "../../../../shared/components/date-format";
import {useGetAllBooksQuery} from "../../model/api.ts";




const UserForm = () => {
    const {data: books} = useGetAllBooksQuery([])
    const dispatch = useDispatch();
    const {data, selectedBookIds} = useAppSelector(state => state.userForm);

    const handleSelectChange = (selectedOptions:[]) => {
        const selectedIds = selectedOptions.map((option) => option);
        dispatch(setSelectedBookIds(selectedIds));
    };
    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormData({...data, [name]: e.currentTarget.value}));
    };


    const handleFormSubmit = () => {
        const updatedData = {...data};
        console.log(updatedData)
        dispatch(setFormData(updatedData));
    }

    return (
        <Form

            onFinish={handleFormSubmit}
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            style={{maxWidth: 600}}
        >



            <Form.Item name={"last_name"} label={"Фамилия"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.lastname} onChange={onChangeField("lastName")}/>
            </Form.Item>

            <Form.Item name={"first_name"} label={"Имя"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.firstname} onChange={onChangeField("firstName")}/>
            </Form.Item>


            <Form.Item name={"sur_name"} label={"Отчество"}
                       rules={[{required: true, message: "Заполните поле"}]}>
                <Input value={data.firstname} onChange={onChangeField("surName")}/>
            </Form.Item>

            <DateFormat label={"Дата рождения"} value={data.birthDate} onChangeField={onChangeField("birthDate")}></DateFormat>


            <SelectField
                text={"Авторы"}
                mode="multiple"
                data={books? books : []}
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