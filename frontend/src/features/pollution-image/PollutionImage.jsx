import React from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { ImageList } from "./ImageList";

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const PollutionImage = () => {
  return (
    <div>
      <NavBar />
      <Row>
        <SideBar />
        <ImageList />
      </Row>
    </div>
  );
};
