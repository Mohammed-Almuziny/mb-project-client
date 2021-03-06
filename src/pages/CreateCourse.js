import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Layout, Form, Upload, Input, Select, Button, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { storage } from "./../utils/firebaseConfig";

export const CreateCourse = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [uploadProgress, setUploadProgress] = useState(0);

  const { userId, token } = useSelector((state) => state.account);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const uploadImg = storage.ref(`images/${thumbnail.name}`).put(thumbnail);
    uploadImg.on(
      "state_changed",
      (snapshot) => {
        // eslint-disable-next-line
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(thumbnail.name)
          .getDownloadURL()
          .then((url) => {
            setThumbnailUrl(url);
          });
      }
    );
  };

  const submitInfo = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course`,
          {
            thumbnail: thumbnailUrl,
            title,
            about,
            description,
            creator: userId,
            category,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    submitInfo();
    // eslint-disable-next-line
  }, [thumbnailUrl]);

  useEffect(() => {
    console.log(thumbnail);
    // eslint-disable-next-line
  }, [thumbnail]);

  useEffect(() => {
    console.log(uploadProgress);
    // eslint-disable-next-line
  }, [uploadProgress]);

  return (
    <Layout.Content className="content">
      <h1 className="title">create new course</h1>

      <div className="box">
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="user avatar"
            rules={[
              {
                required: true,
                message: "Please input your course thumbnail ",
              },
            ]}
          >
            <Upload
              name="logo"
              beforeUpload="false"
              listType="picture"
              maxCount={1}
              onChange={(e) => setThumbnail(e.file)}
            >
              <Button icon={<UploadOutlined />}>
                Click to upload thumbnail
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your course title",
              },
            ]}
          >
            <Input
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="about"
            rules={[
              {
                required: true,
                message: "Please input about your course",
              },
            ]}
          >
            <Input.TextArea 
              placeholder="about"
              autoSize="true"
              onChange={(e) => setAbout(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your course description",
              },
            ]}
          >
            <Input.TextArea
              placeholder="description"
              autoSize="true"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "Please select a category",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={(val) => setCategory(val)}
            >
              {["General", "Software", "Business", "Design"].map(
                (section, i) => (
                  <Select.Option value={section} key={i + "_section"}>
                    {section}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Progress percent={uploadProgress} />
          <br />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout.Content>
  );
};
