import {useState} from 'react';
import {Alert, Button, Form, Input, message, Modal, Popconfirm, Table} from "antd";
import {DeleteFilled, EditOutlined} from "@ant-design/icons";
import {User} from "../../model/type.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import UpdateDataUser from "../update-data-user";
import {useDeleteUserMutation, useUpdateUserMutation} from "../../../../modules/user/api/api.ts";
import {UserApi} from "../../../../modules/user/api/type.ts";

interface UserTableProps {
    data: User[],
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | string,
    refetch: () => void;

}

const UserTable = ({isLoading, data, error,refetch}: UserTableProps) => {

    const [searchText, setSearchText] = useState('')
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [update] = useUpdateUserMutation()

    const [remove] = useDeleteUserMutation()
    const handleDelete = (id: UserApi) => {
        remove(id)
        refetch()
    };
    const handleEdit = (item: any) => {
        setEditingItem(item);
        setModalVisible(true);
    };

    const handleSave = async (values: UserApi) => {
        try {
            console.log(values)
            // Call the update mutation from the API hook
            await update({...values});
            message.success("User added successfully");
            form.resetFields();
            setModalVisible(false);
            refetch()

        } catch (error) {
            // Handle any error that occurred during the update
            console.log("Update error:", error);
            message.error("Failed to add author");
        }
    }


    const columns: any = [
        {
            title: "Имя",
            key: ["first_name"],
            dataIndex: ["first_name"],
            filteredValue: [searchText],
            onFilter: (value: string, obj: User) => {
                return (
                    String(obj.first_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.last_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.sur_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.user_info.birth_date).includes(value) ||
                    String(obj.phone_number).includes(value) ||
                    String(obj.user_info.degree_education).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.user_info.location.region).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.user_info.location.city).toLowerCase().includes(value.toLowerCase()) ||
                    String(obj.user_info.location.house_num).includes(value) ||
                    obj.books.some((book: any) =>
                        String(book.book_name).toLowerCase().includes(value.toLowerCase())
                    )
                );
            },
            responsive: ['lg'],
            sorter: (val1: UserApi, val2: UserApi) => {
                return val1.first_name <= val2.first_name
            }
        },
        {
            title: "Фамилия",
            key: ["last_name"],
            dataIndex: ["last_name"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.last_name > val2.last_name
            }
        }, {
            title: "Отчество",
            dataIndex: ["sur_name"],
            key: ["author", "sur_name"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.sur_name > val2.sur_name
            }

        }, {
            title: "Дата рождения",
            dataIndex: ["user_info", "birth_date"],
            key: ["birth_date"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return new Date(val1.user_info.birth_date) - new Date(val2.user_info.birth_date);
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
            title: "Номер телефона",
            dataIndex: ["phone_number"],
            key: ["phone_number"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.phone_number > val2.phone_number
            },
        },
        {
            title: "Образование",
            dataIndex: ["user_info", "degree_education"],
            key: ["education"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.user_info.degree_education > val2.user_info.degree_education
            },
        },
        {
            title: "Область",
            dataIndex: ["user_info", "location", "region"],
            key: ["region"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.user_info.location.region > val2.user_info.location.region
            },
        },
        {
            title: "Город",
            dataIndex: ["user_info", "location", "city"],
            key: ["city"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.user_info.location.city > val2.user_info.location.city
            },
        },
        {
            title: "Номер дома",
            dataIndex: ["user_info", "location", "house_num"],
            key: ["city"],
            filteredValue: [searchText],
            sorter: (val1: User, val2: User) => {
                return val1.user_info.location.house_num > val2.user_info.location.house_num
            },
        },
        {
            title: "Книги",
            dataIndex: "books",
            key: "books",
            filteredValue: [searchText],
            render: (books: any) => books.map((book: any) => book.book_name).join(", ")

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

                    <Table columns={columns} dataSource={data.length ? data : []} loading={isLoading} rowKey="id"
                           scroll={{x: "max-content"}}></Table>
                    <Modal open={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                        {editingItem && (
                            <UpdateDataUser initialValues={editingItem}
                                            onCancel={() => setModalVisible(false)} onSave={handleSave}
                            />
                        )}
                    </Modal>
                </Form>
            }


        </>


    );
}

export default UserTable;

