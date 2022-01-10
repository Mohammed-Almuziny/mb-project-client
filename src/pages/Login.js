import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "./../reducers/account";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
          nameOrEmail: email,
          password,
        })
        .then((response) => {
          console.log(response);

          const data = {
            user: response.data.result.name,
            avatar: response.data.result.avatar,
            userId: response.data.result._id,
            role: response.data.result.role.role,
            token: response.data.token,
          };

          dispatch(login({ ...data }));

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your login successfully",
            showConfirmButton: false,
            timer: 1000,
          });

          navigate("/");
        })
        .catch((err) => {
          Swal.fire({
            position: "top",
            icon: "warning",
            text: err.response.data.message,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleForgetPass = () => {
    const email = prompt("Please enter email");

    axios.post(`${process.env.REACT_APP_BASE_URL}/user/forgetPass`, { email });
  };

  return (
    <Layout.Content className="content" style={{ minHeight: "100vh" }}>
      <h1 className="title">Log In</h1>

      <div className="box">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="Username Or Email"
            rules={[
              {
                required: true,
                message: "Please input your Username or Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username Or Password"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now! </Link>
          </Form.Item>

          <Form.Item>
            <p className="login-form-forgot" onChange={handleForgetPass}>
              Forgot password?
            </p>
          </Form.Item>
        </Form>
      </div>
    </Layout.Content>
  );
};
