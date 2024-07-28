import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Table, message, Modal, Button, Input, Select, Space } from "antd";
import Header from "./head_foot_menu/Header";
import Footer from "./head_foot_menu/Footer";
import MenuBar from "./head_foot_menu/MenuNav";
import { DeleteOutlined, EditOutlined, ReadOutlined } from "@ant-design/icons";
// import { EditOutlined } from "@ant-design/icons";
import moment from 'moment';
import '../../styles/TableCSS.css';

const HouseholdInfo = () => {
    const navigate = useNavigate();
    if (localStorage.getItem('token') === null) {
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
    const url = 'http://26.212.32.34:6789/api/v1/household?pageSize=50&pageNum=1';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');

    const columns = [
        { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
        { title: 'ID chủ hộ', dataIndex: 'head_of_household_id', key: 'head_of_household_id' },
        { title: 'Tên chủ hộ', dataIndex: 'head_of_household_nm', key: 'head_of_household_nm', },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Note', dataIndex: 'note', key: 'note', },
        {
            title: 'Thành viên hộ',
            key: 'members',
            render: (record) => {
                return (
                    <div>
                        <Button
                            type="primary"
                            onClick={() => {
                                setSelectedItem(record);
                                setDetailModalMemberVisible(true);
                            }}> Chi tiết </Button>
                    </div>
                );
            }
        },
        {
            title: 'Actions',

            key: 'action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => editRecord(record)} />
                    </>
                );
            },
        }
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setData(response.data.data_list);
        } catch (error) {
            message.error("Failed get Data!");
        }
    }
    // detail member
    const [isDetailModalMemberVisible, setDetailModalMemberVisible] = useState(false);
    const [selectItem, setSelectedItem] = useState({});

    const [isVisibleModal, setVisibleModal] = useState(false);
    const DetailMemberModal = () => {
        const [localData, setLocalData] = useState([]);
        const [idel, setIdel] = useState(
            {
                id: 2,
                p_id: 0,
                m_id: 0,
                gender: 1,
                full_name: null,
                date_of_birth: "1999-01-01",
                hometown: "bac ninh",
                ethnicity: "dev",
                occupation: "Tài xế Taxi",
                place_of_employment: "string",
                cccd: "879658354007",
                date_of_issue: null,
                date_of_registration_for_permanent_residence: null,
                previous_place_of_permanent_residence: "Nam Định",
                household_id: null,
                relationship: null,
                relationship_nm: "cháu gái",
                status: 2,
                status_nm: null,
                head_of_household_id: 1,
                head_of_household_nm: "Nguyễn Văn A",
                action_type: 0
            }
        );
        const localColumns = [
            { title: 'STT', key: 'index', render: (_text, _record, index) => index + 1, },
            { title: 'Họ tên', dataIndex: 'full_name', key: 'full_name' },
            { title: 'Ngày sinh', dataIndex: 'date_of_birth', key: 'date_of_birth' },
            { title: 'Quan hệ với chủ hộ', dataIndex: 'relationship_nm', key: 'relationship_nm' },
            {
                title: 'Actions',
                // dataIndex: 'relationship',
                key: '5',
                render: (record) => {
                    const age = moment().diff(moment(record.date_of_birth), 'years');
                    const check = (record.relationship === 7 || age < 18) ? false : true;
                    return (
                        <div>
                            <span>

                                {check && <Button
                                    type="primary"
                                    style={{ width: '110px' }}
                                    onClick={() => handleSeparated(record)}
                                >Tách hộ</Button>}
                                <div>
                                    <EditOutlined onClick={() => {
                                        handleOnClick(record);
                                    }} />
                                </div>
                            </span>
                        </div>
                    );
                },
            }
        ];
        const handleOnClick = (record) => {
            console.log(record);
            console.log(record.id);
            setIdel((prev) => ({...prev, id: record.id}));
            console.log("IDE",idel);
            setVisibleModal(true);
        }
        //edit relationship
        // Tìm và cập nhật relationship cho resident_id cụ thể
        // const updatedResidentList = householdData.resident_list.map(resident => {
        //     if (resident.resident_id === residentId) {
        //       return {
        //         ...resident,
        //         relationship: newRelationship,
        //       };
        //     }
        //     return resident;
        //   });
        const handleEditRelationship = async () => {
            try {
                await axios.put('http://26.212.32.34:6789/api/v1/resident/update-resident', idel, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    timeout: 5000
                });
                await fetchLocalData();
                setVisibleModal(false);
                console.log("update success");
            } catch (error) {
                message.error("failed to update relationship");
            } finally {
                setVisibleModal(false);
            }
        };
        const navigate = useNavigate();
        const handleSeparated = (record) => {
            // Truyền tham số khi chuyển trang
            console.log("record", record);
            navigate('/admin_inf/separated', { state: { selectedValue: record } });
        };
        useEffect(() => {
            fetchLocalData();
        }, []);
        const fetchLocalData = async () => {
            try {
                const response = await axios.get('http://26.212.32.34:6789/api/v1/household/household', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        householdId: selectItem.id,
                    },
                    timeout: 5000,
                });
                setLocalData(response.data.data_list);
            } catch (error) {
                console.log("Get member data failed!");
            }
        }
        // fetchLocalData();
        return (
            <div>

                <Modal
                    title={`Thành viên hộ gia đình: ${selectItem.head_of_household_nm}`}
                    open={isDetailModalMemberVisible}
                    onCancel={() => {
                        // setSelectedItem(null);
                        setDetailModalMemberVisible(false);
                    }}
                    onOk={() => {
                        // setSelectedItem(null);
                        setDetailModalMemberVisible(false);
                    }}
                >

                    <Table
                        dataSource={localData}
                        columns={localColumns}
                        pagination={true}
                        rowKey="id"
                    />
                </Modal>
                <Modal
                    title="Quan hệ mới"
                    open={isVisibleModal}
                    footer={null}
                >
                    <Space>

                    <div>
                        <Select
                            defaultValue='2'
                            style={{
                                width: 100,
                            }}
                            onChange={(e) => {
                                setIdel((prev) => ({ ...prev, relationship: e }))
                            }}
                            options={[
                                {
                                    value: 2,
                                    label: 'con',
                                },
                                {
                                    value: 3,
                                    label: 'cháu trai',
                                },
                                {
                                    value: 4,
                                    label: 'cháu gái',
                                },
                                {
                                    value: 5,
                                    label: 'con trai',
                                },
                                {
                                    value: 6,
                                    label: 'con gái',
                                },
                                {
                                    value: 7,
                                    label: 'chủ hộ',
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <Button type="primary" onClick={() => handleEditRelationship()}>Xác nhận</Button>
                    </div>
                    </Space>
                </Modal>
            </div>

        );
    };

    //edit record
    const [newRecord, setNewRecord] = useState({
        id: null,
        address: null,
        note: null,
    });
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const editRecord = (record) => {
        setNewRecord(record);
        console.log("New Record select", newRecord);
        setEditModalVisible(true);
    }
    const handleEdited = async () => {
        try {
            const response = await axios.put('http://26.212.32.34:6789/api/v1/household', {
                id: newRecord.id,
                address: newRecord.address,
                note: newRecord.note,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 5000
            });
            console.log("PUT response:", response);
            await fetchData();
            message.success("Update date success!");
            // setNewRecord(null);
            setEditModalVisible(false);
        } catch (error) {
            message.error("Update address and note failed!");
        }
    }



    return (
        <div className="content">
            <h1>Thông tin hộ gia đình</h1>
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
                    title="Chane addresss and note"
                    open={isEditModalVisible}
                    onOk={handleEdited}
                    onCancel={() => {
                        setEditModalVisible(false);
                    }}
                >
                    <div>
                        <label>Address:</label>
                        <Input value={newRecord.address}
                            placeholder="addresss"
                            onChange={(e) => {
                                setNewRecord((prev) => ({ ...prev, address: e.target.value }))
                            }} />
                    </div>
                    <div>
                        <label>Note:</label>
                        <Input
                            value={newRecord.note}
                            placeholder="note"
                            onChange={(e) => { setNewRecord((prev) => ({ ...prev, note: e.target.value })) }}
                        />
                    </div>
                </Modal>
            </div>
            <div>
                <DetailMemberModal />
            </div>
        </div>
    )
};
export default HouseholdInfo;

