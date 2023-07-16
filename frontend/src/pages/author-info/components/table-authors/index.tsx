import {Button, Table, Form, Input, Popconfirm, Alert, Modal, message} from "antd";

import {useState} from "react";
import {DeleteFilled, EditOutlined} from "@ant-design/icons";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {Author, AuthorApi} from "../../../../shared/interfaces/author";
import {ColumnsType} from "antd/es/table";
import UpdateDataAuthors from "../update-data-authors";



interface BookTableProps {
    data: Author[],
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | string,
    remove: (id: string | number) => void
    update: (item: Author) => void

}


function AuthorTable({isLoading, error, data, remove, update}: BookTableProps) {

    const [searchText, setSearchText] = useState('')
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);


    const handleDelete = (id: number) => {
        remove(id)
    };


    const handleEdit = (item) => {
        setEditingItem(item);
        setModalVisible(true);
    };

    const handleSave = async (values: AuthorApi) => {
        try {
            console.log(values)
            // Call the update mutation from the API hook
            const updatedData = {id: values.id, firstname: values['first_name'], lastname: values['last_name'], surname:values['sur_name'] }
            await update(updatedData);
            message.success("Author added successfully");
            form.resetFields();
            setModalVisible(false);

        } catch (error) {
            // Handle any error that occurred during the update
            console.log("Update error:", error);
            message.error("Failed to add author");
        }
    }


    const columns: ColumnsType<Author> = [
        {
            title: "Имя",
            key: "first_name",
            dataIndex: ["first_name"],
            filteredValue: searchText ? [searchText] : null,
            onFilter(value: string, record: any) {
                return (
                    record.first_name.toLowerCase().includes(value.toLowerCase()) ||
                    record.last_name.toLowerCase().includes(value.toLowerCase()) ||
                    record.sur_name.toLowerCase().includes(value.toLowerCase())
                );
            },
            responsive: ['lg'],
            sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name),
        },
        {
            title: "Фамилия",
            key: "last_name",
            dataIndex: ["last_name"],
            filteredValue: [searchText],
            sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name),
        }, {
            title: "Отчество",
            dataIndex: ["sur_name"],
            key: "sur_name",
            filteredValue: [searchText],
            sorter: (a: any, b: any) => a.sur_name.localeCompare(b.sur_name),
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

                    <Table columns={columns} dataSource={data.length ? data : []} loading={isLoading} rowKey="id"
                           scroll={{x: "max-content"}}></Table>
                    <Modal open={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                        {editingItem && (
                            <UpdateDataAuthors initialValues={editingItem} onSave={handleSave}
                                            onCancel={() => setModalVisible(false)}
                            />
                        )}
                    </Modal>
                </Form>
            }


        </>


    );
}

export default AuthorTable;

