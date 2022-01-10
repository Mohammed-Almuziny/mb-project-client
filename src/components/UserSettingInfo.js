import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Input, Button } from "antd";

export const UserSettingInfo = () => {
  const [userInfo, setUserInfo] = useState("");
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");

  const { userId, token } = useSelector((state) => state.account);

  const getUserInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/user/info/${userId}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          setUserInfo(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/user/` + userId,
          { name, headline, about },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your change saved",
            showConfirmButton: false,
            timer: 1500,
          });

          getUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="title">your information</h1>

      <div className="box">
        <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item name="name">
            <Input
              placeholder={userInfo.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="headline">
            <Input
              placeholder={userInfo.headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="about">
            <Input
              placeholder={userInfo.about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
