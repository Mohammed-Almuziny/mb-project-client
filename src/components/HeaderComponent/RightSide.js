import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Menu, Avatar, Dropdown } from "antd";

import { logout } from "./../../reducers/account";

export const RightSide = () => {
  const { user, avatar } = useSelector((state) => state.account);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item key="createCourse">
        <Link to="/createCourse"> create course </Link>
      </Menu.Item>

      <Menu.Item key="setting">
        <Link to="/user/setting"> setting </Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="chats">
        <Link to="/chats/"> chat </Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item onClick={() => dispatch(logout({}))} key="log out">
        <Link to="/"> log out</Link>
      </Menu.Item>
    </Menu>
  );

  return user ? (
    <Menu theme="dark" mode="horizontal">
      <Dropdown overlay={menu}>
        <a
          className="ant-dropdown-link"
          href="#empty"
          onClick={(e) => e.preventDefault()}
        >
          <Avatar src={avatar} />
        </a>
      </Dropdown>
    </Menu>
  ) : (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item onClick={() => navigate("/register")} key="register">
        Register
      </Menu.Item>
      <Menu.Item onClick={() => navigate("/logIn")} key="log in">
        Log in
      </Menu.Item>
    </Menu>
  );
};
