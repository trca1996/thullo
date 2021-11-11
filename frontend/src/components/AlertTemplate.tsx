import { useContext } from "react";
import { ThemeContext } from "styled-components";
import Icon from "./Icon";

const AlertTemplate = ({ style, options, message, close }: any) => {
  const { colors } = useContext(ThemeContext);

  return (
    <div
      style={{
        ...style,
        backgroundColor: colors[options.type],
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontWeight: 600,
        fontSize: "1.5rem",
        borderRadius: ".8rem",
        userSelect: "none",
        color: colors.white2,
      }}
    >
      <div style={{ fontSize: "2rem", display: "flex", alignItems: "center" }}>
        {options.type === "info" && <Icon name="info" />}
        {options.type === "success" && <Icon name="check_circle" />}
        {options.type === "error" && <Icon name="error" />}
      </div>
      {message}
      <button
        style={{
          fontSize: "2rem",
          display: "flex",
          alignItems: "center",
          outline: "none",
          border: "none",
          backgroundColor: "transparent",
          color: colors.white2,
        }}
        onClick={close}
      >
        <Icon name="close" />
      </button>
    </div>
  );
};

export default AlertTemplate;
