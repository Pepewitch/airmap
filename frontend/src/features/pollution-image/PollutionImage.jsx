import React from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { ImageList } from "./ImageList";
import { Tabs } from "antd";
import { Image3DList } from "./Image3DList";

const { TabPane } = Tabs;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
`;

export const PollutionImage = () => {
  return (
    <div>
      <NavBar />
      <Row>
        <SideBar />
        <StyledTabs defaultActiveKey="2D">
          <TabPane tab="2D" key="2D">
            <ImageList />
          </TabPane>
          <TabPane tab="3D" key="3D">
            <Image3DList />
          </TabPane>
        </StyledTabs>
      </Row>
    </div>
  );
};
