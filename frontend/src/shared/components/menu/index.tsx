import {Menu} from "antd";
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";

const NavBar = () => {
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: '1',
                    icon: <UserOutlined />,
                    label: 'User',
                },
                {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: 'nav 2',
                },
                {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: 'nav 3',
                },
            ]}
        />
    );
};

export default NavBar;