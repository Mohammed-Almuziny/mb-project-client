import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout, Input, Row } from "antd";

import { CourseCard } from "./../components/CourseCard";

export const Home = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const getAllCourses = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course`)
        .then((result) => {
          setCourses(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout.Content className="content">
      <h1 className="title">courses </h1>

      <Input.Search
        className="searchForm"
        placeholder="input search term"
        onSearch={(term) => navigate("/search/" + term)}
      />

      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </Row>
    </Layout.Content>
  );
};
