import {
    Form,
} from 'antd';

import {ChangeEvent} from "react";
import FormField from "../../../../shared/components/form-field";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../shared/hooks/redux.ts";
import {setFormData} from "../../model/slice.ts";


interface UserFormProps {
    onSubmit?: () => void
}

const   BookForm = (props: UserFormProps) => {
    const {onSubmit} = props;
    const dispatch = useDispatch()
    const {data} = useAppSelector(state => state.bookForm)
    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormData({...data, [name]: e.currentTarget.value}));
    };

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


            </Form>
        </>
    );
};

export default BookForm;