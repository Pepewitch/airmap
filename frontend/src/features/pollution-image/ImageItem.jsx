import React, { useEffect, useState } from "react";
import { Typography, Button, Spin } from "antd";
import styled from "styled-components";
import { ImagesCarousel } from "./ImagesCarousel";
import moment from "moment";
import axios from "axios";
import { API_ENDPOINT, IMAGE_ENDPOINT } from "./const";

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

    const { startDate, endDate, type, level } = item;
    const query = (
      (startDate ? `startDate=${startDate.toISOString()}&` : "") +
      (endDate ? `endDate=${endDate.toISOString()}&` : "") +
      (type ? `type=${type}&` : "") +
      (level ? `level=${level}&` : "")
    ).slice(0, -1);

    axios
      .get(`${API_ENDPOINT}/image2d?${query}`)
      .then(res => res.data)
      .then(data => {
        setData(data.images.map(image => `${IMAGE_ENDPOINT}/${image}`));
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
      {loading ? (
        <Spin />
      ) : data.length > 0 ? (
        <ImagesCarousel images={data} width={width} />
      ) : (
        <Title>ไม่พบข้อมูล</Title>
      )}
    </ItemContainer>
  );
};
