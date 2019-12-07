import React, { useEffect, useState } from "react";
import { Typography, Button, Spin } from "antd";
import styled from "styled-components";
import { ImagesCarousel } from "./ImagesCarousel";
import moment from "moment";
import axios from "axios";

const { Title } = Typography;

const ItemContainer = styled.div`
  width: 100%;
`;

const useImages = item => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setData([]);

    axios
      .get("/")
      .then(res => res.data)
      .then(data => {
        setData(["/airdata/00_01H1GALL.png", "/airdata/01_01H1GALL.png"]);
        setLoading(false);
      });
  }, [item]);
  return [data, loading];
};

export const ImageItem = ({ item, width }) => {
  const [data, loading] = useImages(item);
  return (
    <ItemContainer>
      {/* <div style={{ display: "flex" }}>
        <Title level={3}>{item.startDate.format("dddd, Do MMMM YYYY")}</Title>
      </div> */}
      {loading ? <Spin /> : <ImagesCarousel images={data} width={width} />}
    </ItemContainer>
  );
};
