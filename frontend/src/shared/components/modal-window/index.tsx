import {Modal} from "antd";

interface ModalWindowProps {
    open: boolean,
    title: string,
    onCancel: () => void
    children: React.ReactNode;
}

const ModalWindow = (props: ModalWindowProps) => {
    const {open,title,children,onCancel} = props
    return (
        <Modal
            title={title}
            centered
            open={open}
            onCancel={onCancel}
            maskStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.2)"
            }}
        >
            {children}
        </Modal>
    );
};

export default ModalWindow;