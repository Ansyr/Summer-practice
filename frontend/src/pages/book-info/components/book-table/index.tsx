import {Button, Table, Form, Input, Popconfirm, Alert, Modal} from "antd";

import {useEffect, useState} from "react";
import {DeleteFilled, EditOutlined} from "@ant-design/icons";
import {FullBookInfo} from "../../model/type.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import ModalWindow from "../../../../shared/components/modal-window";
import UpdateDataBook from "../update-data-book";
import {useCreateFullBookMutation} from "../../model/api.ts";


interface BookTableProps {
    data: FullBookInfo[],
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | string,
    remove: (id: string) => void
    update: (item: FullBookInfo) => void
}

function BookTable({isLoading, error, data, remove, update}: BookTableProps) {
    const [dataSource, setDataSource] = useState<FullBookInfo[]>(data);
    const [searchText, setSearchText] = useState('')
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);


    const [createBookInfo] = useCreateFullBookMutation()


    const handleDelete = (id: string) => {
        remove(id)
    };


    const handleEdit = (item) => {
        setEditingItem(item);
        setModalVisible(true);
    };

    const handleSave = (values) => {
        console.log(values)
        update(values);
        setModalVisible(false);
    };


    const columns = [
        {
            title: "Имя",
            key: ["author", "firstname"],
            dataIndex: ["author", "firstname"],
            filteredValue: [searchText],
            onFilter: (value: string, obj: FullBookInfo) => {
                return String(obj.author.firstname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.author.lastname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.author.surname).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.bookName).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.price).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.amount).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sale.discount).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.publishYear).toLowerCase().includes(value.toLowerCase())
            },
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                return val1.author.firstname <= val2.author.firstname
            }
        },
        {
            title: "Фамилия",
            key: ["author", "lastname"],
            dataIndex: ["author", "lastname"],
            filteredValue: [searchText],
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                return val1.author.lastname > val2.author.lastname
            }
        }, {
            title: "Отчество",
            dataIndex: ["author", "surname"],
            key: ["author", "lastname"],
            filteredValue: [searchText],
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                return val1.author.surname > val2.author.surname
            }

        }, {
            title: "Книга",
            dataIndex: ["book_name"],
            key: ["book_name"],
            filteredValue: [searchText],
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                console.log(val1.bookName)
                return val1.bookName > val2.bookName
            }
        }, {
            title: "Год публикации",
            key: [searchText],
            dataIndex: "publish_year",
            filteredValue: [searchText],
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                return val1.publishYear > val2.publishYear
            }
        }, {
            title: "Цена",
            key: ["sale", "price"],
            dataIndex: ["sale", "price"],
            filteredValue: [searchText],
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                return val1.sale.price > val2.sale.price
            }
        }, {
            title: "Скидка %",
            key: ["sale", "discount"],
            dataIndex: ["sale", "discount"],
            filteredValue: [searchText],
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                return val1.sale.discount > val2.sale.discount
            }
        }, {
            title: "Количество",
            key: ["sale", "amount"],
            dataIndex: ["sale", "amount"],
            filteredValue: [searchText],
            sorter: (val1: FullBookInfo, val2: FullBookInfo) => {
                return val1.sale.amount > val2.sale.amount
            }
        },

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

                    <Table columns={columns} dataSource={data.length ? data : []} loading={isLoading}></Table>
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
