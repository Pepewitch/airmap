import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Spin, Button, Typography } from "antd";
import axios from "axios";
import { IMAGE_ENDPOINT, API_ENDPOINT } from "./const";
import moment, { months } from "moment";

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
  margin: 4px;
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
  const index = files.findIndex(f => f === src);
  const onLeftClick = () =>
    setSrc(files[index === 0 ? files.length - 1 : (index - 1) % files.length]);
  const onRightClick = () => setSrc(files[(index + 1) % files.length]);
  const isMed = src.indexOf("median") > -1;
  const matchFilename = src.match(/[0-9]{6}.html/);
  const filename = matchFilename && matchFilename[0];
  const date =
    filename &&
    moment().set({
      year: Number(`20${filename.slice(0, 2)}`),
      month: Number(filename.slice(2, 4)) - 1,
      date: Number(filename.slice(4, 6))
    });
  return (
    <div>
      {date && (
        <Title level={4} style={{ marginLeft: 16 }}>
          Date: {date.format("DD-MM-YYYY")} Level:{" "}
          {isMed
            ? "Median"
            : src.match(/[0-9]{8}.html/) &&
              src.match(/[0-9]{8}.html/)[0] &&
              src.match(/[0-9]{8}.html/)[0].slice(0, 2)}
        </Title>
      )}
      <div style={{ position: "relative" }}>
        <Spin
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
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
