import styled from "styled-components";
import { labelProps } from "./Card";

const Label: React.FC<{ data: labelProps }> = ({ data: { name, color } }) => {
  return (
    <Container color={color}>
      <Overlay>
        <p>{name}</p>
      </Overlay>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  border-radius: 0.8rem;
  background: ${({ color }) => color};
  color: ${({ color }) => color};
  width: max-content;
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  background: #ffffffc0;
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.9rem;
`;

export default Label;
