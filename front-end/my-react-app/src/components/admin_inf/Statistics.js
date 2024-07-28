import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Button, Table, Modal, Space, message } from "antd";
import MenuBar from "./head_foot_menu/MenuNav";
import { useNavigate } from "react-router-dom";
import '../../styles/TableCSS.css';
import Header from "./head_foot_menu/Header";
import Footer from "./head_foot_menu/Footer";
const Statistics = () => {
    const navigate = useNavigate();
    if(localStorage.getItem('token')===null){
        navigate('/');
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100vh'}}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'auto' }}>
                <MenuBar />
                <div style={{marginLeft:'160px'}}>

                <Content />
                </div>
            </div>
            <Footer />
        </div>
    );
};

function Content () {
    const buttonStyle = {
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
    const [displayContent, setDisplayContent] = useState(<ContentFee1/>);
    const displayContent1 = () => {
        setDisplayContent(<ContentFee1/>)
    }
    const displayContent2 = () => {
        setDisplayContent(<ContentFee2/>)
    }
    return (
        <div>
            <div style={containerStyle}>
                <Space>
                    <Button style={buttonStyle} type="primary" onClick={displayContent1}>Theo loại thu(Phí/Đóng góp)</Button>
                    <Button style={buttonStyle} type="primary" onClick={displayContent2}>Theo hộ gia đình</Button>
                </Space>
            </div>
            <div style={containerStyle}>{displayContent}</div>
        </div>
            
    );
}
//tao content function
function ContentFee2() {
    // const url = 'http://26.212.32.34:6789/api/v1/payment?pageSize=50&pageNum=4';
    const url = 'http://26.212.32.34:6789/api/v1/payment/household-payment-statistics';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
        // { title: 'ID hộ', dataIndex: 'household_id', key: 'household_id', sorter: (record1, record2) => { return record1.household_id < record2.household_id } },
        { title: 'Tên hộ gia đình', dataIndex: 'household_nm', key: 'household_nm' },
        { title: 'Tên loại thu (Phí/Đóng góp)', dataIndex: 'payment_tp_nm', key: 'payment_tp_nm' },
        { title: 'Năm (Đợt thu)', dataIndex: 'year', key: 'year' },
        { title: 'Số tiền đã thu', dataIndex: 'amount', key: 'amount' },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setData(response.data.data_list);
        } catch (error) {
            console.log(error);
        }
    }


    return (
       

        <div className="table">
            <Table
                dataSource={data}
                columns={columns}
                rowKey={'id'}
                pagination={true}
                
            />
        </div>

    );
};
// const ContentFee3 = () => {
//     const url = 'http://26.212.32.34:6789/api/v1/payment/payment-statistics';
//     const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';

//     const [data, setData] = useState([]);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const columns = [
//         { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
//         { title: 'ID', dataIndex: 'id', key: 'id', sorter: (record1, record2) => { return record1.id < record2.id } },
//         { title: 'Loại thu', dataIndex: 'payment_nm', key: 'payment_nm' },
//         { title: 'Tên loại thu (Phí/Đóng góp)', dataIndex: 'fee_nm', key: 'fee_nm' },
//         { title: 'Năm (Đợt thu)', dataIndex: 'year', key: 'year' },
//         { title: 'Số tiền đã thu', dataIndex: 'amount', key: 'amount' },
//     ];

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(url, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             console.log("Thong tin bang tong quat 1")
//             console.log(response);
//             setData(response.data.data_list);
//             console.log("Thong tin data");
//             console.log(data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const onRowClick = (record) => {
//         setSelectedItem(record);
//         console.log("selected_item");  
//         console.log(selectedItem);
//     };

//     const DetailModal = ({ visible, onCancel, data}) => {
//         const columns = [
//             { title: 'STT', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
//             { title: 'ID hộ', dataIndex: 'household_id', key: 'household_id' },
//             { title: 'Hộ gia đình', dataIndex: 'household_nm', key: 'household_nm' },
//             { title: 'Tiền nộp', dataIndex: 'total_paid', key: 'total_paid' },
//         ];
//         const [data1, setData1] = useState([]);
//         useEffect(() => {
//             fetchData1();
//         }, []);
//         const fetchData1 = async()=> {
//             try{
//                 const response = await axios.get(`http://26.212.32.34:6789/api/v1/payment/payment-household?id=${selectedItem.id}&paymentTp=${data[selectedItem.id].payment_tp}`,{
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     }, 
//                     timeout: 5000,
//                 });
//                 console.log("This response");
//                 console.log(response);
//                 setData1(response.data.data_list);
//             }catch(error){
//                 message.error("Failed get data household!");
//             }
//         };
//         return (
//             <Modal
//                 open={visible}
//                 title="Chi tiết"
//                 onCancel={onCancel}
//                 footer={null}
//             >
//                 <div style={{ textAlign: 'center', marginTop: '16px' }}>
//                     <p><strong>Tổng số hộ đóng:</strong> {data1.total}</p>
//                     <p><strong>Tổng số tiền:</strong> {data1.total_paid}</p>
//                 </div>
//                 <Table
//                     dataSource={data1}
//                     columns={columns}
//                     rowKey={'id'} // Adjust the key based on your data structure
//                     pagination={false}
//                 />
//             </Modal>
//         );
//     };

