import { Input } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import {ChangeEvent} from "react";

interface PhoneNumberInputProps{
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string
}
const PhoneNumberInput = ({onChange,value} : PhoneNumberInputProps) => {
    return (
            <Input.Group style={{ display: 'flex' }}>
                <Input
                    style={{ width: '25%', textAlign: 'center' }}
                    defaultValue="+7"
                    disabled
                />
                <Input
                    style={{ width: '75%' }}
                    placeholder="Enter phone number"
                    addonBefore={<PhoneOutlined />}
                    onChange={onChange}
                    value={value}
                />
            </Input.Group>
    );
};

export default PhoneNumberInput;