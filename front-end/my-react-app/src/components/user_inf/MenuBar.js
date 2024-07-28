import { Button, Space, Table, Modal, Form, Input, Upload, message, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RightOutlined, ReloadOutlined } from "@ant-design/icons";
import '../../styles/UserLog.css';

import axios from 'axios';
function MenuBar() {
    const navigate = useNavigate();
    if(localStorage.getItem('token')===null){
        navigate('/');
    }
    const buttonStyles = {
        background: 'rgba(24, 144, 255, 0.7)', // Màu nền với độ trong suốt
        borderColor: 'rgba(24, 144, 255, 0.7)', // Màu viền nút
        color: '#fff', // Màu chữ
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ
    };
    const containerStyle = {
        padding: '10px',
        background: '#f0f2f5',
        borderRadius: '8px',
    };
    const [displayContent, setDisplayContent] = useState(<UserFee />);
    const displayHome = () => {
        setDisplayContent(<Home />);
    }
    const displayUserFee = () => {
        setDisplayContent(<UserFee />);
    }
    const displayUserCollection = () => {
        setDisplayContent(<UserCollection />);
    }
    const displayUserHistory = () => {
        setDisplayContent(<UserHistory />);
    }
    const displayProfile = () => {
        setDisplayContent(<Profile />);
    }
    const handleLogOut = () => {
        localStorage.setItem('token', null);
        navigate('/');
    };
    return (
        <div>
            <div style={containerStyle}>
                <Space>
                    <Button type="primary" onClick={displayProfile} style={buttonStyles}>Hồ sơ</Button>
                    <Button type="primary" onClick={displayUserFee} style={buttonStyles}>Danh sách khoản phí</Button>
                    <Button type="primary" onClick={displayUserCollection} style={buttonStyles}>Danh sách khoản đóng góp</Button>
                    <Button type="primary" onClick={displayUserHistory} style={buttonStyles}>Lịch sử đóng</Button>
                    <Button type="primary" onClick={displayHome} style={buttonStyles}>Đổi mật khẩu</Button>
                    <Button type="primary" onClick={() => handleLogOut()} style={buttonStyles}>Log out</Button>
                </Space>
            </div>
            <div>
                {displayContent}
            </div>
        </div>
    );
};

