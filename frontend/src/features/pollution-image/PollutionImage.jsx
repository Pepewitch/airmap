import React from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { ImageList } from "./ImageList";
import { Tabs, Typography } from "antd";
import { Image3DList } from "./Image3DList";
import { useAction } from "hooks/useAction";
import { useSelector } from "react-redux";
import { dimensionChangeAction } from "./redux";
import { Footer } from "./Footer";

const { TabPane } = Tabs;
const { Title } = Typography;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
`;

export const PollutionImage = () => {
  const dimension = useSelector(state => state.pollution.dimension);
  const change = useAction(dimensionChangeAction);
  return (
    <div>
      <NavBar />
      <Row>
        <SideBar />
        <div style={{ flex: 1 }}>
          <Title style={{ marginTop: 16, marginLeft: 16 }} level={3}>
            ระบบการพยากรณ์ความเข้มข้นมลพิษ อากาศ 3 มิติอัตโนมัติ
          </Title>
          <StyledTabs activeKey={dimension} onChange={tab => change(tab)}>
            <TabPane tab="2D" key="2D">
              <ImageList />
            </TabPane>
            <TabPane tab="3D" key="3D">
              {dimension === "3D" && <Image3DList />}
            </TabPane>
          </StyledTabs>
        </div>
      </Row>
      <Footer />
    </div>
  );
};
