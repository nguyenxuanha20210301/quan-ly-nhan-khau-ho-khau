import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Button, Table, Modal, Input, message, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import 'moment/locale/vi';
import '../../styles/TableCSS.css';
import MenuBar from "./head_foot_menu/MenuNav";
import Header from "./head_foot_menu/Header";
import Footer from "./head_foot_menu/Footer";
const Fee = () => {
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
    const url = 'http://26.212.32.34:6789/api/v1/fee?pageSize=50&pageNum=3';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');
    const [params, setParams] = useState({
        keyword: null,
        year: null,
        pageSize: 6,
        pageNum: 5,
    })
    const columns = [
        {
            title: 'STT', dataIndex: 'id', render: (text, record, index) => index + 1,
            sorter: (record1, record2) => { return record1.id > record2.id }
        },
        {
            title: 'Tên Đóng Góp', dataIndex: 'fee_nm', key: 'fee_nm',
            sorter: (a, b) => {
                const lastNameA = getLastName(a.fee_nm);
                const lastNameB = getLastName(b.fee_nm);
                return lastNameA.localeCompare(lastNameB);
            },
        },
        { title: 'Số Tiền', dataIndex: 'fee_amount', key: 'id', sorter: (record1, record2) => { return record1.fee_amount > record2.fee_amount } },
        { title: 'Tần Suất Hàng Năm', dataIndex: 'frequency_of_year', key: 'id', sorter: (record1, record2) => { return record1.frequency_of_year > record2.frequency_of_year } },
        { title: 'Năm', dataIndex: 'year', key: 'id', },
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
    const getLastName = (fullName) => {
        const names = fullName ? fullName.split(' ') : [];
        return names.length > 0 ? names[names.length - 1].toLowerCase() : '';
    };
    //edit record
    const [isEditRecordVisible, setEditRecordVisible] = useState(false);
    const editRecord = async (record) => {
        setNewRecord(record);
        setEditRecordVisible(true);
    }
    const edittedRecord = async () => {
        try {
            await axios.put('http://26.212.32.34:6789/api/v1/fee', {
                id: newRecord.id,
                fee_nm: newRecord.fee_nm,
                fee_amount: newRecord.fee_amount,
                frequency_of_year: newRecord.frequency_of_year,
                year: newRecord.year,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: 5000
            });
            await fetchData();
            setEditRecordVisible(false);
        } catch (error) {
            message.error("Please try again to edit!")
        }
    };

    //delete Record
    const deleteRecord = async (record) => {
        try {
            // console.log(record.id);
            await axios.delete('http://26.212.32.34:6789/api/v1/fee', {
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
        fee_nm: null,
        fee_amount: null,
        frequency_of_year: null,
        year: null,
    });
    const [isAddNewModalVisible, setAddNewModalVisible] = useState(false);
    const showNewModal = () => {
        setAddNewModalVisible(true);
        setNewRecord({
            id: null,
            fee_nm: null,
            fee_amount: null,
            frequency_of_year: null,
            year: null,
        })
    };
    const addNewRecord = async () => {
        // da co newRecord
        //cap nhat co so du lieu 
        try {
            await axios.post('http://26.212.32.34:6789/api/v1/fee', {
                fee_nm: newRecord.fee_nm,
                fee_amount: newRecord.fee_amount,
                frequency_of_year: newRecord.frequency_of_year,
                year: newRecord.year,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: 5000
            });
            await fetchData();
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
            <h1>Danh sách thu phí</h1>
            <br />
            <div style={{ marginLeft: '40px' }}>
                <Space>
                    <label><i>Tìm kiếm theo:</i></label>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '100px', marginLeft:'120px' }}>
                        <Space>
                            {/* <label style={{ marginRight: '8px' }}>Key Word:</label> */}
                            <Input 
                                style={{ width: '120px' }} 
                                onChange={(e) => { setParams((prev) => ({ ...prev, keyword: e.target.value })) }}
                                placeholder="keyword"    
                            />
                        </Space>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                        <Space>
                            {/* <label style={{ marginRight: '20px' }}>Năm:</label> */}
                            <Input  placeholder="year" style={{ width: '80px' }} onChange={(e) => { setParams((prev) => ({ ...prev, year: e.target.value })) }} />
                        </Space>
                    </div>
                </Space>
            </div>
            <div style={{ textAlign: 'right', marginRight: '20px' }}>

                <Button onClick={() => showNewModal()} type="primary">Add new record</Button>
                <Modal
                    title="Thêm bản ghi"
                    open={isAddNewModalVisible}
                    onCancel={() => setAddNewModalVisible(false)}
                    onOk={addNewRecord}
                >
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ten loai phi:</label>
                        <Input
                            allowClear
                            value={newRecord.fee_nm}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    fee_nm: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>So tien:</label>
                        <Input
                            allowClear
                            value={newRecord.fee_amount}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    fee_amount: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Tan suat / nam:</label>
                        <Input
                            allowClear
                            value={newRecord.frequency_of_year}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    frequency_of_year: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>nam:</label>
                        <Input
                            allowClear
                            value={newRecord.year}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    year: e.target.value
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
                        <label>Ten loai phi:</label>
                        <Input
                            allowClear
                            value={newRecord.fee_nm}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    fee_nm: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>So tien:</label>
                        <Input
                            allowClear
                            value={newRecord.fee_amount}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    fee_amount: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Tan suat / nam:</label>
                        <Input
                            allowClear
                            value={newRecord.frequency_of_year}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    frequency_of_year: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>nam:</label>
                        <Input
                            allowClear
                            value={newRecord.year}
                            onChange={(e) => {
                                setNewRecord((prev) => ({
                                    ...prev,
                                    year: e.target.value
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
export default Fee;