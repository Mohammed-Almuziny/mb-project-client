import { React } from "react";
import { Comment, List } from "antd";

import { AddComment } from "./AddComment";
import { AddReply } from "./AddReply";
import { Replys } from "./Replys";
import { BlockCommentSpan } from "./BlockCommentSpan";

export const Comments = ({ course, getCourseInfo }) => {
  return (
    <>
      <AddComment course={course} getCourseInfo={getCourseInfo} />

      <List
        className="comment-list"
        header={`${course.comments.length} comments`}
        itemLayout="horizontal"
        dataSource={course.comments}
        renderItem={(comment, i) => (
          <>
            <li>
              <Comment
                actions={[
                  <BlockCommentSpan
                    commentId={comment._id}
                    getCourseInfo={getCourseInfo}
                  />,
                ]}
                author={comment.creator.name}
                avatar={comment.creator.avatar}
                content={comment.description}
              >
                <Replys
                  replys={comment.replays}
                  getCourseInfo={getCourseInfo}
                />

                <AddReply
                  commentId={comment._id}
                  getCourseInfo={getCourseInfo}
                />
              </Comment>
            </li>
            <hr />
          </>
        )}
        locale={{
          emptyText: <p className="emptyText"> no comment yet </p>,
        }}
      />
    </>
  );
};
