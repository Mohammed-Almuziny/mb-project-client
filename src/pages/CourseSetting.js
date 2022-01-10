import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Layout, Menu } from "antd";
import { InfoCircleFilled, PlusCircleFilled } from "@ant-design/icons";

import { CourseSettingInfo } from "./../components/CourseSettingInfo";
import { CourseAddSection } from "../components/CourseAddSection";
import { CourseAddLesson } from "./../components/CourseAddLesson";

const { Sider, Content } = Layout;

const GetPanel = ({ panel, course, getCourseInfo }) => {
  switch (panel) {
    case "Info":
      return (
        <CourseSettingInfo course={course} getCourseInfo={getCourseInfo} />
      );

    case "Add Section":
      return <CourseAddSection course={course} getCourseInfo={getCourseInfo} />;

    case "Add Lessons":
      return <CourseAddLesson course={course} getCourseInfo={getCourseInfo} />;

    default:
      return <>404</>;
  }
};

export const CourseSetting = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [panel, setPanel] = useState("Info");
  const [isCreator, setIsCreator] = useState(false);
  const [course, setCourse] = useState();

  const { userId } = useSelector((state) => state.account);
  const { courseId } = useParams();

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
      console.log(err);
    }
  };

  useEffect(() => {
    getCourseInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (course) userId === course.creator._id && setIsCreator(true);
    // eslint-disable-next-line
  }, [course]);

  const menuItems = [
    { name: "Info", icon: <InfoCircleFilled /> },
    { name: "Add Section", icon: <PlusCircleFilled /> },
    { name: "Add Lessons", icon: <PlusCircleFilled /> },
  ];

  return isCreator ? (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu defaultSelectedKeys={panel} theme="dark" mode="inline">
          {menuItems.map((item) => (
            <Menu.Item
              onClick={() => setPanel(item.name)}
              key={item.name}
              icon={item.icon}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Content className="content">
        <GetPanel panel={panel} course={course} getCourseInfo={getCourseInfo} />
      </Content>
    </Layout>
  ) : (
    <h2 style={{ textAlign: "center" }}>
      you are to the creator of this course
    </h2>
  );
};
