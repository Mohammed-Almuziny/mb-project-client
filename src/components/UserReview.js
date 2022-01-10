import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Comment, Avatar, Form, Button, Input, Rate } from "antd";

const { TextArea } = Input;

export const UserReview = ({ creator, reference, getReviews }) => {
  const [userReview, setUserReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);

  const { avatar, token } = useSelector((state) => state.account);

  const getUserReview = () => {
    try {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/reviews/getUserReview`, {
          creator,
          reference,
        })
        .then((result) => {
          setUserReview(result.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const createReview = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/reviews/`,
          {
            creator,
            rating,
            description,
            reference,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((result) => {
          setUserReview(result.data);
          getReviews();
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserReview();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userReview) setShowReviewForm(false);
  }, [userReview]);

  return showReviewForm ? (
    <Comment
      avatar={<Avatar src={avatar} alt="Han Solo" />}
      content={
        <>
          <Rate
            defaultValue={rating}
            allowClear={false}
            onChange={(value) => setRating(value)}
          />
          <Form onFinish={createReview}>
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
                Add Review
              </Button>
            </Form.Item>
          </Form>
        </>
      }
    />
  ) : (
    <Comment
      author={[
        userReview.creator.name,
        "  ",
        <Rate value={userReview.rating} disabled="true" key={userReview._id} />,
      ]}
      avatar={userReview.creator.avatar}
      content={userReview.description}
      actions={[
        <span
          key={userReview._id._id + "update"}
          onClick={() => setShowReviewForm(true)}
        >
          update
        </span>,
      ]}
    ></Comment>
  );
};
