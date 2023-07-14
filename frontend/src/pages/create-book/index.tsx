import BookForm from "./components/book-form";
import {Button, Typography} from "antd";
import {useCreateFullBookMutation} from "../book-info/model/api.ts";



const BookCreatePage = () => {
    const [addBook] = useCreateFullBookMutation()


    const onSubmit = async () => {

    }

    return (
        <>
            <Typography.Title level={2}>Добавить книгу</Typography.Title>
            <BookForm onSubmit={onSubmit}/>
            <Button onClick={onSubmit}>Добавить</Button>
        </>

    );
};

export default BookCreatePage;