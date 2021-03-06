import React from "react";
import styled from "styled-components";

interface MenuContainerProps {
  style?: object;
  className?: string;
  onClick?: (e: any) => void;
}

const MenuContainer: React.FC<MenuContainerProps> = ({
  children,
  style,
  className,
  onClick,
}) => {
  return (
    <Container onClick={onClick} className={className} style={{ ...style }}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white1};
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  position: absolute;
  top: 4rem;
  z-index: 500;
`;

export default MenuContainer;
