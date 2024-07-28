import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useState } from 'react';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
function MenuBar() {
    const navigate = useNavigate();
    const items = [
        getItem('Quản trị viên', 'grp', null, [getItem("Phí", "/admin_inf/"), getItem('Đóng góp', "/admin_inf/donation"), getItem("Lịch sử thu phí", "/admin_inf/history")], 'group'),
        {
            type: 'divider',
        },
        getItem('Dân cư', 'sub1', null, [
            getItem('Thông tin', '/admin_inf/resident'),
            getItem('Thống kê', "/admin_inf/residentStatistics"),
            getItem('Nhân khẩu mới', "/admin_inf/add_resident"),
        ]),
        {
            type: 'divider'
        },
        getItem('Hộ gia đình', 'sub2', null, [
            getItem('Thông tin hộ', "/admin_inf/household_info"),
            getItem('Thống kê', "/admin_inf/statistics"),
            // getItem('Tách hộ khẩu', "/admin_inf/separated")
        ]),
        {
            type: 'divider'
        },
        getItem('Tạo tài khoản', "/admin_inf/new_account"),
        {
            type: 'divider'
        },
        { label: "Log out", key: 'logout', danger: true },
    ];
    const [openKeys, setOpenKeys] = useState([]); 
    const handleOpenChange = (keys) => {
        // Xác định nhóm submenu nào đang mở và cập nhật state
        setOpenKeys(keys);
      };
    return (
        <Menu
            mode='inline'
            onClick={({ key }) => {
                if (key === "logout") {
                    localStorage.setItem('token', null);
                    navigate('/');

                } else {
                    navigate(key);
                }
            }}
            items={items}
            style={{
                // Tùy chỉnh style của Menu ở đây
                width: '200px', // Đặt chiều rộng của Menu
                //Thêm các thuộc tính CSS khác nếu cần
            }}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            triggerSubMenuAction="click"
        >

        </Menu>
    );
}
export default MenuBar;