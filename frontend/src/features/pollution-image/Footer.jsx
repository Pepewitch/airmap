import React from "react";
import styled from "styled-components";
import footer from "../../assets/footer.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background: rgb(25, 19, 91);
  z-index: 9999;
  padding-bottom: 8px;
  @media screen and (max-width: 800px) {
    height: 40px;
    padding-bottom: 4px;
  }
`;

const Img = styled.img`
  height: 100%;
  width: auto;
`;

export const Footer = () => {
  return (
    <div style={{ paddingBottom: 64 }}>
      <Container>
        <Img src={footer} />
      </Container>
    </div>
  );
};