//     return (
//         <div className="table">
//             {/* Table with row click */}
//             <Table
//                 dataSource={data}
//                 columns={columns}
//                 rowKey={'id'}
//                 pagination={true}
//                 onRow={(record) => ({
//                     onClick: () => onRowClick(record),
//                 })}
//             />

//             {/* Detail Modal */}
//             {selectedItem && (
//                 <DetailModal
//                     visible={!!selectedItem}
//                     onCancel={() => {
//                         setSelectedItem(null);
//                     }}
//                     data={data}
//                 />
//             )}
//         </div>
//     );
// };
const ContentFee1 = () => {
    const url = 'http://26.212.32.34:6789/api/v1/payment/payment-statistics';
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (text, record, index) => index + 1, },
        // { title: 'ID', dataIndex: 'id', key: 'id', sorter: (record1, record2) => { return record1.id < record2.id } },
        { title: 'Loại thu', dataIndex: 'payment_nm', key: 'payment_nm' },
        { title: 'Tên loại thu (Phí/Đóng góp)', dataIndex: 'fee_nm', key: 'fee_nm' },
        { title: 'Năm (Đợt thu)', dataIndex: 'year', key: 'year' },
        { title: 'Số tiền đã thu', dataIndex: 'amount', key: 'amount' },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("Thong tin bang tong quat 1")
            console.log(response);
            setData(response.data.data_list);
            console.log("Thong tin data");
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        console.log('selected_item:', selectedItem);
      }, [selectedItem]); // Lưu ý đối số thứ 2 là một mảng chứa các dependency
    const onRowClick = (record) => {
        console.log("record selected");
        console.log(record);
        // console.log('record.id');
        // console.log(record.id);
        // console.log("selected_item");  
        setSelectedItem(record);
        // console.log(selectedItem);
    };

    const DetailModal = ({ visible, onCancel}) => {
        const columns = [
            { title: 'STT', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
            { title: 'ID hộ', dataIndex: 'household_id', key: 'household_id' },
            { title: 'Hộ gia đình', dataIndex: 'household_nm', key: 'household_nm' },
            { title: 'Tiền nộp', dataIndex: 'total_paid', key: 'total_paid' },
        ];
        const [data1, setData1] = useState([]);

        useEffect(() => {
            fetchData1();
        }, []);
        const fetchData1 = async()=> {
            try{
                console.log("selectedItem ID:", selectedItem.id);
                console.log("data select", selectedItem.payment_tp);
                const response = await axios.get(`http://26.212.32.34:6789/api/v1/payment/payment-household?id=${selectedItem.id}&paymentTp=${selectedItem.payment_tp}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }, 
                    
                    timeout: 5000,
                });
                console.log("This response");
                console.log(response);
                setData1(response.data);
                
            }catch(error){
                message.error("Failed get data household!");
            }
        };
        return (
            <Modal
                open={visible}
                title="Chi tiết"
                onOk={onCancel}
                onCancel={onCancel}
                // footer={null}
            >
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <p><strong>Tổng số hộ đóng:</strong> {data1.total}</p>
                    <p><strong>Tổng số tiền:</strong> {data1.total_paid}</p>
                </div>
                <Table
                    dataSource={data1.data_list}
                    columns={columns}
                    rowKey={'id'} // Adjust the key based on your data structure
                    pagination={false}
                />
            </Modal>
        );
    };

    return (
        <div className="table">
            {/* Table with row click */}
            <Table
                dataSource={data}
                columns={columns}
                rowKey={'id'}
                pagination={true}
                onRow={(record) => ({
                    onClick: () => onRowClick(record),
                })}
            />

            {/* Detail Modal */}
            {selectedItem &&
                <DetailModal
                    visible={!!selectedItem}
                    onCancel={() => {
                        setSelectedItem(null);
                    }}
                    // data={data}
                />
            }
        </div>
    );
};
export default Statistics;

