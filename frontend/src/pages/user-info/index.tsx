import UserTable from "./components/user-table";
import {useFetchUserInfoQuery} from "./model/api.ts";


const UserInfo = () => {
    const {data: userInfo, error, isLoading,refetch} = useFetchUserInfoQuery([])
    return (
        <div>
            <UserTable data={userInfo? userInfo : []} error={error ? error : ''} isLoading={isLoading} refetch={refetch}/>
        </div>
    );
};

export default UserInfo;