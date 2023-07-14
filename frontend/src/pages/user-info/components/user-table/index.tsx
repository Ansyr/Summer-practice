import React, {useState} from 'react';
import {Alert, Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {DeleteFilled, EditOutlined} from "@ant-design/icons";
import UpdateDataBook from "../../../book-info/components/update-data-book";
import {User} from "../../model/type.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

interface UserTableProps {
    data: User[],
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | string,
}

const UserTable = ({isLoading, data, error}: UserTableProps) => {

    const [searchText, setSearchText] = useState('')
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleDelete = (id: string) => {
        console.log(123)
    };
    const handleEdit = (item) => {
        setEditingItem(item);
        setModalVisible(true);
    };

    const columns = [
        {
            title: "Имя",
            key: ["first_name"],
            dataIndex: ["first_name"],
            filteredValue: [searchText],
            // onFilter: (value: string, obj: User) => {
            //     return String(obj.author.firstname).toLowerCase().includes(value.toLowerCase()) ||
            //         String(obj.author.lastname).toLowerCase().includes(value.toLowerCase()) ||
            //         String(obj.author.surname).toLowerCase().includes(value.toLowerCase()) ||
            //         String(obj.bookName).toLowerCase().includes(value.toLowerCase()) ||
            //         String(obj.sale.price).toLowerCase().includes(value.toLowerCase()) ||
            //         String(obj.sale.amount).toLowerCase().includes(value.toLowerCase()) ||
            //         String(obj.sale.discount).toLowerCase().includes(value.toLowerCase()) ||
            //         String(obj.publishYear).toLowerCase().includes(value.toLowerCase())
            // },
            responsive: ['lg'],
            sorter: (val1: User, val2: User) => {
                return val1.firstname <= val2.firstname
            }
        },
        {
            title: "Фамилия",
            key: ["last_name"],
            dataIndex: ["last_name"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.lastname > val2.lastname
            }
        }, {
            title: "Отчество",
            dataIndex: ["sur_name"],
            key: ["author", "sur_name"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.surname > val2.surname
            }

        }, {
            title: "Дата рождения",
            dataIndex: ["user_info", "birth_date"],
            key: ["birth_date"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.userInfo.birthDate > val2.userInfo.birthDate
            },
            render: (birthDate: string) => {
                const date = new Date(birthDate);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
            },
        },


        // {
        //     title: "Книги",
        //     dataIndex: "books",
        //     key: "books",
        //     filteredValue: [searchText],
        //     render: (books) => books.map((book) => book.book_name).join(", ")
        //
        // },

        {
            render: (record) => (

                <div style={{display: "flex"}}>
                    <Button
                        style={{marginRight: 20}}
                        icon={<EditOutlined/>}
                        shape="circle"
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <Button icon={<DeleteFilled/>} shape="circle" danger></Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];


    return (
        <>
            {error ? <Alert type="error" message="Ошибка при загрузке данных" banner/> :
                <Form form={form}>
                    <Input.Search
                        placeholder={'Найти информацию'}
                        onSearch={(val) => setSearchText(val)}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                    />

                    <Table columns={columns} dataSource={data.length ? data : []} loading={isLoading} rowKey="id"
                           scroll={{x: "max-content"}}></Table>
                    <Modal open={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                        {editingItem && (
                            <UpdateDataBook initialValues={editingItem}
                                            onCancel={() => setModalVisible(false)}
                            />
                        )}
                    </Modal>
                </Form>
            }


        </>


    );
}

export default UserTable;

