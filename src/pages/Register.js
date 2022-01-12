import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      password.match(
        // eslint-disable-next-line
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,}$/
      )
    ) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
          name,
          email,
          password,
        })
        .then(() => {
          navigate("/logIn");

          Swal.fire({
            position: "top",
            icon: "success",
            title: "verification link sent to your email",
          });
        })
        .catch((err) => {
          if (err.response.data.error.split(" ")[0] === "E11000")
            Swal.fire({
              position: "top",
              icon: "warning",
              text: "this email already exceeded",
            });
          else console.log(err);
        });
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "your password is weak",
        text: "the password have top be at least 6 character and contain at least 1 Capital letter, small, special character, and number ",
      });
    }
  };

  return (
    <Layout.Content className="content" style={{ minHeight: "100vh" }}>
      <h1 className="title">register</h1>

      <div className="box">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="userName"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
              register
            </Button>
            Or <Link to="/logIn">log in now! </Link>
          </Form.Item>
        </Form>
      </div>
    </Layout.Content>
  );
};
