import {Button, Table, Form, Input} from "antd";

import React, {useEffect, useState} from "react";
import {CheckOutlined, DeleteFilled, EditOutlined} from "@ant-design/icons";


interface DataFrom {
    key: number,
    lastname: string,
    firstname: string,
    surname: string,
    bookName: string,
    price: number,
    sale: number,
    publishYear: string,
    amount: number,
}

function BookTable() {
    const [dataSource, setDataSource] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [edit, setEdit] = useState(false)
    const [searchText,setSearchText] = useState('')
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm();
    const [hasData, setHasData] = useState(true)
    useEffect(() => {
        const data = [];
        for (let index = 0; index < 7; index++) {
            data.push({
                key: `${index}`,
                lastname: `lastname ${index}`,
                firstname: `firstname ${index}`,
                surname: `surname ${index}`,
                bookName: `bookName ${index}`,
                price: `${index* 22}`,
                sale: `${index * 10}`,
                publishYear: `publishYear ${index}`,
                amount: `${index}`,
            });
        }
        setDataSource(data);
        setTimeout(() => setLoading(!loading),1500)
    }, []);


    const renderField = (text: string, obj: DataFrom, fieldName: string, message: string) => {
        if (editingRow === obj.key) {
            return (
                <Form.Item name={fieldName} rules={[
                    {
                        required: true,
                        message: message,
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
            filteredValue:[searchText],
            onFilter: (value: string,obj: DataFrom) => {
                return String(obj.firstname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.lastname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.surname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.bookName).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.publishYear).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.price).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.amount).toLowerCase().includes(value.toLowerCase())
            },
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.firstname > val2.firstname
            }
        },
        {
            title: "Фамилия",
            dataIndex: "lastname",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "lastname", "Введите фамилию"),
            filteredValue:[searchText],
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.firstname > val2.firstname
            }
        }, {
            title: "Отчество",
            dataIndex: "surname",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "surname", "Введите отчество"),
            filteredValue:[searchText],
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.surname > val2.surname
            }

        }, {
            title: "Книга",
            dataIndex: "bookName",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "bookName", "Введите книгу"),
            filteredValue:[searchText],
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.bookName > val2.bookName
            }
        }, {
            title: "Год публикации",
            dataIndex: "publishYear",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "publishYear", "Введите год публикации"),
            filteredValue:[searchText],
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.publishYear > val2.publishYear
            }
        }, {
            title: "Цена",
            dataIndex: "price",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "price", "Введите цену"),
            filteredValue:[searchText],
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.price > val2.price
            }
        },{
            title: "Скидка %",
            dataIndex: "sale",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "sale", "Введите скидку"),
            filteredValue:[searchText],
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.sale > val2.sale
            }
        },{
            title: "Количество",
            dataIndex: "amount",
            render: (text: string, obj: DataFrom) => renderField(text, obj, "amount", "Введите количество"),
            filteredValue:[searchText],
            sorter: (val1: DataFrom,val2: DataFrom) => {
                return val1.amount > val2.amount
            }
        },

        {
            render: (_, obj:any) => {
                return (
                    <div style={{display:"flex"}}>
                        {
                            edit ? <Button  icon={<CheckOutlined/>}  htmlType="submit" onClick={() => setEdit(!edit)}>
                                Save
                            </Button> :  <Button
                                style={{marginRight: 20}}
                                icon={<EditOutlined/>}
                                shape={"circle"}
                                onClick={() => {
                                    setEditingRow(obj.key);
                                    form.setFieldsValue({
                                        ...obj
                                    });
                                }}

                            >

                            </Button>
                        }
                        <Button icon={<DeleteFilled/>} shape={"circle"} danger></Button>




                    </div>
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
            <Input.Search
            placeholder={'Найти информацию'}
            onSearch={(val) => setSearchText(val)}
            onChange={(e) => {
                setSearchText(e.target.value)
            }}
            />
            <Table columns={columns} dataSource={hasData ? dataSource : []} loading={loading}></Table>
        </Form>

    );
}

export default BookTable;