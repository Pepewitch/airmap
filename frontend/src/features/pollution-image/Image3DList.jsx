import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useScreenSize } from "features/screen-size/useScreenSize";
import { ImageItem } from "./ImageItem";
import { Divider } from "antd";
import { Image3DItem } from "./Image3DItem";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  padding: 16px;
`;

export const Image3DList = () => {
  const items = useSelector(state => state.pollution.items);
  const width = useScreenSize();
  return (
    <Container>
      {items.map((item, index) => (
        <div key={index}>
          <Image3DItem item={item} width={width} />
          <Divider />
        </div>
      ))}
    </Container>
  );
};
