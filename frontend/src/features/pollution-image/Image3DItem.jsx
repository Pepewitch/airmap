import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Spin } from "antd";
import axios from "axios";

const StyledIframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 200px);
`;

const ShowingItem = ({ files }) => {
  const [src, setSrc] = useState(files[0]);
  useEffect(() => {
    setSrc(files[0]);
  }, [files]);
  return <div>{/* <StyledIframe src={src} /> */}</div>;
};

const use3DImages = item => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setData([]);

    axios
      .get("/")
      .then(res => res.data)
      .then(data => {
        setData(["/neoTEST/myAirPoint123.html"]);
        setLoading(false);
      });
  }, [item]);
  return [data, loading];
};

export const Image3DItem = ({ item }) => {
  const [data, loading] = use3DImages(item);

  return (
    <div style={{ width: "100%" }}>
      {loading ? <Spin /> : <ShowingItem files={data} />}
    </div>
  );
};
