import React from "react";
import { Typography, Button } from "antd";
import styled from "styled-components";
import { ImagesCarousel } from "./ImagesCarousel";

const { Title } = Typography;

const ItemContainer = styled.div`
  width: 100%;
`;

export const ImageItem = ({ item, width }) => {
  if (!item.startDate || (!item.level && typeof item.level !== "number")) {
    return <span>Configuration is invalid.</span>;
  }
  return (
    <ItemContainer>
      <div style={{ display: "flex" }}>
        <Title level={3}>{item.startDate.format("dddd, Do MMMM YYYY")}</Title>
      </div>
      <ImagesCarousel
        images={[
          `/airdata/${
            item.level < 100
              ? `0${Math.floor(item.level / 10)}`
              : Math.floor(item.level / 10)
          }_01H1GALL.png`
        ]}
        width={width}
      />
    </ItemContainer>
  );
};
