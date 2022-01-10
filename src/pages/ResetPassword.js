import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Layout, Form, Input, Button } from "antd";

export const ResetPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (password1 !== password2) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "your passwords dont match",
      });
    } else if (
      !password1.match(
        // eslint-disable-next-line
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,}$/
      )
    ) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "your password is weak",
        text: "the password have top be at least 6 character and contain at least 1 Capital letter, small, special character, and number ",
      });
    } else {
      try {
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/user/changePassword`,
            { newPassword: password1 },
            {
              headers: { authorization: "Bearer " + token },
            }
          )
          .then(() => {
            navigate("/logIn");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Layout.Content className="content">
      <h1 className="title">Reset password</h1>

      <div className="box">
        <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new pasword",
              },
            ]}
          >
            <Input.Password
              placeholder="new password"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="newPassword2"
            rules={[
              {
                required: true,
                message: "Please input your new pasword to check",
              },
            ]}
          >
            <Input.Password
              placeholder="new password check"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout.Content>
  );
};
