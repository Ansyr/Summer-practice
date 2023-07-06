import {Form} from "antd";
import FormField from "../../../../shared/components/form-field";
import {FullBookInfo} from "../../model/type.ts";
import {ChangeEvent, useMemo, useState} from "react";


interface UpdateDataBookProps {
    data: FullBookInfo,
    onChange: (data: FullBookInfo) => void
    onSubmit: (id: string) => void
}

const UpdateDataBook = (props: UpdateDataBookProps) => {
    const {data,onChange,onSubmit} = props
    const [dataForm,setDataForm] = useState(data)
    const onChangeField = useMemo(() => (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange({...data, [name]: e.currentTarget.value})
    }, [data]);
    return (
        <>
            <Form
                onSubmit={onSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
            >


                <FormField label={"Фамилия автора"} value={data?.author?.lastname}
                           onChangeField={onChangeField("lastname")}/>

                <FormField label={"Имя автора"} value={data?.author?.firstname}
                           onChangeField={onChangeField("firstname")}/>

                <FormField label={"Отчество автора"}
                           value={data?.author?.surname ? data.author.surname : 'отсутствует'}
                           onChangeField={onChangeField("surname")}/>


                <FormField label={"Дата публикации"} value={data?.publishYear}
                           onChangeField={onChangeField("publishYear")}/>


                <FormField label={"Цена"} value={data?.sale?.price} onChangeField={onChangeField("price")}/>

                <FormField label={"Скидка"}
                           value={data.sale?.discount ? data.sale.discount : 'отсутствует'}
                           onChangeField={onChangeField("sale")}/>

                <FormField label={"Количество"} value={data?.sale?.amount}
                           onChangeField={onChangeField("amount")}/>

                <FormField label={"Книга"} value={data?.bookName} onChangeField={onChangeField("bookName")}/>
            </Form>
        </>
    );
};

export default UpdateDataBook;