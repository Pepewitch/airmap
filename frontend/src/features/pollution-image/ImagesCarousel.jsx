import React, { useRef, useCallback, useState, useEffect } from "react";
import { Button, Carousel, Switch } from "antd";
import styled from "styled-components";
import AvatarEditor from "react-avatar-editor";
import { cropPositionChangeAction } from "./redux";
import { useAction } from "hooks/useAction";
import { useSelector } from "react-redux";

const ImageContainer = styled.div`
  padding-bottom: 17px;
  background: #1890ff;
  position: relative;
`;

const StyledCarousel = styled(Carousel)`
  .slick-slide:not(.slick-active) {
    transition-delay: ${props => props.transitionDelay}ms !important;
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

const transitionDelay = 600;

export const ImagesCarousel = ({ images, width }) => {
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
      }, transitionDelay);
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
  const responsiveWidth =
    (width > 800 ? (width > 1300 ? 1000 : width - 300) : width) - 32;
  return (
    <StyledCarousel
      effect="fade"
      swipe={false}
      ref={carouselRef}
      transitionDelay={transitionDelay}
    >
      {images.map(image => (
        <ImageContainer key={image}>
          <AvatarEditor
            image={image}
            width={responsiveWidth}
            height={responsiveWidth}
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
