import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Spin, Button, Typography } from "antd";
import axios from "axios";
import { IMAGE_ENDPOINT, API_ENDPOINT } from "./const";

const { Title } = Typography;

const StyledIframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 200px);
  border: 1px solid #eee;
  position: relative;
`;

const DirectionContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.direction === "left" ? "left: 16px;" : "right: 16px;")}
`;

const Direction = ({ direction, ...props }) => {
  return (
    <DirectionContainer direction={direction}>
      <Button shape="circle" icon={direction} type="default" {...props} />
    </DirectionContainer>
  );
};

const Indicator = styled.div`
  width: ${props => (props.active ? "16px" : "12px")};
  height: ${props => (props.active ? "16px" : "12px")};
  margin: 8px;
  border-radius: 50%;
  background: ${props =>
    props.active ? "rgba(24, 144, 255, 1)" : "rgba(24, 144, 255, 0.6)"};
  cursor: pointer;
`;

const ShowingItem = ({ files }) => {
  const [src, setSrc] = useState(files[0]);
  useEffect(() => {
    setSrc(files[0]);
  }, [files]);

  const onLeftClick = () =>
    setSrc(files[(files.findIndex(f => f === src) - 1) % files.length]);
  const onRightClick = () =>
    setSrc(files[(files.findIndex(f => f === src) + 1) % files.length]);

  return (
    <div style={{ position: "relative" }}>
      <StyledIframe src={src} />
      <Direction direction="left" onClick={onLeftClick} />
      <Direction direction="right" onClick={onRightClick} />
      <div
        style={{
          position: "absolute",
          bottom: 4,
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        {files.map(f => (
          <Indicator key={f} active={f === src} onClick={() => setSrc(f)} />
        ))}
      </div>
    </div>
  );
};

const use3DImages = item => {
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
      (level.toString() ? `level=${level}&` : "")
    ).slice(0, -1);

    axios
      .get(`${API_ENDPOINT}/image3d?${query}`)
      .then(res => res.data)
      .then(data => {
        setData(data.images.map(image => `${IMAGE_ENDPOINT}/${image}`));
        setLoading(false);
      });
  }, [item]);
  return [data, loading];
};

export const Image3DItem = ({ item }) => {
  const [data, loading] = use3DImages(item);

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Spin />
      ) : data.length > 0 ? (
        <ShowingItem files={data} />
      ) : (
        <Title level={3}>ไม่พบข้อมูล</Title>
      )}
    </div>
  );
};
