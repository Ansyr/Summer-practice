import TableAuthors from "./components/table-authors";

import {useDeleteAuthorMutation, useFetchAuthorQuery, useUpdateAuthorMutation} from "../create-author/model/api.ts";


const AuthorInfo = () => {
    const {data: authors,isLoading,error} = useFetchAuthorQuery([])
    const [update] = useUpdateAuthorMutation()
    const [deleteAuthor] = useDeleteAuthorMutation()
    return (
        <div>
            <TableAuthors data={authors? authors : []} error={error? error : ''} isLoading={isLoading? isLoading : false} update={update} remove={deleteAuthor} />
        </div>
    );
};

export default AuthorInfo;