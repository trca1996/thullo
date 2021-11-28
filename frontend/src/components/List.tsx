import styled from "styled-components";
import { ListPros } from "../pages/Board";
import Button from "./Button";
import Icon from "./Icon";

const List: React.FC<{ data: ListPros }> = ({ data }) => {
  console.log(data);

  return (
    <Container>
      <Head>
        <p>{data.title}</p>
        <Icon name="more_horiz" style={{ cursor: "pointer" }} />
      </Head>

      <StyledButton
        text={data.cards.length ? "Add another card" : "Add card"}
        endIcon="add"
        textStyle={{ flex: "none" }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
`;

const StyledButton = styled(Button)`
  width: 241px;
  height: 32px;
  background: ${({ theme }) => theme.colors.blue2};
  color: ${({ theme }) => theme.colors.blue1};
  border-radius: 8px;
`;

export default List;
