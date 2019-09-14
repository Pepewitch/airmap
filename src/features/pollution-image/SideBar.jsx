import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { toggleSidebarAction } from "./redux";
import { Button } from "antd";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  z-index: 1100;
  background-color: white;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 800px) {
    transform: translate3d(${props => (props.open ? 0 : -400)}px, 0, 0);
  }
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 16px 0;
`;

const Spacer = styled.div`
  width: 300px;
  @media (max-width: 800px) {
    width: ${props => (props.open ? 300 : 0)}px;
  }
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  @media (min-width: 801px) {
    display: none;
  }
`;

const CloseButton = () => {
  const toggleSidebar = useAction(toggleSidebarAction);
  return (
    <CloseButtonContainer>
      <Button
        type="link"
        shape="circle"
        icon="close"
        size="large"
        onClick={toggleSidebar}
      />
    </CloseButtonContainer>
  );
};

export const SideBar = () => {
  const sidebar = useSelector(state => state.pollution.sidebar);
  return (
    <Spacer open={sidebar}>
      <Container open={sidebar}>
        <Inner>
          <CloseButton />
          Sidebar
        </Inner>
      </Container>
    </Spacer>
  );
};
