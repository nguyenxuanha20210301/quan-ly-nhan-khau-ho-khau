import React from 'react';
import { Button, Divider, Form, Input, Space, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import FormItem from 'antd/es/form/FormItemInput';
// import AdminLog from './AdminLog';
import '../styles/UserLog.css'
const UserLog = () => {
    const url = 'http://26.212.32.34:6789/api/v1/auth/login';
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            // Gửi yêu cầu đăng nhập và nhận token từ API
            const response = await axios.post(url,{
                'username': values.username,
                'user_pw': values.password
            } ,{
                headers: {
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                },
            });
            console.log(response.data);
            console.log(response.data.data.token);
            // Lưu token vào localStorage
            localStorage.setItem('token', response.data.data.token);
    
            // Chuyển hướng đến trang người dùng sau khi đăng nhập thành công
            if(localStorage.getItem('token') !== null && response.data.data.user_tp === 0){
                navigate('/user_inf');
            } else {
                message.error("Thông tin đăng nhập không chính xác, hãy thử lại!");
            }
        } catch (error) {
            // Xử lý lỗi đăng nhập
            message.error("Thông tin đăng nhập không chính xác, hãy thử lại!");
        }
    };
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
    <div className='logInBg'>
        <Space>

         <div style={{ textAlign: 'center', marginRight:'20px', width:'400px'}}>
  <h1>Hệ thống quản lý nhân khẩu hộ khẩu và thu phí đóng góp</h1>
  {/* <h1>Xin cảm ơn tất cả các bạn đã lắng nghe!   </h1> */}
</div>
        <Form 
            className='loginForm'
            onFinish={onFinish}
        >
            <h1>Đăng nhập</h1>
            <Form.Item 
                label="Username" name="username"
                rules={rules.username}    
            >
                <Input 
                    placeholder="Enter your username"
                    allowClear
                    maxLength={30}    
                />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules.password}>
                <Input.Password placeholder='Enter your password'/>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' block>Log In</Button>
            </Form.Item>
            <Divider style={{borderColor: "blue"}}><Link to="/admin_log">Log in as admin</Link></Divider>
            {/* <Divider style={{borderColor: "blue"}}><Link to="/register">No account? Register now!</Link></Divider> */}

        </Form>
        </Space>
    </div>
  );
};
export default UserLog;