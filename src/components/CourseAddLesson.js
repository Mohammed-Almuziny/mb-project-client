import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { Select, Form, Input, Upload, Button, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { storage } from "./../utils/firebaseConfig";

export const CourseAddLesson = ({ course, getCourseInfo }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [lessonName, setLessonName] = useState("");
  const [lesson, setLesson] = useState("");
  const [lessonUrl, setLessonUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const { token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    // e.preventDefault();

    if (lesson.type.split("/")[0] === "video") {
      const uploadImg = storage
        .ref(`videos/${course._id}_${sectionIndex}_${lesson.name}`)
        .put(lesson);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // eslint-disable-next-line
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("videos")
            .child(`${course._id}_${sectionIndex}_${lesson.name}`)
            .getDownloadURL()
            .then((url) => {
              setLessonUrl(url);
              // e.target.lesson.value = "";
            });
        }
      );
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        text: "lesson have to be video file",
      });
    }
  };

  const submitLesson = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course/addLesson`,
          {
            courseId: course._id,
            sectionIndex,
            lessonName,
            lesson: lessonUrl,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your lesson have been add successfully",
            showConfirmButton: false,
            timer: 2000,
          });

          getCourseInfo();
          setUploadProgress(0);
        })
        .catch((err) => {
          console.error(err + "");
        });
    } catch (err) {
      console.error(err + "");
    }
  };

  useEffect(() => {
    if (lessonUrl) submitLesson();
    // eslint-disable-next-line
  }, [lessonUrl]);

  useEffect(() => {
    console.log("lesson :", lesson);
    // eslint-disable-next-line
  }, [lesson]);

  useEffect(() => {
    console.log("lessonName :", lessonName);
    // eslint-disable-next-line
  }, [lessonName]);

  return (
    <>
      <h1 className="title">Log In</h1>

      <div className="box">
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={(val) => setSectionIndex(val)}
        >
          {course.lessonSections.map((section, i) => (
            <Select.Option value={i} key={section._id}>
              section {i + 1}: {section.sectionName}
            </Select.Option>
          ))}
        </Select>

        {course.lessonSections[Number(sectionIndex)].lessons.map(
          (lesson, i) => (
            <p key={lesson._id}>
              lesson {i + 1}: {lesson.lessonName}
            </p>
          )
        )}
        <br />

        <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item
            name="LessonName"
            rules={[
              {
                required: true,
                message: "Please input your lesson name",
              },
            ]}
          >
            <Input
              placeholder="lesson name"
              onChange={(e) => setLessonName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="LessonName"
            rules={[
              {
                required: true,
                message: "Please input your file",
              },
            ]}
          >
            <Upload
              name="video"
              method="GET"
              action=""
              maxCount={1}
              onChange={(e) =>
                e.file.status === "done" && setLesson(e.file.originFileObj)
              }
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Progress percent={uploadProgress} />
          <br />

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
