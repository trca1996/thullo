import React, { ReactNode } from "react";
import styled from "styled-components";

const EditorButton: React.FC<{
  label: string;
  onToggle: (style: string) => void;
  active: boolean;
  style: string;
  Icon: ReactNode;
}> = (props) => {
  const onToggle = (e: any) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <Container active={props.active} onMouseDown={onToggle}>
      {props.Icon}
    </Container>
  );
};

const Container = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? "#5890ff" : "#999")};
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
  display: inline-block;
  font-size: 1.8rem;
`;

export default EditorButton;
