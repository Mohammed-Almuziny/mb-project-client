import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "antd";

const { Link } = Typography;

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ height: "100%" }}
      hoverable
      cover={
        <img
          className="courseCardImg"
          alt={course.title}
          src={course.thumbnail}
        />
      }
      onClick={() => navigate("/course/" + course._id)}
    >
      <Card.Meta
        title={course.title}
        description={
          <Link href={"/user/" + course.creator._id}>
            by : {course.creator.name}
          </Link>
        }
      />
    </Card>
  );
};
