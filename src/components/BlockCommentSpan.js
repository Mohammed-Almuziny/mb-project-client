import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const BlockCommentSpan = ({ commentId, getCourseInfo }) => {
  const { role, token } = useSelector((state) => state.account);

  const blockComment = () => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/comments/block/${commentId}`,
          {},
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          getCourseInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return role === "admin" ? (
    <span onClick={blockComment}>block</span>
  ) : (
    <span></span>
  );
};
