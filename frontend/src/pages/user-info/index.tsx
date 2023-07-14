import UserTable from "./components/user-table";
import {useFetchUserInfoQuery} from "./model/api.ts";


const UserInfo = () => {
    const {data: userInfo, error, isLoading} = useFetchUserInfoQuery([])

    console.log(userInfo)
    return (
        <div>
            <UserTable data={userInfo? userInfo : []} error={error ? error : ''} isLoading={isLoading}/>
        </div>
    );
};

export default UserInfo;