import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "src/hooks/useOnClickOutside";
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
  padding: 0 20px;
  overflow: hidden;

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

const Content = styled.div`
  position: relative;
  left: 0;
  right: 0;
  width: 90%;
`;

export const Modal = ({ open, onClose, children }) => {
  const [active, setActive] = useState(false);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useOnClickOutside(contentRef, onClose);

  useEffect(() => {
    const { current } = backdropRef;

    const transitionEnd = () => setActive(open);

    if (current) {
      current.addEventListener("transitionend", transitionEnd);
      window.addEventListener("keyup", onClose);
    }

    if (open) {
      window.setTimeout(() => {
        setActive(open);
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd);
      }

      window.removeEventListener("keyup", onClose);
    };
  }, [open, onClose]);

  return (
    <Backdrop className={[active && open && "active"].join(" ")}>
      <CloseButton>
        <CrossIcon src={crossIcon} alt="crossIcon" width={20} height={20} />
      </CloseButton>
      <Content ref={contentRef}>{children}</Content>
    </Backdrop>
  );
};
