import TableAuthors from "./components/table-authors";

import {useFetchAuthorQuery, useUpdateAuthorMutation} from "../create-author/model/api.ts";

const AuthorInfo = () => {
    const {data: authors,isLoading,error} = useFetchAuthorQuery([])
    const [update] = useUpdateAuthorMutation()
    return (
        <div>
            <TableAuthors data={authors? authors : []} error={error? error : ''} isLoading={isLoading? isLoading : false} update={update}/>
        </div>
    );
};

export default AuthorInfo;