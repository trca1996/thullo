import styled from "styled-components";
interface ButtonProps {
  text?: string;
  textStyle?: object;
  startIcon?: string;
  endIcon?: string;
  backgroundColor?: string;
  color?: string;
  style?: object;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: any) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  style,
  type,
  onClick,
  className,
  backgroundColor,
  color,
  children,
}) => {
  return (
    <StyledButton
      style={{ backgroundColor, color, ...style }}
      className={className}
      type={type}
      onClick={onClick}
    >
      {children}
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
  gap: 1rem;
  cursor: pointer;
`;

export default Button;
