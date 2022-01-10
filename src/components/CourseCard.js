import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Typography } from "antd";

const { Link } = Typography;

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Col
      xs={{ span: 24, offset: 0 }}
      md={{ span: 8, offset: 0 }}
      lg={{ span: 6, offset: 0 }}
      xl={{ span: 6, offset: 0 }}
    >
      <Card
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
    </Col>
  );
};
