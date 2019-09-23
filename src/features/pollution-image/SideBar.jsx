import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAction } from "hooks/useAction";
import {
  toggleSidebarAction,
  itemChangeAction,
  itemRemoveAction,
  itemAddAction,
  cropScaleChangeAction
} from "./redux";
import { Button, Divider, DatePicker, Select, Typography, Slider } from "antd";
import ptt from "assets/pttlogo.png";

const { Text } = Typography;
const { Option } = Select;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  z-index: 1100;
  background-color: white;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  @media (max-width: 800px) {
    transform: translate3d(${props => (props.open ? 0 : -400)}px, 0, 0);
  }
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 16px 0;
`;

const Spacer = styled.div`
  width: 300px;
  flex-shrink: 0;
  height: 100vh;
  @media (max-width: 800px) {
    width: 0px;
  }
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  @media (min-width: 801px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  width: 60%;
  padding: 0 16px;
`;
const LogoImage = styled.img`
  width: 100%;
  height: auto;
`;
const ActionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 0 16px;
`;
const ControllerContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 16px;
  .remove-button {
    opacity: 0;
    transition: 0.1s;
    transition-delay: 0.2s;
  }
  &:hover {
    .remove-button {
      opacity: 1;

      transition: 0s;
      transition-delay: 0s;
    }
  }
`;
const RemoveButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(50%, -50%, 0);
`;

const DatePickerContainer = styled.div`
  margin-bottom: 8px;
  width: 100%;
  .ant-calendar-picker {
    width: 100%;
  }
`;

const ZoomActionContainer = styled.div`
  width: 100%;
  padding: 0 16px;
`;

const RemoveButton = props => {
  return (
    <RemoveButtonContainer>
      <Button
        type="danger"
        shape="circle"
        icon="close"
        size="small"
        {...props}
      />
    </RemoveButtonContainer>
  );
};

const Logo = () => {
  return (
    <LogoContainer>
      <LogoImage src={ptt} />
    </LogoContainer>
  );
};

const CloseButton = () => {
  const toggleSidebar = useAction(toggleSidebarAction);
  return (
    <CloseButtonContainer>
      <Button
        type="link"
        shape="circle"
        icon="close"
        size="large"
        onClick={toggleSidebar}
      />
    </CloseButtonContainer>
  );
};

const levelsMapper = {
  0: 10,
  1: 20,
  2: 25,
  3: 30,
  4: 35,
  5: 40,
  6: 45,
  7: 50,
  8: 60,
  9: 70,
  10: 80,
  11: 90,
  12: 100,
  13: 110,
  14: 120,
  15: 130,
  16: 140,
  17: 150,
  18: 160,
  19: 170,
  20: 180,
  21: 190,
  22: 200,
  23: 210,
  24: 220,
  25: 230,
  26: 240,
  27: 250,
  28: 260,
  29: 270,
  30: 280,
  31: 300,
  32: 310,
  33: 320,
  34: 330,
  35: 340,
  36: 350,
  37: 360,
  38: 370,
  39: 380,
  40: 390,
  41: 400
};

const levels = new Array(42).fill(0).map((_, index) => (
  <Option key={index} value={levelsMapper[index]}>
    {levelsMapper[index]} m
  </Option>
));

const Controller = ({ item, index }) => {
  const onChange = useAction(itemChangeAction);
  const onRemove = useAction(itemRemoveAction);
  const onDatePickerChange = date => {
    onChange({ ...item, date }, index);
  };
  const onRemoveButtonClick = () => {
    onRemove(item, index);
  };
  const onLevelsChange = levels => {
    onChange({ ...item, levels }, index);
  };
  return (
    <ControllerContainer>
      <RemoveButton className="remove-button" onClick={onRemoveButtonClick} />
      <DatePickerContainer>
        <Text strong>Select Date</Text>
        <DatePicker
          onChange={onDatePickerChange}
          value={item.date}
          disabledDate={date =>
            date.date() !== 23 || date.month() !== 8 || date.year() !== 2019
          }
          format="DD MMMM YYYY"
        />
      </DatePickerContainer>
      <Text strong>Select Height</Text>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Height"
        value={item.levels}
        onChange={onLevelsChange}
      >
        {levels}
      </Select>
    </ControllerContainer>
  );
};

const AddItem = () => {
  const onClick = useAction(itemAddAction);
  return (
    <Button type="primary" shape="round" icon="plus" onClick={onClick}>
      Add
    </Button>
  );
};

const Action = () => {
  const items = useSelector(state => state.pollution.items);
  return (
    <ActionContainer>
      {items.map((item, index) => (
        <Controller item={item} index={index} key={index} />
      ))}
      <AddItem />
    </ActionContainer>
  );
};

const ZoomAction = () => {
  const scale = useSelector(state => state.pollution.cropScale);
  const onScaleChange = useAction(cropScaleChangeAction);
  return (
    <ZoomActionContainer>
      <Text strong>Zoom</Text>
      <Slider
        value={scale * 100}
        min={100}
        max={500}
        onChange={nextScale => onScaleChange(nextScale / 100)}
      />
    </ZoomActionContainer>
  );
};

export const SideBar = () => {
  const sidebar = useSelector(state => state.pollution.sidebar);
  return (
    <Spacer>
      <Container open={sidebar}>
        <Inner>
          <CloseButton />
          <Logo />
          <Divider />
          <ZoomAction />
          <Divider />
          <Action />
        </Inner>
      </Container>
    </Spacer>
  );
};
