import { React, useState } from "react";
import { Layout, Menu } from "antd";
import { InfoCircleFilled, CameraFilled, LockFilled } from "@ant-design/icons";

import { UserSettingInfo } from "./../components/UserSettingInfo";
import { UserSettingAvatar } from "../components/UserSettingAvatar";
import { UserSettingPassword } from "../components/UserSettingPassword";

const { Sider, Content } = Layout;

const GetPanel = ({ panel }) => {
  switch (panel) {
    case "Info":
      return <UserSettingInfo />;

    case "Avatar":
      return <UserSettingAvatar />;

    case "Password":
      return <UserSettingPassword />;

    default:
      return <>404</>;
  }
};

export const UserSetting = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [panel, setPanel] = useState("Info");

  const menuItems = [
    { name: "Info", icon: <InfoCircleFilled /> },
    { name: "Avatar", icon: <CameraFilled /> },
    { name: "Password", icon: <LockFilled /> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu defaultSelectedKeys={panel} theme="dark" mode="inline">
          {menuItems.map((item) => (
            <Menu.Item
              onClick={() => setPanel(item.name)}
              key={item.name}
              icon={item.icon}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Content className="content">
        <GetPanel panel={panel} />
      </Content>
    </Layout>
  );
};
