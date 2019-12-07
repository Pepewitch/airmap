import React, { useEffect } from "react";
import { Typography, Button } from "antd";
import styled from "styled-components";
import { ImagesCarousel } from "./ImagesCarousel";
import moment from "moment";

const { Title } = Typography;

const ItemContainer = styled.div`
  width: 100%;
`;

const useImages = item => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, [item]);
  return [data, loading];
};

export const ImageItem = ({ item, width }) => {
  return (
    <ItemContainer>
      {/* <div style={{ display: "flex" }}>
        <Title level={3}>{item.startDate.format("dddd, Do MMMM YYYY")}</Title>
      </div> */}
      <ImagesCarousel images={images} width={width} />
    </ItemContainer>
  );
};
