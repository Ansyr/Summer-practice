import BookForm from "./components/book-form";
import {Typography} from "antd";




const BookCreatePage = () => {


    return (
        <>
            <Typography.Title level={2}>Добавить книгу</Typography.Title>
            <BookForm/>

        </>

    );
};

export default BookCreatePage;