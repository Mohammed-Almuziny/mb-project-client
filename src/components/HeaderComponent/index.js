import React from "react";
import { Layout } from "antd";

import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const HeaderComponent = () => {
  return (
    <Layout.Header className="header">
      <LeftSide />

      <RightSide />
    </Layout.Header>
  );
};
