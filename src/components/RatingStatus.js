import React from "react";
import { Progress, Rate, Row, Col } from "antd";

export const RatingStatus = ({ reviews }) => {
  return reviews ? (
    <Row>
      <Col xs={{ span: 24, offset: 0 }} xl={{ span: 6, offset: 0 }}>
        <Col justify="center">
          <Row justify="center">
            <Rate value={reviews.ratingStatus.rating} allowHalf={true} />
          </Row>

          <Row justify="center">
            <h1>{reviews.ratingStatus.rating.toFixed(2)}</h1>
          </Row>
        </Col>
      </Col>
      <Col xs={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 0 }}>
        <Row>
          <Col span={16}>
            <Progress
              percent={reviews.ratingStatus.oneStar.toFixed(2)}
              size="small"
            />
          </Col>
          <Col span={1}> </Col>
          <Col span={7}>
            <Rate className="stars" value="1" disabled="true" />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Progress
              percent={reviews.ratingStatus.twoStar.toFixed(2)}
              size="small"
            />
          </Col>
          <Col span={1}> </Col>
          <Col span={7}>
            <Rate className="stars" value="2" disabled="true" />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Progress
              percent={reviews.ratingStatus.threeStar.toFixed(2)}
              size="small"
            />
          </Col>
          <Col span={1}> </Col>
          <Col span={7}>
            <Rate className="stars" value="3" disabled="true" />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Progress
              percent={reviews.ratingStatus.fourStar.toFixed(2)}
              size="small"
            />
          </Col>
          <Col span={1}> </Col>
          <Col span={7}>
            <Rate className="stars" value="4" disabled="true" />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Progress
              percent={reviews.ratingStatus.fiveStar.toFixed(2)}
              size="small"
            />
          </Col>
          <Col span={1}> </Col>
          <Col span={7}>
            <Rate className="stars" value="5" disabled="true" />
          </Col>
        </Row>
      </Col>
    </Row>
  ) : (
    <></>
  );
};
