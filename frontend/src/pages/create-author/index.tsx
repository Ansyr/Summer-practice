import { Typography} from "antd";
import AuthorForm from "./components/author-form";

const CreateAuthor = () => {


    return (
        <>
            <Typography.Title level={2}>Добавить автора</Typography.Title>
            <AuthorForm></AuthorForm>

        </>

    );
};

export default CreateAuthor;