import BookForm from "./components/book-form";
import {Typography} from "antd";
import {useFetchAuthorQuery} from "../create-author/model/api.ts";



const BookCreatePage = () => {


    return (
        <>
            <Typography.Title level={2}>Добавить книгу</Typography.Title>
            <BookForm/>

        </>

    );
};

export default BookCreatePage;