import styled from "styled-components";

interface IconProps {
  name: string;
  className?: string;
  style?: object;
}

const Icon = ({ name, className, style }: IconProps) => {
  return (
    <Container style={{ ...style }} className={`material-icons ${className}`}>
      {name}
    </Container>
  );
};

const Container = styled.span`
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Icon;
