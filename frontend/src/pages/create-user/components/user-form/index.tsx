import {
    Button,
    Form,
} from 'antd';
import {ChangeEvent} from "react";

import FormField from "../../../../shared/components/form-field";
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
            <FormField required={true} value={data.lastname} label={"Фамилия"} onChangeField={onChangeField("lastname")} name={"last_name"}/>
            <FormField required={true} value={data.firstname} label={"Имя"} onChangeField={onChangeField("firstname")} name={"first_name"}/>
            <FormField required={true} value={data.surname} label={"Отчество"} onChangeField={onChangeField("surname")} name={"sur_name"}/>

            <DateFormat label={"Дата рождения"} value={data.birthDate} onChangeField={onChangeField("birthDate")}></DateFormat>


            <SelectField
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