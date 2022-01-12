import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { EnroleOrLearnBtn } from "./../components/EnroleOrLearnBtn";
import { CourseSettingBtn } from "./../components/CourseSettingBtn";
import { BlockCourseBtn } from "./../components/BlockCourseBtn";
import { RatingStatus } from "./../components/RatingStatus";
import { Reviews } from "./../components/Reviews";
import { UserReview } from "./../components/UserReview";

export const CourseInfo = () => {
  const [course, setCourse] = useState();
  const [reviews, setReviews] = useState();

  const { courseId } = useParams();
  const { userId } = useSelector((state) => state.account);

  const getCourseInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/${courseId}`)
        .then((result) => {
          setCourse(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getReviews = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/reviews/${courseId}`)
        .then((result) => {
          setReviews(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCourseInfo();
    getReviews();
    // eslint-disable-next-line
  }, []);

  return course ? (
    <Layout.Content className="content" style={{ minHeight: "100vh" }}>
      <img
        className="thumbnail"
        src={course.thumbnail}
        alt={course.title + " thumbnail"}
      />

      <div className="courseInfoHeader">
        <div>
          <h1>{course.title}</h1>

          <h2>
            created by :{" "}
            <Link to={`/user/${course.creator._id}`}>
              {course.creator.name}
            </Link>
          </h2>
        </div>

        <div>
          <EnroleOrLearnBtn />
          <CourseSettingBtn courseId={course._id} creator={course.creator} />
          <BlockCourseBtn courseId={course._id} />
        </div>
      </div>
      <hr />

      <h2>Description</h2>
      <p>{course.description}</p>

      <h2>About</h2>
      <p>{course.about}</p>

      {reviews && reviews.result[0] && (
        <>
          <h2>rating status</h2>
          <RatingStatus reviews={reviews} />
        </>
      )}

      <h2>Reviews</h2>
      {userId && (
        <UserReview
          creator={userId}
          reference={course._id}
          getReviews={getReviews}
        />
      )}
      {reviews && reviews.result[0] && <Reviews reviews={reviews} />}
    </Layout.Content>
  ) : (
    <Layout.Content className="center">
      <LoadingOutlined className="loadingIcon" />
    </Layout.Content>
  );
};
