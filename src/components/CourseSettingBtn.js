import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";

export const CourseSettingBtn = ({ courseId, creator }) => {
  const [isCreator, setIsCreator] = useState(false);

  const { userId } = useSelector((state) => state.account);
  const navigate = useNavigate();

  useEffect(() => {
    userId === creator._id && setIsCreator(true);
    // eslint-disable-next-line
  }, []);

  return isCreator ? (
    <Button onClick={() => navigate("/course/setting/" + courseId)}>
      Course setting
    </Button>
  ) : (
    <></>
  );
};
