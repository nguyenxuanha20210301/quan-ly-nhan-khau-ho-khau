import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Button, Table, Modal, Input, DatePicker, message, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import 'moment/locale/vi';
import '../../styles/TableCSS.css';
import MenuBar from "./head_foot_menu/MenuNav";
import Header from "./head_foot_menu/Header";
import Footer from "./head_foot_menu/Footer";
const Donation = () => {
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
    const url = 'http://26.212.32.34:6789/api/v1/contribution/list'; //update sau
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');
    const [params, setParams] = useState({
        pageSize: 50,
        pageNum: 1,
        dateFrom: null,
        dateTo: null,
        keyword: null,
    });
    const columns = [
        { title: 'STT', dataIndex: 'id', key: 'index', render: (_text, _record, index) => index + 1, },
        { title: 'Tên loại đóng góp', dataIndex: 'name', key: 'name' },
        { title: 'Ngày bắt đầu', dataIndex: 'startDate', key: 'startDate', sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate) },
        { title: 'Ngày kết thúc', dataIndex: 'endDate', key: 'endDate', sorter: (a, b) => new Date(b.startDate) - new Date(a.startDate) },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: '5',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => editRecord(record)} />
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa?"
                            onConfirm={() => deleteRecord(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{ color: 'red', marginLeft: '12px' }} />
                        </Popconfirm>
                    </>
                );
            },
        }
    ];
    //edit record
    const [isEditRecordVisible, setEditRecordVisible] = useState(false);
    const editRecord = async (record) => {
        setNewRecord(record);
        setEditRecordVisible(true);
    }
    const edittedRecord = async () => {
        try {
            await axios.put('http://26.212.32.34:6789/api/v1/contribution/update', {
                id: newRecord.id,
                name: newRecord.name,
                startDate: newRecord.startDate,
                endDate: newRecord.endDate,
                description: newRecord.description,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: 5000
            });
            fetchData();
            setEditRecordVisible(false);
        } catch (error) {
            message.error("Please try again to edit!")
        }
    };

    //delete Record
    const deleteRecord = async (record) => {
        try {
            // console.log(record.id);
            await axios.delete('http://26.212.32.34:6789/api/v1/contribution', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                data: {
                    id_list: [record.id]
                },
                timeout: 5000
            });
            fetchData();
        } catch (error) {
            message.error("Failed to delete!");
        }

    }
    //get data
    const [data, setData] = useState([]);
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
            // console.log(response);
            setData(response.data.data_list);
        } catch (error) {
            message.error("Failed get data!")
        }
    };
    //add new record
    const [newRecord, setNewRecord] = useState({
        id: null,
        name: null,
        startDate: null,
        endDate: null,
        description: null,
    });
    const [isAddNewModalVisible, setAddNewModalVisible] = useState(false);
    const showNewModal = () => {
        setAddNewModalVisible(true);
        setNewRecord({
            id: null,
            name: null,
            startDate: null,
            endDate: null,
            description: null,
        })
    };
    const addNewRecord = async () => {
        // da co newRecord
        //cap nhat co so du lieu 
        try {
            await axios.post('http://26.212.32.34:6789/api/v1/contribution/create', {
                id: newRecord.id,
                name: newRecord.name,
                startDate: newRecord.startDate,
                endDate: newRecord.endDate,
                description: newRecord.description
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: 5000
            });
            fetchData();
            setAddNewModalVisible(false);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled');
            } else {
                message.error("Failed to get data!");
            }
        }
    };
    //delete record

    return (
        <div className="content">
            <h1>Danh sách đóng góp</h1>
            <br />
            <div style={{ marginLeft: '40px' }}>
                <Space>
                    <label><i>Tìm kiếm theo:</i></label>

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '180px' }}>

                        <Input placeholder="keyword" style={{ width: '160px' }} onChange={(e) => { setParams((prev) => ({ ...prev, keyword: e.target.value })) }} />

                    </div>
                </Space>
            </div>
            <br></br>
            <div style={{ textAlign: 'right', marginRight: '20px' }}>
                <Space>
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
                    <Button onClick={() => showNewModal()} type="primary">Add new record</Button>
                </Space>
                <Modal
                    title="Thêm bản ghi"
                    open={isAddNewModalVisible}
                    onCancel={() => setAddNewModalVisible(false)}
                    onOk={addNewRecord}
                >
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ten loai dong gop:</label>
                        <Input
                            allowClear
                            value={newRecord.name}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ngay bat dau:</label>
                        <DatePicker
                            value={newRecord.startDate ? moment(newRecord.startDate, 'YYYY-MM-DD') : null}
                            format={'YYYY-MM-DD'}
                            onChange={(date, dateString) => {
                                setNewRecord((prev) => ({ ...prev, startDate: dateString }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ngay ket thuc:</label>
                        <DatePicker
                            value={newRecord.endDate ? moment(newRecord.endDate, 'YYYY-MM-DD') : null}
                            format={'YYYY-MM-DD'}
                            onChange={(date, dateString) => {
                                setNewRecord((prev) => ({ ...prev, endDate: dateString }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Mo ta:</label>
                        <Input
                            allowClear
                            value={newRecord.description}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    description: e.target.value
                                }))
                            }}
                        />
                    </div>
                </Modal>
            </div>
            <div>
                <Modal
                    title="Sửa bản ghi"
                    open={isEditRecordVisible}
                    onCancel={() => setEditRecordVisible(false)}
                    onOk={edittedRecord}
                >
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ten loai dong gop:</label>
                        <Input
                            allowClear
                            value={newRecord.name}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ngay bat dau:</label>
                        <DatePicker
                            value={newRecord.startDate ? moment(newRecord.startDate, 'YYYY-MM-DD') : null}
                            format={'YYYY-MM-DD'}
                            onChange={(date, dateString) => {
                                setNewRecord((prev) => ({ ...prev, startDate: dateString }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ngay ket thuc:</label>
                        <DatePicker
                            value={newRecord.endDate ? moment(newRecord.endDate, 'YYYY-MM-DD') : null}
                            format={'YYYY-MM-DD'}
                            onChange={(date, dateString) => {
                                setNewRecord((prev) => ({ ...prev, endDate: dateString }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Mo ta:</label>
                        <Input
                            allowClear
                            value={newRecord.description}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    description: e.target.value
                                }))
                            }}
                        />
                    </div>
                </Modal>
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
        </div>
    );
};
export default Donation;

