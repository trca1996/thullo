import React, { ReactNode, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";

const SectionHeading: React.FC<{
  Icon: ReactNode;
  title: string;
  buttonTitle?: string;
  ButtonIcon?: ReactNode;
}> = ({ buttonTitle, ButtonIcon, Icon, title }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <Container>
      {Icon}
      <p>{title}</p>
      {buttonTitle && (
        <Button
          backgroundColor="transparent"
          color={colors.gray4}
          style={{
            border: `1px solid ${colors.gray4}`,
            padding: "0.4rem 1.2rem",
            fontSize: "1rem",
          }}
        >
          {ButtonIcon}
          {buttonTitle}
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4};
`;

export default SectionHeading;
