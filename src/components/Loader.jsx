import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #00add4;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
