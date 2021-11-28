import React from "react";
import styled from "styled-components";

const MenuContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white1};
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  position: absolute;
  top: 4rem;
`;

export default MenuContainer;
