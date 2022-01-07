import { ReactChild } from "react";
import styled, { keyframes } from "styled-components";
import ReactDOM from "react-dom";

interface ModalProps {
  children?: ReactChild | ReactChild[];
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ children, open, handleClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <>
      {open && (
        <Shadow onClick={handleClose}>
          <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
        </Shadow>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};

const animation = keyframes`
    0% { opacity: 0 }
    100% { opacity: 100% }
`;

const Shadow = styled.div`
  animation-name: ${animation};
  animation-duration: 0.25s;
  animation-timing-function: ease-in-out;
  position: absolute;
  top: 0;
  z-index: 500;
  width: 100%; // FIX
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  user-select: none;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white1};
  box-shadow: 0px 2px 4px;
  border-radius: 0.8rem;
  padding: 2.4rem;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: 600;
`;

export default Modal;
