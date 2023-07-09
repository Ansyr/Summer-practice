import {Menu, MenuProps} from "antd";
import {
    UserOutlined,
    BookOutlined,
    PieChartOutlined,
    PlusCircleOutlined,
    TableOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Пользователь', '1', <UserOutlined />,[
        getItem("Создать", "2",<Link to={"/useradd"}><PlusCircleOutlined/></Link>),
        getItem("Таблица", "3",<Link to={"/tableuser"}><TableOutlined /></Link>)
    ]),
    getItem('Книга', '4',        <BookOutlined/>,[
            getItem("Создать", "5",<Link to={"/bookadd"}><PlusCircleOutlined/></Link>),
            getItem("Таблица", "6",<Link to={"/bookinfo"}><TableOutlined /></Link>)
        ],
    ),
    getItem('Статистика', '7',        <BookOutlined/>,[
            getItem("Продаваемые книги", "8",<Link to={"/popularbook"}><PlusCircleOutlined/></Link>),
            getItem("Таблица", "9",<Link to={"/bookinfo"}><TableOutlined /></Link>)
        ],
    )
];
const NavBar = () => {
    return (
        <Menu
            items={items}
            theme="dark"
            mode="inline">
            <Menu.Item key="1">
                <UserOutlined/>
                <span>Пользователь</span>
                <Link to={"/"}/>
            </Menu.Item>
            <Menu.Item key="2">

                <span>Книга</span>
                <Link to={"/book"}/>
            </Menu.Item>
            <Menu.Item key="3">
                <PieChartOutlined/>
                <span>Статистика</span>
                <Link to={"/statistic"}/>
            </Menu.Item>

        </Menu>
    );
};

export default NavBar;