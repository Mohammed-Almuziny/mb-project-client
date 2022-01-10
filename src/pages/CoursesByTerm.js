import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Input, Row } from "antd";

import { CourseCard } from "../components/CourseCard";

export const CoursesByTerm = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  const term = useParams().term;

  const getCourses = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/search/${term}`)
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
    getCourses();
    // eslint-disable-next-line
  }, [term]);

  return (
    <Layout.Content className="content">
      <h1 className="title">Search result for "{term}"</h1>

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
