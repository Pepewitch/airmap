import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Typography, Carousel, Button, Switch } from "antd";
import AvatarEditor from "react-avatar-editor";
import { cropPositionChangeAction } from "./redux";
import { useAction } from "hooks/useAction";

const { Title } = Typography;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  padding: 16px;
`;

const ImagePlaceholder = styled.div`
  background-color: #aaa;
  width: 100%;
  height: 400px;
`;

const ItemContainer = styled.div`
  width: 100%;
`;
const ImageContainer = styled.div`
  padding-bottom: 17px;
  background: #1890ff;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
`;
const StyledCarousel = styled(Carousel)`
  .slick-slide:not(.slick-active) {
    transition-delay: 500ms !important;
  }
`;
const DirectionContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.direction === "left" ? "left: 16px;" : "right: 16px;")}
`;
const AutoplaySwitchContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`;

const Direction = ({ direction, ...props }) => {
  return (
    <DirectionContainer direction={direction}>
      <Button shape="circle" icon={direction} type="default" {...props} />
    </DirectionContainer>
  );
};

const AutoplaySwitch = props => {
  return (
    <AutoplaySwitchContainer>
      <Switch checkedChildren="Play" unCheckedChildren="Pause" {...props} />
    </AutoplaySwitchContainer>
  );
};

const Images = ({ images, width }) => {
  const carouselRef = useRef(null);
  const onLeftClick = () => carouselRef.current && carouselRef.current.prev();
  const onRightClick = useCallback(
    () => carouselRef.current && carouselRef.current.next(),
    [carouselRef]
  );
  const [autoplay, setAutoPlay] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (autoplay && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        onRightClick();
      }, 500);
    } else if (!autoplay && intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoplay, onRightClick]);
  const position = useSelector(state => state.pollution.cropPosition);
  const scale = useSelector(state => state.pollution.cropScale);
  const onPositionChange = useAction(cropPositionChangeAction);
  return (
    <StyledCarousel effect="fade" swipe={false} ref={carouselRef}>
      {images.map(image => (
        <ImageContainer key={image}>
          <AvatarEditor
            image={image}
            width={(width > 600 ? 600 : width) - 32}
            height={(width > 600 ? 600 : width) - 32}
            border={0}
            scale={scale}
            position={position}
            onPositionChange={onPositionChange}
          />
          <AutoplaySwitch checked={autoplay} onChange={e => setAutoPlay(e)} />
          <Direction direction="left" onClick={onLeftClick} />
          <Direction direction="right" onClick={onRightClick} />
        </ImageContainer>
      ))}
    </StyledCarousel>
  );
};

const Item = ({ item, width }) => {
  if (!item.date || !item.levels.length > 0) return null;
  return (
    <ItemContainer>
      <div style={{ display: "flex" }}>
        <Title level={3}>{item.date.format("dddd, Do MMMM YYYY")}</Title>
        <Button
          style={{ marginLeft: 8 }}
          onClick={() => window.open("/neoTEST/myAirPoint123.html", "_blank")}
        >
          View 3D
        </Button>
      </div>
      <Images
        images={item.levels.map(
          level =>
            `/airdata/${
              level < 100
                ? `0${Math.floor(level / 10)}`
                : Math.floor(level / 10)
            }_01H1GALL.png`
        )}
        width={width}
      />
    </ItemContainer>
  );
};

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const event = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => window.removeEventListener(event);
  }, []);
  return width;
};

export const ImageList = () => {
  const items = useSelector(state => state.pollution.items);
  const width = useWindowWidth();
  return (
    <Container>
      {items.map((item, index) => (
        <Item item={item} key={index} width={width} />
      ))}
    </Container>
  );
};
