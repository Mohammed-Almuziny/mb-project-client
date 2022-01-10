import { React, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Input, Button } from "antd";

export const CourseSettingInfo = ({ course, getCourseInfo }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");

  const { token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/course/` + course._id,
          { title, about, description },
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

          getCourseInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1 className="title">course information</h1>

      <div className="box">
        <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item name="title">
            <Input
              placeholder={course.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="about">
            <Input
              placeholder={course.about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="description">
            <Input
              placeholder={course.description}
              onChange={(e) => setDescription(e.target.value)}
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
