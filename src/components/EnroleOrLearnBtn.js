import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";

import axios from "axios";
import Swal from "sweetalert2";

export const EnroleOrLearnBtn = () => {
  const [isStudent, seIsStudent] = useState(false);

  const { userId, token } = useSelector((state) => state.account);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleEnrole = (e) => {
    e.preventDefault();

    try {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/enrole`, {
          userId,
          courseId,
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You enrole successfully",
            showConfirmButton: false,
            timer: 1000,
          });

          navigate("/course/learn/" + courseId);
        })
        .catch((err) => {
          console.error(err + "");
        });
    } catch (err) {
      console.error(err + "");
    }
  };

  const checkIsStudent = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course/isStudent`,
          {
            userId,
            courseId,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((result) => {
          seIsStudent(result.data);
        })
        .catch((err) => {
          console.error(err + "");
        });
    } catch (err) {
      console.error(err + "");
    }
  };

  useEffect(() => {
    checkIsStudent();
    // eslint-disable-next-line
  }, []);

  return isStudent ? (
    <Button onClick={() => navigate("/course/learn/" + courseId)}>
      Go To Course
    </Button>
  ) : (
    <Button onClick={handleEnrole}>Enrole now</Button>
  );
};
