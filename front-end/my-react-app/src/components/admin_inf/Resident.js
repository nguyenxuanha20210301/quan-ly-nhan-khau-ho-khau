import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Button, Table, Modal, Input, message, DatePicker, Space, Select } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import moment from 'moment'; // Import moment library
import 'moment/locale/vi'; // Import Vietnamese locale
import '../../styles/TableCSS.css';
import MenuBar from "./head_foot_menu/MenuNav";
import Header from "./head_foot_menu/Header";
import Footer from "./head_foot_menu/Footer";
const Resident = () => {
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
    // const url = 'http://26.212.32.34:6789/api/v1/resident/statistics';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');

    moment.locale('vi');
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (_text, _record, index) => index + 1, },
        { title: 'Họ tên', dataIndex: 'full_name', key: 'full_name', },
        { title: 'Giới tính', dataIndex: 'gender', key: 'sex', 
            render: (value) => {return (value == 1)?"Nam":"Nữ"}
        },
        { title: 'CCCD', dataIndex: 'cccd', key: 'cccd', },
        { title: 'Ngày sinh', dataIndex: 'date_of_birth', key: 'date_of_birth', },
        // { title: 'Quan hệ với chủ hộ', dataIndex: 'relationship', key: 'relationship' },
        { title: 'Nghề nghiệp', dataIndex: 'occupation', key: 'occupation', },
        { title: 'Nơi ở trước đây', dataIndex: 'previous_place_of_permanent_residence', key: 'previous_place_of_permanent_residence', },
        { title: 'Tình trạng nhân khẩu', dataIndex: 'status', key: 'status', 
            render: (value) => {
                if(value === 1)return "Tạm vắng"
                else if(value === 2)return "Tạm trú"
                else return ""
            }
        },
        {
            title: 'Actions',
            dataIndex: 'relationship',
            key: '5',
            render: (relationship, record) => {
                const age = moment().diff(moment(record.date_of_birth), 'years');
                const check = (relationship === 7 || age < 18) ?false:true;
                return (
                    <span>
                        <Space style={{marginBottom:'10px'}}>

                        <EditOutlined onClick={() => onEdit(record)}  />
                        <label onClick={() => onEdit(record)}>Sửa thông tin</label>
                        </Space>
                        {/* <DeleteOutlined style={{ color: 'red', marginLeft: '12px' }}
                            onClick={() => deleteRecord(record)
                        } /> */}
                        {check &&<Button 
                        type="primary" 
                        style={{width:'110px'}} 
                        onClick={() => handleSeparated(record)}
                        >Tách hộ</Button>}
                    </span>
                );
            },
        }
    ];
    const navigate = useNavigate();
    const handleSeparated = (record) => {
        // Truyền tham số khi chuyển trang
        console.log("record", record);
        navigate('/admin_inf/separated', { state: { selectedValue: record } });
    };
    //edit record
    const [isVisibleEditModal, setVisibleEditModal] = useState(false);
    const onEdit = (record) => {
        setNewRecord(record);
        setVisibleEditModal(true);
    }
    const completeEdit = async() => {
        try{

            await axios.put('http://26.212.32.34:6789/api/v1/resident/update-resident', newRecord, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }, 
                timeout: 5000,
            });
            fetchData();
            setVisibleEditModal(false);
        } catch(error){
            message.error("Failed edit record!");
        }

    };
    //get data
    const [data, setData] = useState([]);
    // const [params, setParams] = useState({
    //     isInHouseHold: null,
    // });
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://26.212.32.34:6789/api/v1/resident`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // params: params,
            });
            console.log(response);
            setData(response.data.data_list);
            console.log(data);
        } catch (error) {
            message.error("Failed get data!")
        }
    };
    //add new record
    const [isAddNewModalVisible, setAddNewModalVisible] = useState(false);
    const [newRecord, setNewRecord] = useState({
        id: null,
        full_name: null,
        gender: null,
        relationship: null,
        occupation: null,
        status: null,
        date_of_birth: null,
        cccd: null,
        previous_place_of_permanent_residence: null,
    });
    const showNewModal = () => {
        setNewRecord({
            id: null,
            full_name: null,
            gender: null,
            relationship: null,
            occupation: null,
            date_of_birth: null,
            cccd: null,
            previous_place_of_permanent_residence: null,
            status: null,
            household_id: null,
        })
        setAddNewModalVisible(true);
    };
    const addNewRecord = async() => {
        try{

            await axios.post('http://26.212.32.34:6789/api/v1/resident/new-resident', newRecord, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept' :'application/json'
                },
                timeout: 5000
            });
            fetchData();
            setAddNewModalVisible(false);
        } catch(error){
            message.error("Failed add record!");
        }
    };
    return (
        <div className="content">
            <h1>Thông tin dân cư</h1>
               
            <br/>
            <div style={{ textAlign: 'right', marginRight: '20px'}}>
                <Space>
                
                    <Button onClick={showNewModal}>Add new record</Button>
                </Space>
                <Modal
                    title="Thêm bản ghi"
                    open={isAddNewModalVisible}
                    onCancel={() => setAddNewModalVisible(false)}
                    onOk={addNewRecord}
                >
                    <div style={{ marginBottom: '16px' }}>
                        <label>Họ tên:</label>
                        <Input
                            allowClear
                            value={newRecord.full_name}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    full_name: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Giới tính:</label>
                        <Input
                        placeholder="1: Nam; 0: Nữ"
                            allowClear
                            value={newRecord.gender}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    gender: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>CCCD:</label>
                        <Input
                            allowClear
                            value={newRecord.cccd}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    cccd: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ngày sinh:</label>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            value={newRecord.date_of_birth ? moment(newRecord.date_of_birth) : null}
                            onChange={(_date, dateString) => {
                                setNewRecord((prev) => ({ ...prev, date_of_birth: dateString }));
                            }}
                        />

                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>ID chủ hộ:</label>
                        <Input
                            allowClear
                            value={newRecord.household_id}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    household_id: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Quan hệ với chủ hộ:</label>
                        <Input
                            allowClear
                            value={newRecord.relationship}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    relationship: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Nghề nghiệp:</label>
                        <Input
                            allowClear
                            value={newRecord.occupation}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    occupation: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Nơi ở trước đây:</label>
                        <Input
                            allowClear
                            value={newRecord.previous_place_of_permanent_residence}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    previous_place_of_permanent_residence: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Tình Trạng nhân khẩu:</label>
                        <Input
                            placeholder="1: Tạm vắng;; 2: Tạm trú"
                            allowClear
                            value={newRecord.status}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    status: e.target.value,
                                }));
                            }}
                        />
                    </div>
                </Modal>
            </div>
            <div>
            <Modal
                    title="Sua ban ghi"
                    open={isVisibleEditModal}
                    onCancel={() => setVisibleEditModal(false)}
                    onOk={completeEdit}
                >
                    <div style={{ marginBottom: '16px' }}>
                        <label>Họ tên:</label>
                        <Input
                            allowClear
                            value={newRecord.full_name}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    full_name: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Giới tính:</label>
                        <Input
                        placeholder="1: Nam, 0: Nữ"
                            allowClear
                            value={newRecord.gender}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    gender: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>CCCD:</label>
                        <Input
                            allowClear
                            value={newRecord.cccd}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    cccd: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Ngày sinh:</label>
                        <DatePicker
                            showTime
                            value={newRecord.date_of_birth ? moment(newRecord.date_of_birth, 'YYYY-MM-DD') : null}
                            format={'YYYY-MM-DD'}
                            onChange={(date, dateString) => {
                                setNewRecord((prev) => ({ ...prev, date_of_birth: dateString }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}> 
                         <label>ID chủ hộ:</label>
                        <Input
                            allowClear
                            value={newRecord.household_id}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    household_id: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}> 
                         <label>Quan hệ với chủ hộ:</label>
                        <Input
                            allowClear
                            value={newRecord.relationship}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    relationship: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Nghề nghiệp:</label>
                        <Input
                            allowClear
                            value={newRecord.occupation}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    occupation: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Nơi ở trước đây:</label>
                        <Input
                            allowClear
                            value={newRecord.previous_place_of_permanent_residence}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    previous_place_of_permanent_residence: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Tình trạng nhân khẩu:</label>
                        <Input
                            placeholder="1: Tạm vắng;; 2: Tạm trú"
                            allowClear
                            value={newRecord.status}
                            onChange={(e) => {
                                setNewRecord((prevNewRecord) => ({
                                    ...prevNewRecord,
                                    status: e.target.value,
                                }));
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
    )
};

export default Resident;


