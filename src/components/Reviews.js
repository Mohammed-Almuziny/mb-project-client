import { React } from "react";
import { Comment, List, Rate } from "antd";

export const Reviews = ({ reviews }) => {
  return reviews ? (
    <>
      <List
        className="comment-list"
        header={`${reviews.ratingStatus.total} reviews:`}
        itemLayout="horizontal"
        dataSource={reviews.result}
        renderItem={(review, i) => (
          <>
            <li>
              <Comment
                author={[
                  review.creator.name,
                  "  ",
                  <Rate
                    value={review.rating}
                    disabled="true"
                    key={review._id}
                  />,
                ]}
                avatar={review.creator.avatar}
                content={review.description}
              ></Comment>
            </li>
            <hr />
          </>
        )}
      />
    </>
  ) : (
    <></>
  );
};
