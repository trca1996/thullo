import { useContext } from "react";
import { ThemeContext } from "styled-components";
import Icon from "./Icon";

interface ButtonProps {
  text: string;
  textStyle?: object;
  startIcon?: string;
  endIcon?: string;
  backgroundColor?: string;
  color?: string;
  style?: object;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button = ({
  text,
  textStyle,
  startIcon,
  endIcon,
  backgroundColor,
  color,
  style,
  type,
  onClick,
}: ButtonProps) => {
  const { colors } = useContext(ThemeContext);

  const buttonStyle = {
    backgroundColor: backgroundColor || colors.blue1,
    color: color || colors.white1,
    outline: "none",
    border: "none",
    borderRadius: "0.8rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    cursor: "pointer",
  };

  return (
    <button style={{ ...buttonStyle, ...style }} type={type} onClick={onClick}>
      {startIcon && <Icon name={startIcon} />}
      <span style={{ flex: 1, textAlign: "center", ...textStyle }}>{text}</span>
      {endIcon && <Icon name={endIcon} />}
    </button>
  );
};

export default Button;
