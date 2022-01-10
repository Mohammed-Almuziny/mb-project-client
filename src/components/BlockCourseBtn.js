import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "antd";

export const BlockCourseBtn = ({ courseId }) => {
  const { role, token } = useSelector((state) => state.account);
  const navigate = useNavigate();

  const blockCourse = () => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/course/block/${courseId}`,
          {},
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return role === "admin" ? (
    <Button onClick={blockCourse}>block</Button>
  ) : (
    <></>
  );
};
