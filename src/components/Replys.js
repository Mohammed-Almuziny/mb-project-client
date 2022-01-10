import React from "react";
import { Comment, List } from "antd";

import { BlockReplySpan } from "./BlockReplySpan";

export const Replys = ({ replys, getCourseInfo }) => {
  return (
    <List
      className="comment-list"
      header={`${replys.length} reply`}
      itemLayout="horizontal"
      dataSource={replys}
      renderItem={(reply) => (
        <li>
          <Comment
            actions={[
              <BlockReplySpan
                replyId={reply._id}
                getCourseInfo={getCourseInfo}
              />,
            ]}
            author={reply.creator.name}
            avatar={reply.creator.avatar}
            content={reply.description}
          />
        </li>
      )}
    />
  );
};
