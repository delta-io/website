import React, { useEffect, useState } from "react";
import styled from "styled-components";
import crossIcon from "./cross_icon.svg";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.88);
  opacity: 0;
  transition: opacity 30ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px;
  
  ${(props) =>
    props.theme.mediaBreakpointUp("sm")(`
    padding: 20px 80px`)}
  
  
  & .modal-content {
    transform: translateY(100px);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    margin: auto;
  }

  &.active {
    transition-duration: 500ms;
    transition-delay: 0ms;
    opacity: 1;
    height: 100%;

    & .modal-content {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
  }

  &.not-active {
    transition-duration: 500ms;
    transition-delay: 0ms;
    opacity: 0;
    height: 100%;
`;

const CloseButton = styled.button`
  position: fixed;
  width: 40px;
  height: 40px;
  top: 20px;
  right: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const CrossIcon = styled.img``;

export const Modal = ({ isOpenModal, onClose, children }) => {
  const [active, setActive] = useState(false);

  const closeModalHandler = () => {
    setActive(false);

    window.setTimeout(() => {
      onClose();
    }, 1000);
  };

  useEffect(() => {
    if (isOpenModal) {
      window.setTimeout(() => {
        setActive(isOpenModal);
      }, 10);
    }
  }, [isOpenModal, onClose]);

  return (
    <Backdrop
      className={[active && isOpenModal ? "active" : "not-active"].join(" ")}
    >
      <CloseButton onClick={closeModalHandler}>
        <CrossIcon src={crossIcon} alt="crossIcon" width={20} height={20} />
      </CloseButton>
      {children}
    </Backdrop>
  );
};
