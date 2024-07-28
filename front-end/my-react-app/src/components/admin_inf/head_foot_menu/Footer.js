import { Space } from "antd";

function Footer() {
    return (
        <div
            style={{
                height: 40,
                backgroundColor: "#a6be97",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
            }}
        >
            <Space>

           <label style={{marginRight:'800px'}}>Nhóm số 20</label>
           <p style={{marginLeft:'300'}}>Số điện thoại liên lạc: 1234567xxxx</p>
            </Space>
           
        </div>
    );
};
export default Footer;

