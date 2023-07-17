import {Button, Table, Form, Input, Popconfirm, Alert, Modal, message} from "antd";

import {useState} from "react";
import {DeleteFilled, EditOutlined} from "@ant-design/icons";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import UpdateDataBook from "../update-data-book";
import {BookWithPrice} from "../../../../modules/book/api/type.ts";


interface BookTableProps {
    data: BookWithPrice[],
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | string,
    remove: (id: BookWithPrice) => void
    update: (item: BookWithPrice) => void
}

function BookTable({isLoading, error, data, remove, update}: BookTableProps) {

    const [searchText, setSearchText] = useState('')
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);



    const handleDelete = (id: BookWithPrice) => {
        remove(id)
    };


    const handleEdit = (item: any) => {
        setEditingItem(item);
        setModalVisible(true);
    };

    const handleSave = async (values: BookWithPrice) => {
        try {
            // Call the update mutation from the API hook
            await update(values);
            message.success("Author added successfully");
            form.resetFields();
            setModalVisible(false);

        } catch (error) {
            // Handle any error that occurred during the update
            console.log("Update error:", error);
            message.error("Failed to add author");
        }
    }


    const columns: any = [
        {
            title: "Имя",
            key: ["author", "first_name"],
            dataIndex: ["author", "first_name"],
            filteredValue: [searchText],
            onFilter: (value: string, obj: any) => {
                return String(obj.author.firstname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.author.lastname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.author.surname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.bookName).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.price).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.amount).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.discount).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.publishYear).toLowerCase().includes(value.toLowerCase())
            },
            responsive: ['lg'],
            sorter: (val1: any, val2: any) => {
                return val1.author.firstname <= val2.author.firstname
            }
        },
        {
            title: "Фамилия",
            key: ["author", "last_name"],
            dataIndex: ["author", "last_name"],
            filteredValue: [searchText],
            sorter: (val1: any, val2: any) => {
                return val1.author.lastname > val2.author.lastname
            }
        }, {
            title: "Отчество",
            dataIndex: ["author", "sur_name"],
            key: ["author", "sur_name"],
            filteredValue: [searchText],
            sorter: (val1: any, val2: any) => {
                return val1.author.surname > val2.author.surname
            }

        }, {
            title: "Книга",
            dataIndex: ["book_name"],
            key: ["book_name"],
            filteredValue: [searchText],
            sorter: (val1: any, val2: any) => {
                console.log(val1.bookName)
                return val1.bookName > val2.bookName
            }
        }, {
            title: "Год публикации",
            key: ["publish_year"],
            dataIndex: "publish_year",
            filteredValue: [searchText],

            responsive: ['lg'],
            sorter: (val1: any, val2: any) => {
                return val1.publishYear > val2.publishYear
            }

        }, {
            title: "Цена",
            key: ["sale", "price"],
            dataIndex: ["sale", "price"],
            filteredValue: [searchText],
            sorter: (val1: any, val2: any) => {
                return val1.sale.price > val2.sale.price
            }
        }, {
            title: "Скидка %",
            key: ["sale", "discount"],
            dataIndex: ["sale", "discount"],
            filteredValue: [searchText],
            sorter: (val1: any, val2: any) => {
                return val1.sale.discount > val2.sale.discount
            }
        }, {
            title: "Количество",
            key: ["sale", "amount"],
            dataIndex: ["sale", "amount"],
            filteredValue: [searchText],
            sorter: (val1: any, val2: any) => {
                return val1.sale.amount > val2.sale.amount
            }
        },

        {
            render: (record: any) => (

                <div style={{display: "flex"}}>
                    <Button
                        style={{marginRight: 20}}
                        icon={<EditOutlined/>}
                        shape="circle"
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
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

                    <Table columns={columns} dataSource={data.length ? data : []} loading={isLoading}  rowKey="id" scroll={{ x: "max-content" }}></Table>
                    <Modal open={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                        {editingItem && (
                            <UpdateDataBook initialValues={editingItem} onSave={handleSave}
                                            onCancel={() => setModalVisible(false)}
                            />
                        )}
                    </Modal>
                </Form>
            }


        </>


    );
}

export default BookTable;

