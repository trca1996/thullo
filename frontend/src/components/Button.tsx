import styled from "styled-components";
import Icon from "./Icon";

interface ButtonProps {
  text?: string;
  textStyle?: object;
  startIcon?: string;
  endIcon?: string;
  backgroundColor?: string;
  color?: string;
  style?: object;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  text,
  textStyle,
  startIcon,
  endIcon,
  style,
  type,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <StyledButton
      style={{ ...style }}
      className={className}
      type={type}
      onClick={onClick}
    >
      {startIcon && <Icon name={startIcon} />}
      {text && (
        <span style={{ flex: 1, textAlign: "center", ...textStyle }}>
          {text}
        </span>
      )}
      {endIcon && <Icon name={endIcon} />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue1};
  color: ${({ theme }) => theme.colors.white1};
  outline: none;
  border: none;
  border-radius: 0.8rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
`;

export default Button;
