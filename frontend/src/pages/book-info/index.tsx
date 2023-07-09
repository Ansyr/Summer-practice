import {
    useCreateFullBookMutation,
    useDeleteFullBookMutation,
    useFetchFullBookQuery,
    useUpdateFullBookMutation
} from "./model/api.ts";
import BookTable from "./components/book-table";

const BookInfo = () => {
    const {data: fullBookInfo, error, isLoading} = useFetchFullBookQuery([])
    const [deleteFullBookInfo] = useDeleteFullBookMutation()
    const [updateFullBookInfo] = useUpdateFullBookMutation()

    const handleDeleteFullBookInfo = (id: string) => {
        if (fullBookInfo) {
            deleteFullBookInfo(id)
        }
    }

    const handleUpdateFullBookInfo = (data) => {
        if (fullBookInfo) {
            updateFullBookInfo(data)
        }
    }

    return (
        <div>
            <BookTable isLoading={isLoading} error={error ? error : ''} data={fullBookInfo ? fullBookInfo : []}
                       remove={handleDeleteFullBookInfo} update={handleUpdateFullBookInfo}/>

        </div>
    );
};

export default BookInfo;