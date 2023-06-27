import {Button, Table, Form, Input} from "antd";

import {ChangeEvent, useEffect, useState} from "react";
import {rules} from "@typescript-eslint/eslint-plugin";

const data = [
    {
        key: 1,
        lastname: 'Vasutin',
        firstname: 'Sergey',
        surname: 'Sergeevich',
        birthDate: '29-01-2003',
        region: 'Volgogradskaya oblast',
        city: 'Volzhsky',
        microdistrict: 'Olomouckaya',
        houseNum: '10',
        apartNum: '49',
        book: 'Dune'
    },
    {
        key: 2,
        lastname: 'Vasutin',
        firstname: 'Sergey',
        surname: 'Sergeevich',
        birthDate: '29-01-2003',
        region: 'Volgogradskaya oblast',
        city: 'Volzhsky',
        microdistrict: 'Olomouckaya',
        houseNum: '10',
        apartNum: '49',
        book: 'Dune'
    },
    {
        key: 3,
        lastname: 'Vasutin',
        firstname: 'Sergey',
        surname: 'Sergeevich',
        birthDate: '29-01-2003',
        region: 'Volgogradskaya oblast',
        city: 'Volzhsky',
        microdistrict: 'Olomouckaya',
        houseNum: '10',
        apartNum: '49',
        book: 'Dune'
    },
    {
        key: 4,
        lastname: 'Vasutin',
        firstname: 'Sergey',
        surname: 'Sergeevich',
        birthDate: '29-01-2003',
        region: 'Volgogradskaya oblast',
        city: 'Volzhsky',
        microdistrict: 'Olomouckaya',
        houseNum: '10',
        apartNum: '49',
        book: 'Dune'
    },
    {
        key: 5,
        lastname: 'Vasutin',
        firstname: 'Sergey',
        surname: 'Sergeevich',
        birthDate: '29-01-2003',
        region: 'Volgogradskaya oblast',
        city: 'Volzhsky',
        microdistrict: 'Olomouckaya',
        houseNum: '10',
        apartNum: '49',
        book: 'Dune'
    },
];
interface DataFrom {
    key: number,
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

function InfoTable() {
    const [dataSource, setDataSource] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [edit, setEdit] = useState(true)
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm();
    const [hasData, setHasData] = useState(true)
    useEffect(() => {
        const data = [];
        for (let index = 0; index < 7; index++) {
            data.push({
                key: `${index}`,
                firstname: `Name ${index}`,
                address: `Address ${index}`,
            });
        }
        setDataSource(data);
        setLoading(!loading)
    }, []);


    const renderField = (text: string, obj: DataFrom, fieldName: string, message) => {
        if (editingRow === obj.key) {
            return (
                <Form.Item name={fieldName} rules={[
                    {
                        required: true,
                        message: {message},
                    },
                ]}>
                    <Input/>
                </Form.Item>
            )
        } else {
            return <p>{text}</p>
        }
    }


    const columns = [
        {
            title: "Имя",
            dataIndex: "firstname",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "firstname", "Введите имя"),

        },
        {
            title: "Фамилия",
            dataIndex: "lastname",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "lastname", "Введите фамилию"),
        }, {
            title: "Отчество",
            dataIndex: "surname",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "surname", "Введите отчество"),
        }, {
            title: "Дата рождения",
            dataIndex: "birthDate",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "birthdate", "Введите дату рождения"),
        }, {
            title: "Регион",
            dataIndex: "region",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "region", "Введите регион"),
        }, {
            title: "Город",
            dataIndex: "city",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "city", "Введите город"),
        }, {
            title: "Микрорайон",
            dataIndex: "microdistrict",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "microdistrict", "Введите микрорайон"),
        }, {
            title: "Номер телефона",
            dataIndex: "phoneNum",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "phoneNum", "Введите номер телефона"),
        }, {
            title: "Номер дома",
            dataIndex: "houseNum",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "houseNum", "Введите номер дома"),
        }, {
            title: "Номер квартиры",
            dataIndex: "apartNum",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "apartNum", "Введите номер квартиры"),
        }, {
            title: "Книга",
            dataIndex: "book",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "book", "Введите название книги"),
        },

        {
            render: (_, obj) => {
                return (
                    <>
                        <Button
                            type="link"
                            onClick={() => {
                                setEditingRow(obj.key);
                                form.setFieldsValue({
                                    firstname: obj.firstname,
                                    address: obj.address,
                                });
                            }}

                        >
                            Edit
                        </Button>
                        <Button type="link" htmlType="submit">
                            Save
                        </Button>


                    </>
                );
            },
        },
    ];
    const onFinish = (values) => {
        const updatedDataSource = [...dataSource];
        updatedDataSource.splice(editingRow, 1, {...values, key: editingRow});
        setDataSource(updatedDataSource);
        setEditingRow(null);
        console.log(updatedDataSource)
    };

    return (

        <Form form={form} onFinish={onFinish}>
            <Table columns={columns} dataSource={hasData ? dataSource : []} loading={loading}></Table>
        </Form>

    );
}

export default InfoTable;