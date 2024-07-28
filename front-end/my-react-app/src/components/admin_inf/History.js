import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Table, Modal, Input, message, Popconfirm, Space, Image, Select, Button } from "antd";
import { CheckOutlined, CloseOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import MenuBar from "./head_foot_menu/MenuNav";
import '../../styles/TableCSS.css';
import Header from "./head_foot_menu/Header";
import Footer from "./head_foot_menu/Footer";
const History = () => {
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

function Content() {
    //khai bao chung 
    const url = 'http://26.212.32.34:6789/api/v1/payment';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');
    const prefix = 'http://26.212.32.34:6789/';
    //params
    const [params, setParams] = useState({
        pageSize: 50,
        pageNum: 10,
        keyword: null,
        dateFrom: null,
        dateTo: null,
        status: null,
    });
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
        { title: 'ID', dataIndex: 'id', key: 'id', sorter: (record1, record2) => { return record1.id < record2.id } },
        { title: 'Hộ đóng', dataIndex: 'full_name', key: 'full_name' },

        { title: 'Tên phí đóng', dataIndex: 'fee_nm', key: 'fee_nm' },
        { title: 'Loại', dataIndex: 'payment_tp_nm', key: 'payment_tp_nm' },

        { title: 'Số tiền', dataIndex: 'amount_paid', key: 'amount_paid',
        sorter: (record1, record2) => {return (record1.amount_paid > record2.amount_paid)}    
    },
        { title: 'Ngày đóng', dataIndex: 'date_of_payment', key: 'date_of_payment' },
        {
            title: 'Minh chứng', dataIndex: 'file_path', key: 'file_path',
            // render: (path) => {return <Link to={`${prefix}${path}`} target="_blank" rel="noopener noreferrer">Ảnh minh chứng</Link>}
            render: (path) => {
                return (
                    <Image
                        src={`${prefix}${path}`}
                        alt="Chưa có minh chứng"
                        preview={false} // Tắt chế độ xem trước 
                        width={200} // Đặt chiều rộng của ảnh
                        height={200} // Đặt chiều cao của ảnh
                    />
                );
            }
        },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            render: (status) => {
                return <span style={{ color: status === 1 ? 'green' : 'red' }}>
                    {status === 1 ? 'Confirm' : 'Unconfirm'}
                </span>
            }
        },
        {
            title: 'Xác nhận', dataIndex: 'status', key: 'confirm',
            render: (status, record) => {
                return (
                    <div>
                        <Space>

                            <Popconfirm
                                title="Xác nhận khoản đóng"
                                onConfirm={() => handleConfirm(record)}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <CheckOutlined style={{ color: 'green', fontSize: '24px' }} />
                            </Popconfirm>
                            <CloseOutlined style={{ color: 'red', fontSize: '24px' }} onClick={() => handleCancelConfirm1(record)} />
                        </Space>
                    </div>
                );
            },
        },
        { title: 'Lý do huỷ', dataIndex: 'reason', key: 'reason' },
    ];

    const [dataCancel, setDataCancel] = useState({});
    const handleCancelConfirm1 = (record) => {
        console.log("Nhan vao biue tuong dau x")
        setDataCancel({
            id: record.id,
            status: 0,
            reason: null,
        });
        console.log("Data Cancel", dataCancel);
        setVisibleModal(true);
    };
    const handleCancelConfirm2 = async () => {
        console.log("bat dau update data");
        console.log("Data Cancel2", dataCancel);
        const response = await axios.put('http://26.212.32.34:6789/api/v1/payment',
            {
                id: dataCancel.id,
                status: dataCancel.status,
                reason: dataCancel.reason,
            }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        console.log(response);
        console.log("Da huy xac nhan")
        await fetchData();
        setVisibleModal(false);
    };
    const handleConfirm = async (record) => {
        try {
            // console.log("handle confirm");
            await axios.put(
                'http://26.212.32.34:6789/api/v1/payment',
                {
                    id: record.id,
                    status: 1, // Chuyển đổi trạng thái ngược lại (nếu status là true, thì !status là false và ngược lại)
                    reason: null,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            );
            // console.log("handleConfirm");
            // console.log(response);
            await fetchData();
        } catch (error) {
            message.error("Failed on confirm!");
        }
    }
    //get data
    useEffect(() => {
        fetchData();
    }, [params]);
    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: params,
                timeout: 5000
            });
            console.log(response);
            // console.log(response.data);
            setData(response.data.data_list);
            // console.log(rawData);
        } catch (error) {
            // setError(error);
            message.error("Failed to get data!");
        }
    };

    const [isVisibleModal, setVisibleModal] = useState(false);
    const [data, setData] = useState([]);

    const [isVisible, setVisible] = useState(false);
    const handleOnAddNewRecord = () => {
        setVisible(true);
    }
    const handleOk = () => {
        setVisible(false);
    }
    return (
        <div className="content">
            <div>
                <Modal
                    title="Them khoan dong"
                    onOk={handleOk}
                    onCancel={handleOk}
                    open={isVisible}
                >
                    <p>
                        Hệ thống đang update, rất xin lỗi về sự bất tiện này! Vui lòng quay trở lại sau khi học kỳ 2023.1 kết thúc
                    </p>
                </Modal>
            </div>
            <h1>Lịch sử thu phí</h1>
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

                        <Select
                            defaultValue=''
                            style={{
                                width: 150,
                            }}
                            onChange={(value) => {
                                setParams((prev) => ({ ...prev, status: value }))
                            }}
                            options={[
                                {
                                    value: '1',
                                    label: 'Đã xác nhận',
                                },
                                {
                                    value: '0',
                                    label: 'Chưa xác nhận',
                                },
                                {
                                    value: '',
                                    label: '--',
                                },
                            ]}
                        />
                    </div>
                   
                </Space>
            </div>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '210px' }}>
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
                     <div style={{marginLeft:'150px'}}>
                        <Button onClick={handleOnAddNewRecord}>Add New Record</Button>
                    </div>
                </Space>
            </div>
            <br />
            <div className="table">
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={true}
                    rowKey="id"
                />

            </div>
            <div>
                <Modal
                    title="Lý do huỷ"
                    value={dataCancel.reason}
                    open={isVisibleModal}
                    okText="Xác nhận lý do"
                    onCancel={() => setVisibleModal(false)}
                    onOk={() => handleCancelConfirm2()}
                >
                    <div>
                        <Input
                            allowClear
                            placeholder="Nhập lý do huỷ vào đây"
                            value={dataCancel.reason}
                            onChange={(e) => {
                                setDataCancel((prev) => ({
                                    ...prev, reason: e.target.value
                                }))
                            }}
                        />
                    </div>
                </Modal>
            </div>

        </div>
    )
};

export default History;

