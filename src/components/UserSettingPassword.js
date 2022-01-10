import { React, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { Form, Input, Button } from "antd";

export const UserSettingPassword = () => {
  const [newPassword, setNewPassword] = useState();
  const [newPassword2, setNewPassword2] = useState();

  const { token } = useSelector((state) => state.account);

  const handleSubmit = async (e) => {
    try {
      if (newPassword === newPassword2) {
        await axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/user/changePassword`,
            { newPassword },
            {
              headers: { Authorization: "Bearer " + token },
            }
          )
          .then(() =>
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "your change saved",
              showConfirmButton: false,
              timer: 1500,
            })
          )
          .catch((err) => {
            console.log(err);
          });
      } else alert("not equal");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="title">change your password</h1>

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
              onChange={(e) => setNewPassword(e.target.value)}
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
              onChange={(e) => setNewPassword2(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              change
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
