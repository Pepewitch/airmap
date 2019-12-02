import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useScreenSize } from "features/screen-size/useScreenSize";
import { ImageItem } from "./ImageItem";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  padding: 16px;
`;

export const ImageList = () => {
  const items = useSelector(state => state.pollution.items);
  const width = useScreenSize();
  return (
    <Container>
      {items.map((item, index) => (
        <ImageItem item={item} key={index} width={width} />
      ))}
    </Container>
  );
};
