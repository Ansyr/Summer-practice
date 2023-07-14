import {useGetAllBooksQuery} from "./model/api.ts";
import UserForm from "./components/user-form";

const UserCreate = () => {
    const {data: books} = useGetAllBooksQuery([])

    return (
        <div>
            <UserForm books={books? books : []}/>
           {/*<SelectField data={books?books : []}/>*/}
        </div>
    );
};

export default UserCreate;