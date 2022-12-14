import React from "react";
import styled from "styled-components";

const ButtonControl = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  cursor: pointer;
  top: 25%;
  z-index: 10;
  ${(props) => {
    console.log("Проверка", props.direction === "left");
    return props.direction === "left" ? `left: 0` : "right: 0";
  }}
`;

export const ControlSwiperButton = ({ direction }) => (
  <ButtonControl props={direction}></ButtonControl>
);
