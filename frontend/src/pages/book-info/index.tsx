
import BookTable from "./components/book-table";
import {useDeleteBookMutation, useFetchBookApiQuery, useUpdateBookMutation} from "../../modules/book/api/api.ts";
import {BookWithPrice} from "../../modules/book/api/type.ts";

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

    const handleUpdateFullBookInfo = (data: BookWithPrice) => {
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