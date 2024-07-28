
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Radio,
    Card,
    message,
    Space
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReloadOutlined } from '@ant-design/icons';
import Header from './head_foot_menu/Header';
import Footer from './head_foot_menu/Footer';
import MenuBar from './head_foot_menu/MenuNav';
import axios from 'axios';
import moment from 'moment';
// const normFile = (e) => {
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e?.fileList;
// };
const AddResident = () => {
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
const Content = () => {
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyNjk4NzBmOS04MzU4LTQyZjctYmI1YS1iNmYwOGI3M2I1ZTciLCJzdWIiOiIxIiwiaWF0IjoxNzAyMzQxMzYwLCJleHAiOjE3MDQ5MzMzNjAsImlzcyI6Im9yZy5jbnBtIiwidXNlcl9pZCI6MSwiaG91c2Vob2xkX2lkIjoxLCJ1c2VyX3RwIjpudWxsfQ.LOCFnJFExB9Beos1TCohdOMILun1tYq35aOmnmFCepMhJUdorg6aLtqWNIKcu8aLQubn-M8MF7zKTtsUXEO5ow';
    const token = localStorage.getItem('token');
    const [form] = Form.useForm();
    const rules = [{
        required: true,
        message: 'Không để trống!'
    }];
    const handleOnFinish = async (values) => {
        try {
            console.log(values);
            const newResident = {
                "id": 0,
                "p_id": 0,
                "m_id": 0,
                "full_name": values.full_name,
                "date_of_birth": moment(values.date_of_birth).format("YYYY-MM-DD"),
                "hometown": values.hometown,
                "ethnicity": values.ethnicity,
                "occupation": values.occupation,
                "place_of_employment": values.place_of_employment,
                "cccd": values.cccd,
                "date_of_issue": moment(values.date_of_issue).format("YYYY-MM-DD"),
                "date_of_registration": moment(values.date_of_registration).format("YYYY-MM-DD"),
                "previous_place_of_permanent_residence": values.previous_place_of_permanent_residence,
                "household_id": values.household_id,
                "relationship": values.relationship,
                "action_type": 0,
                "is_head_of_household": values.is_head_of_household,
            };
            console.log("CCCD: ", values.cccd);
            const response = await axios.post('http://26.212.32.34:6789/api/v1/resident/new-resident', newResident, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("Response of addNewResident:", response);
            // response.data
            message.success("Thêm nhân khẩu mới thành công!");
        } catch (error) {
            message.error("Xảy ra lỗi!")
        }
    };
    const handleReset = () => {
        // Đặt lại tất cả các trường trong form
        form.resetFields();
    };
    return (
        <div className="content">
            <Card title={<div style={{ textAlign: 'center', fontSize: '20px'  }}>Thêm nhân khẩu</div>} style={{ width: '80%', maxWidth: 800, marginLeft: '10%' }}>
                <Form
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 15,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 1000,
                    }}
                    onFinish={(values) => handleOnFinish(values)}
                >

                    <Form.Item label="Họ tên" name="full_name" rules={rules} >
                        <Input placeholder='Họ và tên' />
                    </Form.Item>
                    {/* <Form.Item label="CCCD" rules={rules} name={"cccd"}>
                        <Input />
                    </Form.Item> */}
                    {/* <Form.Item label="CCCD và Ngày cấp" rules={rules} name="cccc">
                        <Space.Compact>
                            <Input style={{ width: '70%' }} placeholder="CCCD" />
                            <DatePicker style={{ width: '30%' }} format="YYYY-MM-DD" placeholder="Ngày cấp" />
                        </Space.Compact>
                    </Form.Item> */}
                    <Form.Item rules={rules} label="CCCD" name={"cccd"}>
                        <Input placeholder="CCCD" />
                    </Form.Item>
                    <Form.Item rules={rules} label="Ngày cấp" name={"date_of_issue"}>
                    <DatePicker format="YYYY-MM-DD" placeholder="Ngày cấp" />

                    </Form.Item>
                    <Form.Item label="Ngày sinh" rules={rules} name={"date_of_birth"}>
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder='Ngày sinh'
                        />
                    </Form.Item>
                    <Form.Item label="Giới tính" rules={rules} name={"gender"}>
                        <Radio.Group>
                            <Radio value={0}> Nam </Radio>
                            <Radio value={1}> Nữ </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Quê quán" rules={rules} name={"hometown"}>
                        <Input placeholder='Quê quán' />
                    </Form.Item>
                    <Form.Item label="Nghề nghiệp" name={"occupation"}>
                        <Input placeholder='Nghề nghiệp' />
                    </Form.Item>
                    <Form.Item label="Nơi làm việc" name={"place_of_employment"}>
                        <Input placeholder='Nơi làm việc' />
                    </Form.Item>
                    <Form.Item label="Dân tộc" rules={rules} name={"ethnicity"}>
                        <Input placeholder='Dân tộc' />
                    </Form.Item>

                    <Form.Item label="Nơi ở trước đây" rules={rules} name={"previous_place_of_permanent_residence"}>
                        <Input placeholder='Nơi ở trước đây' />
                    </Form.Item>
                    <Form.Item label="ID hộ gia đình" name={"household_id"}>
                        <Input placeholder='ID hộ gia đình' />
                    </Form.Item>
                    <Form.Item label="Là chủ hộ" name="is_head_of_household" valuePropName="checked">
                        <Checkbox></Checkbox>
                    </Form.Item>
                    {/* relationship_nm */}
                    <Form.Item label="Quan hệ với chủ hộ" name={"relationship"}>
                        <Input placeholder='Quan hệ với chủ hộ' />
                    </Form.Item>
                    <Form.Item label="Ngày đăng ký thường trú" rules={rules} name={'date_of_registration'}>
                        <DatePicker format="YYYY-MM-DD" placeholder="Nhập ngày vào đây" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
                        <Button style={{ marginRight: 20 }} onClick={() => handleReset()} icon={<ReloadOutlined />}>
                            Làm mới
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Xác nhận thêm nhân khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
export default AddResident;