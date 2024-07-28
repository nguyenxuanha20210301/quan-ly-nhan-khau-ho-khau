import React from 'react';
import { Form, Input, Button, message} from 'antd';
import axios from 'axios';
// import FormItem from 'antd/es/form/FormItemInput';
// import './App.css';
import '../styles/AdminLog.css'
import { useNavigate } from 'react-router-dom';
const AdminLog = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    // const onFinish = () => {
    //     if(form.getFieldValue('code') === "20210301" || "20200819" || "20225353" || "20194316"){
    //         navigate('/admin_inf');
    //     } else {
    //         // console.log("Log in failed");
    //         message.error("Please try again!");
    //     }
    // }
    const url = 'http://26.212.32.34:6789/api/v1/auth/login'
    const onFinish = async(values) => {
        try{
            console.log(values.code);
            const response = await axios.post(url, {
                username: values.username,
                user_pw: values.password,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                },
            });
            console.log("response: ", response);
            localStorage.setItem('token', response.data.data.token);
            if((localStorage.getItem('token') !== null) && (response.data.data.user_tp === 1) && (values.code === "20210301" || "20200819" || "20225353" || "20194316")){
                navigate('/admin_inf')
            } else {
                message.error("Thông tin đăng nhập không chính xác!");
            } 
        }catch(error){
            message.error("Login ADMIN failed!");
        }
    }
    const rules = {
        username: [
            {
                required: true, 
                message: 'Please enter your username!'
            },
        ], 
        password: [
            {
                required:true,
                message: 'Please enter your password!'
            },
        ],

    };
  return (
  
    <div className='appBg'>
        
        <div style={{ textAlign: 'center', marginRight:'20px', width:'400px'}}>
  <h1>Hệ thống quản lý nhân khẩu hộ khẩu và thu phí đóng góp</h1>
</div>
        <Form 
            className='loginForm'
            onFinish={onFinish}
            form={form}
        >
            <h1>ADMIN</h1>
            <Form.Item label="Username" name="username" rules={rules.username}>
                <Input 
                    placeholder="Enter your username"
                    allowClear
                    maxLength={30}    
                />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules.password}>
                <Input.Password placeholder='Enter your password'/>
            </Form.Item>
            <Form.Item label="Code" name="code">
                <Input.Password  placeholder='code' maxLength={10} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>Log In</Button>
            </Form.Item>
        </Form>
    </div>
 
  );
};
export default AdminLog;