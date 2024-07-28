import React from 'react';
import { Form, Input, Button } from 'antd';
import '../styles/Register.css'
const RegistrationForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Thực hiện các thao tác cần thiết khi form được submit
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='register'>

        <Form
        name="registration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className='registerForm'
        >
            <h1>Register for user</h1>
        <Form.Item
            label="Username"
            name="username"
            rules={[
            { required: true, message: 'Please enter your username!' },
            { max: 30, message: 'Username should be at most 30 characters!' },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 6, message: 'Password should be at least 6 characters!' },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" block>
            Register
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};

export default RegistrationForm;
