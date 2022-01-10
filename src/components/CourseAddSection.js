import { React, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Input, Button } from "antd";

export const CourseAddSection = ({ course, getCourseInfo }) => {
  const [newSection, setNewSection] = useState();

  const { token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course/addSection`,
          {
            courseId: course._id,
            sectionName: newSection,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your section have been add successfully",
            showConfirmButton: false,
            timer: 2000,
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
      <h1 className="title">your course lesson sections</h1>

      <div className="box">
        {course.lessonSections.map((section, i) => (
          <p key={section._id}>
            Section {i + 1}: {section.sectionName}
          </p>
        ))}

        <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item
            name="newSectionName"
            rules={[
              {
                required: true,
                message: "Please input your new section name",
              },
            ]}
          >
            <Input
              placeholder="new Section name"
              onChange={(e) => setNewSection(e.target.value)}
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
