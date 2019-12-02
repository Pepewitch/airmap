import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useAction } from "hooks/useAction";
import { toggleSidebarAction } from "./redux";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 16px;
  z-index: 1000;
`;

const Spacer = styled.div`
  width: 100%;
  height: 56px;
  background-color: white;
  @media (min-width: 801px) {
    display: none;
  }
`;

export const NavBar = () => {
  const toggleSidebar = useAction(toggleSidebarAction);
  return (
    <Spacer>
      <Container>
        <Button
          type="link"
          shape="circle"
          icon="menu"
          size="large"
          onClick={toggleSidebar}
        />
      </Container>
    </Spacer>
  );
};
