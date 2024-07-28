import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Table, message, Space, Input, Select } from "antd";
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

// function Content() {
//     //khai bao chung 
//     const url = 'http://26.212.32.34:6789/api/v1/resident/statistics';
//     const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
//     moment.locale('vi');
//     const columns = [
//         { title: 'STT', dataIndex: 'index', render: (_text, _record, index) => index + 1, },
//         { title: 'ID', dataIndex: 'id', key: 'id', },
//         { 
//             title: 'Họ tên', 
//             dataIndex: 'full_name', 
//             key: 'full_name', 
//             sorter: (a, b) => {
//                 const lastNameA = getLastName(a.full_name);
//                 const lastNameB = getLastName(b.full_name);
//                 return lastNameA.localeCompare(lastNameB);
//             },
//         },
//         { title: 'CCCD', dataIndex: 'cccd', key: 'cccd', },
//         {
//             title: 'Tuổi',
//             dataIndex: 'date_of_birth',
//             key: 'age',
//             render: (dateOfBirth) => {
//               if (dateOfBirth) {
//                 const age = moment().diff(moment(dateOfBirth), 'years');
//                 return <span>{age}</span>;
//               }
//               return null;
//             },
//             sorter: (record1, record2) => {
//               const age1 = moment().diff(moment(record1.date_of_birth), 'years');
//               const age2 = moment().diff(moment(record2.date_of_birth), 'years');
//               return age1 - age2;
//             },
//           },
//         { title: 'Giới tính', dataIndex: 'gender', key: 'sex', 
//             render: (gender) => {
//                 return (gender === 1)?"Nam":"Nữ";
//             },
//         },
//         { title: 'Tình trạng nhân khẩu', dataIndex: 'status_nm', key: 'status_nm' },
//         // {
//         //     title: 'Actions',
//         //     key: '5',
//         //     render: (record) => {
//         //         return (
//         //             <>
//         //                 <EditOutlined onClick={onEdit(record)} />
//         //                 {/* <DeleteOutlined style={{ color: 'red', marginLeft: '12px' }}
//         //                     onClick={() => deleteRecord(record)
//         //                 } /> */}
//         //             </>
//         //         );
//         //     },
//         // }
//     ];
//     const getLastName = (fullName) => {
//         const names = fullName ? fullName.split(' ') : [];
//         return names.length > 0 ? names[names.length - 1].toLowerCase() : '';
//     };
//     //get data
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         fetchData();
//     },[]);
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(url, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             console.log(response);
//             setData(response.data.data_list);
//             console.log(data);
//         } catch (error) {
//             message.error("Failed get data!")
//         }
//     };

//     return (
//         <div className="content">
//             <h1>Dân cư</h1>
//             <br/>
//             <div>
//                 <Space>

//                 </Space>
//             </div>
//             <br />
//             <div className="table">
//                 <Table
//                     dataSource={data}
//                     columns={columns}
//                     pagination={true}
//                     rowKey="id"
//                 />

//             </div>
//         </div>
//     )
// };


//test
function Content() {
    //khai bao chung 
    const url = 'http://26.212.32.34:6789/api/v1/resident/statistics';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');
    moment.locale('vi');
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (_text, _record, index) => index + 1, },
        { title: 'ID', dataIndex: 'id', key: 'id', },
        {
            title: 'Họ tên',
            dataIndex: 'full_name',
            key: 'full_name',
            sorter: (a, b) => {
                const lastNameA = getLastName(a.full_name);
                const lastNameB = getLastName(b.full_name);
                return lastNameA.localeCompare(lastNameB);
            },
        },
        { title: 'CCCD', dataIndex: 'cccd', key: 'cccd', },
        // {
        //     title: 'Tuổi',
        //     dataIndex: 'date_of_birth',
        //     key: 'age',
        //     render: (dateOfBirth) => {
        //         if (dateOfBirth) {
        //             const age = moment().diff(moment(dateOfBirth), 'years');
        //             return <span>{age}</span>;
        //         }
        //         return null;
        //     },
        //     sorter: (record1, record2) => {
        //         const age1 = moment().diff(moment(record1.date_of_birth), 'years');
        //         const age2 = moment().diff(moment(record2.date_of_birth), 'years');
        //         return age1 - age2;
        //     },
        // },

        //tuoi voi String
        {
            title: 'Tuổi',
            dataIndex: 'date_of_birth',
            key: 'age',
            render: (dateOfBirth) => {
              if (dateOfBirth) {
                const age = moment().diff(moment(dateOfBirth), 'years').toString();
                return <span>{age}</span>;
              }
              return null;
            },
            sorter: (record1, record2) => {
              const age1 = moment().diff(moment(record1.date_of_birth), 'years').toString();
              const age2 = moment().diff(moment(record2.date_of_birth), 'years').toString();
              return age1.localeCompare(age2); // Sử dụng localeCompare để so sánh chuỗi
            },
          },
        {
            title: 'Giới tính', dataIndex: 'gender', key: 'sex',
            render: (gender) => {
                return (gender === 1) ? "Nam" : "Nữ";
            },
        },
        { title: 'Tình trạng nhân khẩu', dataIndex: 'status', key: 'status',
            render: (value) => {
                if(value === 1)return "Tạm vắng"
                else if(value == 2)return "Tạm trú"
                else return ''
            }
        },
    ];
    const getLastName = (fullName) => {
        const names = fullName ? fullName.split(' ') : [];
        return names.length > 0 ? names[names.length - 1].toLowerCase() : '';
    };
    //get data
    const [data, setData] = useState([]);
    const [params, setParams] = useState({
        age: null,
        gender: null,
        isAbsent: null,
        isTempResident: null,
    });
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
            });
            console.log(response);
            setData(response.data.data_list);
            console.log(data);
        } catch (error) {
            message.error("Failed get data!")
        }
    };
    return (
        <div className="content">
            <h1>Thống kê số liệu dân cư</h1>
            <br />
            <div style={{marginLeft:'40px'}}>
                <Space>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Space>
                            <label style={{ marginRight: '8px' }}>Giới tính:</label>
                            <Select
                                defaultValue=''
                                style={{
                                    width: 120,
                                }}
                                onChange={(value) => {
                                    setParams((prev) => ({ ...prev, gender: value }))
                                }}
                                options={[
                                    {
                                        value: '1',
                                        label: 'Nam',
                                    },
                                    {
                                        value: '0',
                                        label: 'Nữ',
                                    },
                                    {
                                        value: '',
                                        label: '--',
                                    },
                                ]}
                            />
                        </Space>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                        <Space>
                            <label style={{ marginRight: '8px' }}>Tuổi:</label>
                            {/* <Input type="number" style={{width:'80px'}} onChange={(e) => { setParams((prev) => ({ ...prev, age: e.target.value })) }} /> */}
                            <Select
                                defaultValue=''
                                style={{
                                    width: 120,
                                }}
                                onChange={(value) => {
                                    setParams((prev) => ({ ...prev, age: value }))
                                }}
                                options={[
                                    {
                                        value: 1,
                                        label: 'Mần non',
                                    },
                                    {
                                        value: 2,
                                        label: 'Mẫu giáo',
                                    },
                                    {
                                        value: 3,
                                        label: 'Cấp 1',
                                    },
                                    {
                                        value: 4,
                                        label: 'Cấp 2',
                                    },
                                    {
                                        value: 5,
                                        label: 'Cấp 3',
                                    },
                                    {
                                        value: 6,
                                        label: 'Lao động',
                                    },
                                    {
                                        value: 7,
                                        label: 'Nghỉ hưu',
                                    },
                                    {
                                        value: '',
                                        label: '--',
                                    },
                                ]}
                            />
                        </Space>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                        <Space>
                            <label style={{ marginRight: '8px' }}>Trạng thái:</label>
                            <Select
                                defaultValue=''
                                style={{
                                    width: 120,
                                }}
                                onChange={(value) => {
                                    setParams((prev) => ({ ...prev, isAbsent: value }))
                                }}
                                options={[
                                    {
                                        value: '',
                                        label: '--',
                                    },
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
                        </Space>
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
        </div>
    )
};
export default Resident;


