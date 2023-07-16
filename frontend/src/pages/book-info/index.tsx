
import BookTable from "./components/book-table";
import {useDeleteBookMutation, useFetchBookApiQuery, useUpdateBookMutation} from "../create-book/model/api.ts";

const BookInfo = () => {
    const {data: books, error, isLoading} = useFetchBookApiQuery([])
    const [deleteBook] = useDeleteBookMutation()
    const [updateBook] = useUpdateBookMutation()
    console.log(books)
    const handleDeleteFullBookInfo = (id: string) => {
        if (books) {
            deleteBook(id)
        }
    }

    const handleUpdateFullBookInfo = (data) => {
        if (books) {
            updateBook(data)
        }
    }

    return (
        <div>
            <BookTable isLoading={isLoading} error={error ? error : ''} data={books ? books : []}
                       remove={handleDeleteFullBookInfo} update={handleUpdateFullBookInfo}/>

        </div>
    );
};

export default BookInfo;