import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useScreenSize } from "features/screen-size/useScreenSize";
import { ImageItem } from "./ImageItem";
import { Divider } from "antd";

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  max-width: 100vw;
  padding: 16px;
  @media screen and (min-width: 801px) {
    max-width: 100%;
  }
`;

export const ImageList = () => {
  const items = useSelector(state => state.pollution.items);
  const width = useScreenSize();
  return (
    <Container>
      {items.map((item, index) => (
        <div key={index}>
          <ImageItem item={item} width={width} />
          <Divider />
        </div>
      ))}
    </Container>
  );
};
