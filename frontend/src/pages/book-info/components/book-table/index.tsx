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
                return String(obj.author?.first_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.author?.last_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.author?.sur_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj?.book_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.price).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.amount).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.discount).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.publish_year).toLowerCase().includes(value.toLowerCase())
            },
            responsive: ['lg'],
            sorter: (a: any, b: any) => a.author.first_name.localeCompare(b.author.first_name),
        },
        {
            title: "Фамилия",
            key: ["author", "last_name"],
            dataIndex: ["author", "last_name"],
            filteredValue: [searchText],
            sorter: (a: any, b: any) => a.author.last_name.localeCompare(b.author.last_name),
        }, {
            title: "Отчество",
            dataIndex: ["author", "sur_name"],
            key: ["author", "sur_name"],
            filteredValue: [searchText],
            sorter: (a: any, b: any) => a.author.sur_name.localeCompare(b.author.sur_name),

        }, {
            title: "Книга",
            dataIndex: ["book_name"],
            key: ["book_name"],
            filteredValue: [searchText],
            sorter: (a: any, b: any) => a.book_name.localeCompare(b.book_name),
        }, {
            title: "Год публикации",
            key: ["publish_year"],
            dataIndex: "publish_year",
            filteredValue: [searchText],

            responsive: ['lg'],
            sorter: (val1: any, val2: any) => {
                return val1.publish_year > val2.publish_year
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
            title: "Дата добавления",
            key: ["added_date"],
            dataIndex: ["added_date"],
            filteredValue: [searchText],
            sorter: (val1: any, val2: any) => {
                return val1.sale.amount > val2.sale.amount
            },
            render: (birthDate: string) => {
                const date = new Date(birthDate);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
            },
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

