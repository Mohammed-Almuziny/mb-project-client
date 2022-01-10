import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const BlockReplySpan = ({ replyId, getCourseInfo }) => {
  const { role, token } = useSelector((state) => state.account);

  const blockReply = () => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/replys/block/${replyId}`,
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
    <span onClick={blockReply}>block</span>
  ) : (
    <span></span>
  );
};
