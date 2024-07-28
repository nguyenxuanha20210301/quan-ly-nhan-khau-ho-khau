import Input from "antd/es/input/Input";
import Form from "antd/es/form/Form";
import { useState } from "react";
import { Button, Radio, message, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./head_foot_menu/Header";
import MenuBar from "./head_foot_menu/MenuNav";
import Footer from "./head_foot_menu/Footer";
// import Form from "antd";
const CreateNewAccount = () => {
    const navigate = useNavigate();
    if(localStorage.getItem('token')===null){
        navigate('/');
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100vh' }}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'auto' }}>
                <MenuBar />
                <Content />
            </div>
            <Footer />
        </div>
    );
};
const Content = () => {
    // const url = 'http://26.212.32.34:6789/api/v1/info/account';
    const token = localStorage.getItem('token');
    const [isAdminAcc, setIsAdminAcc] = useState(false);
    // const [newAccount, setNewAccount] = useState({
    //     "user_nm": null,
    //     "user_pw": null,
    //     "cf_pw": null,
    //     "user_tp": 0,
    //     "household_id": 0,
    // });
    const rules = {
        username: [
            {
                required: true,
                message: 'Please enter your username!'
            },
        ],
        password: [
            {
                required: true,
                message: 'Please enter your password!'
            },
        ],
        cf_password: [
            {
                required: true,
                message: 'Please confirm your password!'
            }
        ],
        user_tp: [
            {
                required: true,
                message: 'Select a option!'
            }
        ],
    };
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            console.log("values:", values);
            console.log("token: ", token);
            const response = await axios.post('http://26.212.32.34:6789/api/v1/info/account', {
                "user_nm": values.user_nm,
                "user_pw": values.user_pw,
                "cf_pw": values.cf_pw,
                "user_tp": values.user_tp,
                "household_id": values.household_id,
            }, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            console.log("response", response);
            message.success("Tạo tài khoản thành công!");
        } catch (error) {
            message.error("Tạo tài khoản không thành công");
        }
    };
    const handleReset = () => {
        form.resetFields();
    };
    return (
        <div style={{ width: '200px', height: '200px', marginLeft: '170px', marginTop: '40px' }}>
            <Form
                form={form}
                className='loginForm'
                onFinish={onFinish}
            >
                <h1>Tạo tài khoản</h1>
                <Form.Item
                    label="Username" name="user_nm"
                    rules={rules.username}
                >
                    <Input
                        placeholder="Enter your username"
                        allowClear
                        maxLength={30}
                    />
                </Form.Item>
                <Form.Item label="Password" name="user_pw" rules={rules.password}>
                    <Input.Password placeholder='Enter your password' />
                </Form.Item>
                <Form.Item label="Confirm password" name="cf_pw" rules={rules.cf_password}>
                    <Input.Password placeholder='Confirm your password' />
                </Form.Item>
                <Form.Item
                    label="Loại tài khoản" name="user_tp"
                    rules={rules.user_tp}
                >
                    <Radio.Group onChange={(e) => {
                        if (e.target.value === 1) setIsAdminAcc(true);
                        else setIsAdminAcc(false);
                    }}>
                        <Radio value={1}> Admin </Radio>
                        <Radio value={0}> User </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="ID chủ hộ" name="household_id">
                    <Input placeholder='Enter your household_id' disabled={isAdminAcc} />
                </Form.Item>
                <Form.Item>
                    <Space>
                    <Button style={{ marginLeft:'10px' }} onClick={() => handleReset()} icon={<ReloadOutlined />}>
                            Làm mới
                        </Button>
                    <Button style={{marginLeft:'10px'}} type='primary' htmlType='submit' block>Tạo tài khoản</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateNewAccount;