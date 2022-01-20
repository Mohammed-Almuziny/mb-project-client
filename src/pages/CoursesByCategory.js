import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Input, List, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { CourseCard } from "../components/CourseCard";

export const CoursesByCategory = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const category = useParams().category;

  const getCourses = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/category/${category}`)
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
  }, [category]);

  return (
    <Layout.Content className="content">
      <h1 className="title">{category} courses</h1>

      <Input.Search
        className="searchForm"
        placeholder="input search term"
        onSearch={(term) => navigate("/search/" + term)}
      />

      {courses.length ? (
        <List
          loading={{
            spinning: courses[0] ? false : true,
            indicator: <LoadingOutlined />,
            size: "large",
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
          }}
          pagination={{
            pageSize: 8,
            showQuickJumper: true,
          }}
          dataSource={courses}
          renderItem={(course) => (
            <List.Item>
              <CourseCard course={course} key={course._id} />
            </List.Item>
          )}
        />
      ) : (
        <Empty description={<span>no course founded</span>} />
      )}
    </Layout.Content>
  );
};
