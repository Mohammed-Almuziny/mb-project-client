import { React, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Comment, Avatar, Form, Button, Input } from "antd";

const { TextArea } = Input;

export const AddReply = ({ commentId, getCourseInfo }) => {
  const [description, setDescription] = useState("");

  const { avatar, userId, token } = useSelector((state) => state.account);

  const createComment = () => {
    setDescription("");

    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/replys`,
          {
            creator: userId,
            description,
            reference: commentId,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          getCourseInfo();
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Comment
      avatar={<Avatar src={avatar} alt="Han Solo" />}
      content={
        <Form onFinish={createComment}>
          <Form.Item>
            <TextArea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              value={description}
              rows={4}
              required={true}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Add Reply
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
};
