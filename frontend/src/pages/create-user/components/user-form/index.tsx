import {
    Button,
    Form,
    Input,
} from 'antd';
import DateFormat from "../../../../shared/components/date-format";
import FormField from "../../../../shared/components/form-field";
import {ChangeEvent} from "react";

interface DataFrom{
        lastname: string,
        firstname: string,
        surname: string,
        birthDate: string
}

interface UserFormProps{
    data: DataFrom
    onChange: (data: DataFrom) => void
    onSubmit?: () => void
}

const UserForm = (props : UserFormProps) => {
    const { data, onChange, onSubmit} = props;
    const onChangeField = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...data, [name]: e.currentTarget.value});
    };

    console.log(data)
    return (
        <>


            <Form
                onSubmitCapture={onSubmit}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
            >




                <FormField label={"Фамилия"} value={data.lastname} onChangeField={onChangeField("lastname")}/>

                <FormField label={"Имя"} value={data.firstname} onChangeField={onChangeField("firstname")}/>

                <FormField label={"Отчество"} value={data.surname} onChangeField={onChangeField("surname")}/>


                <Form.Item label="Номер">
                    <Input
                        placeholder="+_ (___) ___-____"
                        autoComplete="on"
                    />
                </Form.Item>






                {/*<Form.Item label="Select">*/}
                {/*    <Select>*/}
                {/*        <Select.Option value="demo">Demo</Select.Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="TreeSelect">*/}
                {/*    <TreeSelect*/}
                {/*        treeData={[*/}
                {/*            {title: 'Light', value: 'light', children: [{title: 'Bamboo', value: 'bamboo'}]},*/}
                {/*        ]}*/}
                {/*    />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Cascader">*/}
                {/*    <Cascader*/}
                {/*        options={[*/}
                {/*            {*/}
                {/*                value: 'zhejiang',*/}
                {/*                label: 'Zhejiang',*/}
                {/*                children: [*/}
                {/*                    {*/}
                {/*                        value: 'hangzhou',*/}
                {/*                        label: 'Hangzhou',*/}
                {/*                    },*/}
                {/*                ],*/}
                {/*            },*/}
                {/*        ]}*/}
                {/*    />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label="InputNumber">*/}
                {/*    <InputNumber/>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label="Switch" valuePropName="checked">*/}
                {/*    <Switch/>*/}
                {/*</Form.Item>*/}


                <DateFormat label={"Дата рождения"} value={data.birthDate}/>

                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default UserForm;