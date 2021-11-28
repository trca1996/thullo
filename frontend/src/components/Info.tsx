import styled from "styled-components";
import Icon from "./Icon";

const Info: React.FC<{
  icon: string;
  info: number;
  className?: string;
  style?: object;
}> = ({ icon, info, className, style }) => {
  return (
    <Container className={className} style={{ ...style }}>
      <Icon name={icon} />
      <p>{info}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 1.4rem;
  gap: 2px;
`;

export default Info;