function UserCollection() {

    const url = 'http://26.212.32.34:6789/api/v1/user-payment/contribution';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const [params, setParams] = useState({
        pageSize: 50,
        pageNum: 1,
        isUnpaid: true,
        dateFrom: null,
        dateTo: null,
        year: null,
        keyword: null,
    });
    const [data, setData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
        { title: 'Tên khoản đóng góp', dataIndex: 'id', key: 'id', },
        { title: 'Tên khoản đóng góp', dataIndex: 'name', key: 'name', },
        { title: 'Ngày bắt đầu', dataIndex: 'startDate', key: 'startDate' },
        { title: 'Ngày kết thúc', dataIndex: 'endDate', key: 'endDate' },
        {
            title: 'Đóng góp', dataIndex: 'dong_gop', key: 'dong_gop',
            render: (text, record) => (
                <Button type="primary" onClick={() => handleOpenModal(record)}>
                    Nhấn vào để đóng
                </Button>
            ),
        },
    ];
    useEffect(() => {

        console.log("Selected record:", selectedRecord);
    }, [selectedRecord]);
    const handleOpenModal = (record) => {
        setSelectedRecord(record);
        setModalVisible(true);
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    const fetchData = async () => {
        try {
            console.log(localStorage.getItem('token'));
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                params: params,
            });

            setData(response.data.data_list);
        } catch (error) {
            console.log(error);
        }
    }
    //upload file
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const handleOnFinish = async (values) => {
        try {

            const formData = new FormData();
            formData.append('attach_files', file);
            const response = await axios.post(`http://26.212.32.34:6789/api/v1/user-payment/collection?feeId=${selectedRecord.id}&amount=${values.money}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'Application/json',
                }
            });
            console.log("My response post:", response);
            message.success("Upload minh chứng thành công!");
        } catch (error) {
            message.error("Upload minh chứng không thành công!");
        } finally {
            form.resetFields();
            setModalVisible(false);
        }
    }
    return (
        <div>
            <br />
            <div style={{ marginLeft: '40px' }}>
                <Space>
                    <label><i>Tìm kiếm theo:</i></label>

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '100px' }}>

                        <Input
                            placeholder="keyword"
                            style={{ width: '160px' }}
                            onChange={(e) => { setParams((prev) => ({ ...prev, keyword: e.target.value })) }}
                        />

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                        <label style={{ marginRight: '10px' }}>isUnpaid:</label>
                        <Select
                            defaultValue='false'
                            style={{
                                width: 100,
                            }}
                            onChange={(e) => {
                                setParams((prev) => ({ ...prev, isUnpaid: e }))
                            }}
                            options={[
                                {
                                    value: true,
                                    label: 'True',
                                },
                                {
                                    value: false,
                                    label: 'False',
                                },
                            ]}
                        />
                    </div>
                </Space>
            </div>
            <br />

            <div style={{ textAlign: 'right', marginRight: '200px' }}>
                <Space>
                    <div style={{ marginRight: '40px' }}>
                        <Input
                            style={{ width: '100px' }}
                            onChange={(e) => { setParams((prev) => ({ ...prev, year: e.target.value })) }}
                            placeholder="Year"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '120px' }}>
                        <Space>
                            <label>Thời gian:</label>
                            <Input
                                style={{ width: '120px' }}
                                onChange={(e) => { setParams((prev) => ({ ...prev, dateFrom: e.target.value })) }}
                                placeholder="Từ"
                            />
                            <RightOutlined style={{ fontSize: '18px', marginLeft: '8px', marginRight: '8px', color: '#ccc' }} />
                            <Input
                                style={{ width: '120px' }}
                                onChange={(e) => { setParams((prev) => ({ ...prev, dateTo: e.target.value })) }}
                                placeholder="Đến"
                            />
                        </Space>
                    </div>

                </Space>
            </div>
            <br />
            <div className="table">
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={'id'}
                    pagination={true}

                />
            </div>
            <div>
                <Modal
                    title="Đóng góp"
                    open={modalVisible}
                    onCancel={() => { setModalVisible(false) }}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={(values) => handleOnFinish(values)}
                    >
                        <Form.Item
                            label="Khoản đóng góp"
                        >
                            {selectedRecord?.fee_nm}
                        </Form.Item>
                        <Form.Item
                            label="Nhập số tiền đóng"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền đóng phí!' }]}
                            name={"money"}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Minh chứng"
                            rules={[{ required: true, message: 'Vui lòng upload ảnh minh chứng!' }]}
                            name={"photo"}
                        >
                            <Input type="file" onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                setFile(selectedFile);
                            }} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 100 }}>
                            <Button type="primary" htmlType="submit">
                                Đóng góp
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>e
        </div>
    );
}

function UserFee() {
    const url = 'http://26.212.32.34:6789/api/v1/user-payment/fee?';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const [params, setParams] = useState({
        pageSize: 50,
        isUnpaid: true,
        dateFrom: null,
        dateTo: null,
        year: null,
        keyword: null,
    })

    const [data, setData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
        { title: 'ID', dataIndex: 'id', key: 'id', },
        { title: 'Tên khoản phí ', dataIndex: 'fee_nm', key: 'fee_nm', },
        { title: 'Số tiền phải đóng', dataIndex: 'fee_amount', key: 'fee_amount' },
        { title: 'Số tiền đã đóng', dataIndex: 'total_fee_paid', key: 'total_fee_paid' },
        { title: 'Năm', dataIndex: 'year', key: 'year' },
        {
            title: 'Đóng phí', dataIndex: 'amount_paid', key: 'amount_paid',
            render: (text, record) => (
                <Button type="primary" onClick={() => handleOpenModal(record)}>
                    Nhấn vào để đóng
                </Button>
            ),
        },
    ];
    useEffect(() => {
        console.log("Selected record:", selectedRecord);
    }, [selectedRecord]);
    const handleOpenModal = (record) => {
        console.log("record selected", record);
        setSelectedRecord(record);
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        form.resetFields();
        setModalVisible(false);
    };
    useEffect(() => {
        fetchData();
    }, [params]);

    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                params: params,
            });
            setData(response.data.data_list);
        } catch (error) {
            console.log(error);
        }
    }

    //upload minh chứng   
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('attach_files', file);
            const response = await axios.post(`http://26.212.32.34:6789/api/v1/user-payment?feeId=${selectedRecord.id}&amount=${values.money}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'Application/json',
                }
            });
            console.log("My response post:", response);
            message.success("Upload minh chứng thành công!");
        } catch (error) {
            message.error("Upload minh chứng không thành công!");
        } finally {
            handleCloseModal();
        }
    }
    return (
        <div>
            <br />
            <div style={{ marginLeft: '40px' }}>
                <Space>
                    <label><i>Tìm kiếm theo:</i></label>

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '100px' }}>

                        <Input
                            placeholder="keyword"
                            style={{ width: '160px' }}
                            onChange={(e) => { setParams((prev) => ({ ...prev, keyword: e.target.value })) }}
                        />

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                        <label style={{ marginRight: '10px' }}>Đã đóng:</label>
                        <Select
                            defaultValue='false'
                            style={{
                                width: 100,
                            }}
                            onChange={(e) => {
                                setParams((prev) => ({ ...prev, isUnpaid: e }))
                            }}
                            options={[
                                {
                                    value: true,
                                    label: 'Đúng',
                                },
                                {
                                    value: false,
                                    label: 'Sai',
                                },
                            ]}
                        />
                    </div>
                </Space>
            </div>
            <br />

            <div style={{ textAlign: 'right', marginRight: '200px' }}>
                <Space>
                    <div style={{ marginRight: '40px' }}>
                        <Input
                            style={{ width: '100px' }}
                            onChange={(e) => { setParams((prev) => ({ ...prev, year: e.target.value })) }}
                            placeholder="Year"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '120px' }}>
                        <Space>
                            <label>Thời gian:</label>
                            <Input
                                style={{ width: '120px' }}
                                onChange={(e) => { setParams((prev) => ({ ...prev, dateFrom: e.target.value })) }}
                                placeholder="Từ"
                            />
                            <RightOutlined style={{ fontSize: '18px', marginLeft: '8px', marginRight: '8px', color: '#ccc' }} />
                            <Input
                                style={{ width: '120px' }}
                                onChange={(e) => { setParams((prev) => ({ ...prev, dateTo: e.target.value })) }}
                                placeholder="Đến"
                            />
                        </Space>
                    </div>

                </Space>
            </div>
            <br />
            <div className="table">
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={'id'}
                    pagination={true}

                />
            </div>
            <div>
                <Modal
                    title="Đóng phí"
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    <Form onFinish={(values) => handleFormSubmit(values)} form={form}>
                        <Form.Item

                            label="Khoản đóng phí"
                        >
                            {selectedRecord?.fee_nm}
                        </Form.Item>
                        <Form.Item
                            label="Nhập số tiền đóng"
                            name={'money'}
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền đóng phí!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Minh chứng"
                            name={'myFile'}
                            rules={[{ required: true, message: 'Vui lòng upload ảnh minh chứng!' }]}
                        >
                            <Input type="file" onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                setFile(selectedFile);
                            }} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 100 }}>
                            <Button type="primary" htmlType="submit">
                                Đóng phí
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};
function UserHistory() {
    const url = 'http://26.212.32.34:6789/api/v1/user-payment/payment?pageSize=50&pageNum=4';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';

    const [data, setData] = useState([]);
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
        { title: 'Loại đóng', dataIndex: 'payment_tp_nm', key: 'payment_tp_nm', },
        { title: 'Tên khoản đóng', dataIndex: 'fee_nm', key: 'fee_nm', },
        { title: 'Số tiền đã đóng', dataIndex: 'amount_paid', key: 'amount_paid' },
        { title: 'Ngày đóng', dataIndex: 'date_of_payment', key: 'date_of_payment' },
        { title: 'note', dataIndex: 'status_nm', key: 'status_nm' },

    ];
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            setData(response.data.data_list);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Table
                dataSource={data}
                columns={columns}
                rowKey={'id'}
                pagination={true}

            />
        </div>
    );
} function Profile() {
    return (
        <div>
            <h1>Profile content</h1>
        </div>
    );
}
function Home() {
    const token = localStorage.getItem('token');
    const rules = {
        required: true,
        message: 'Không để trống!',
    };
    const [form] = Form.useForm();
    const handleOnFinish = async (values) => {
        try {

            console.log("value: ", values);
            const response = await axios.post('http://26.212.32.34:6789/api/v1/info/change-password', {
                old_pw: values.old_pw,
                new_pw: values.new_pw,
                confirm_pw: values.confirm_pw,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log("response:", response);
            message.success("Change password success!");
        } catch (error) {
            // message.error("Change password failed!");
            message.error("Change password failed!");

        }
    }
    return (
        <div className="logInBg">
            <Form
                form={form}
                className="loginForm"
                onFinish={handleOnFinish}
            >
                <h1 style={{ textAlign: 'center' }}>Đổi mật khẩu</h1>
                <Form.Item label="Mật khẩu cũ" rules={[rules]} name="old_pw" >
                    <Input placeholder="Old password" allowClear/>
                </Form.Item>
                <Form.Item label="Mật khẩu mới" rules={[rules]} name="new_pw" >
                    <Input placeholder="New password" allowClear/>
                </Form.Item>
                <Form.Item label="Xác nhận lại" rules={[rules]} name="confirm_pw" >
                    <Input placeholder="Confirm password" allowClear/>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Space>
                        <Button style={{ marginRight: '20px', marginLeft:'5px', width:'40px' }} onClick={() => { form.resetFields() }} icon={<ReloadOutlined />}>
                           
                        </Button>
                        <Button type="primary" htmlType="submit" style={{width:'140px'}}>
                            Xác nhận
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};


export default MenuBar;