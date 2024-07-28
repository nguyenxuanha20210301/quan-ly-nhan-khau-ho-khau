
import Form from "antd/es/form/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { Space, Button, Select, Input, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd";

// const { Option } = Select;
const AddHouseHold = () => {
    const navigate = useNavigate();
    if (localStorage.getItem('token') === null) {
        navigate('/');
    }
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');
    const location = useLocation();
    console.log("location.state.selectedValue", location.state.selectedValue);
    const selectedValue = location.state.selectedValue;


    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {

            const response = await axios.get('http://26.212.32.34:6789/api/v1/resident', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: 5000
            });
            console.log("get data success", response);
            setData(response.data.data_list);
        } catch (error) {
            console.log("Error get data!")
        }
    };
    const UserDataSelect = ({ userList, onSelect }) => {
        const [searchValue, setSearchValue] = useState('');
        const [options, setOptions] = useState([]);

        const handleSearch = (value) => {
            setSearchValue(value);
            // Tìm kiếm trong danh sách dữ liệu
            const filteredOptions = userList.filter(
                (user) =>
                    user.full_name.toLowerCase().includes(value.toLowerCase()) ||
                    user.cccd.includes(value)
            );
            // Chuyển đổi dữ liệu tìm kiếm thành định dạng options của Select
            const selectOptions = filteredOptions.map((user) => ({
                label: `${user.id} - ${user.full_name} - ${user.date_of_birth} - CCCD: ${user.cccd}`,
                value: user.id,
            }));
            setOptions(selectOptions);
        };

        return (
            <Select
                showSearch
                value={searchValue}
                placeholder="Select a user"
                style={{ width: 300 }}
                defaultActiveFirstOption={false}

                filterOption={false}
                onSearch={handleSearch}
                onChange={(value) => onSelect(value)}
                notFoundContent={null}
                options={options}
                labelInValue
            />
        );
    };
    const handleUserSelect = (index, value) => {
        // Use setFieldsValue to dynamically update the form fields
        form.setFieldsValue({
            users: form.getFieldValue('users').map((user, i) =>
                i === index ? { ...user, id: value } : user
            ),
        });
    };
    const handleRelationshipChange = (index, e) => {
        form.setFieldsValue({
            users: form.getFieldValue('users').map((user, i) =>
                i === index ? { ...user, relationship: e } : user
            ),
        });
    };
    const handleOnChangeAddress = (e) => {
        const newAddress = e.target.value;
        form.setFieldsValue({
            address: newAddress,
        })
    };
    const handleOnChangeNote = (e) => {
        const newNote = e.target.value;
        form.setFieldsValue({
            note: newNote,
        })
    }
    const [residentList, setResidentList] = useState([]);
    useEffect(() => {
        console.log("residentList: ", residentList);
    }, [residentList]);
    const onFinish = async (values) => {
        try {
            console.log("values: ", values);
            const newValues = values.users;
            console.log(newValues);
            const updatedList = [];
            newValues.forEach((index) => {
                updatedList.push({ resident_id: index.id.value, relationship: index.relationship });
            });
            setResidentList((prev) => [...prev, ...updatedList]);
            console.log("residentList: ", residentList);
            const response = await axios.post('http://26.212.32.34:6789/api/v1/household', {
                head_of_household_id: selectedValue.id,
                address: values.address,
                note: values.note,
                resident_list: residentList,
                // resident_list: [residentList.map((value) => )]
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 5000
            });
            console.log("response", response);

            // Hiển thị thông báo thành công
            message.success('Tách hộ thành công! Hệ thống sẽ trả bạn về trang trước trong 3s...');

            // Chờ 3 giây trước khi chuyển hướng
            const timeoutId = setTimeout(() => {
                // Chuyển hướng đến trang trước
                navigate(-1);
            }, 3000);

            // Cleanup: Clear timeout nếu component unmounted
            return () => clearTimeout(timeoutId);

        } catch (error) {
            console.log("Add household failed")
        }
    }
    return (
        <Card>
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '30px' }}>Màn hình tách hộ</h1>
                    <br />
                </div>
                <div>
                    <Space>
                        <label><strong><i>Chủ hộ mới:  </i></strong>   </label>
                        <p><strong>{selectedValue.full_name}</strong></p>
                        <p> - </p>
                        <p><i>CCCD:</i> <strong>{selectedValue.cccd}</strong></p>
                        <p> - </p>
                        <p><i>Ngày sinh:</i> <strong>{selectedValue.date_of_birth}</strong></p>
                    </Space>
                </div>
                <div>

                    <Form form={form} name="dynamic_list_form" onFinish={onFinish}>
                        <Form.Item
                            label={<strong><i>Địa chỉ</i></strong>} name={'address'}
                        >
                            <Input placeholder="Fill new address" style={{ width: '604px' }} onChange={(e) => handleOnChangeAddress(e)} />
                        </Form.Item>
                        <Form.Item
                            label={<strong><i>Note</i></strong>} name={'note'}
                        >
                            <Input style={{ width: '614px' }} onChange={(e) => handleOnChangeNote(e)} placeholder="Fill your phone number" />
                        </Form.Item>
                        <Form.List name="users">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (

                                        <Form.Item key={field.key} label={`Thêm người ${index + 1}`}>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'id']}
                                                fieldKey={[field.fieldKey, 'id']}
                                                rules={[{ required: true, message: 'Please select a user id' }]}
                                            >

                                                <Space>
                                                    <UserDataSelect
                                                        userList={data}
                                                        onSelect={(value) => handleUserSelect(index, value)}
                                                    />
                                                    <Select
                                                        defaultValue=''
                                                        style={{
                                                            width: 100,
                                                        }}
                                                        onChange={(e) => handleRelationshipChange(index, e)}
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
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                        icon={<MinusCircleOutlined />}
                                                    >Xoá người mới</Button>
                                                </Space>
                                            </Form.Item>
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                            Add User
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Card>
    );
};

export default AddHouseHold;
