import styled from "styled-components";
import { ListPros } from "../pages/Board";
import Button from "./Button";
import Card from "./Card";
import Icon from "./Icon";

export interface CardProps {
  _id: string;
  title: string;
  description: string;
  cover: string;
  list: [];
  members: [];
  attachments: [];
  comments: [];
  labels: [];
}

const List: React.FC<{ data: ListPros }> = ({ data }) => {
  return (
    <Container>
      <Head>
        <p>{data.title}</p>
        <Icon name="more_horiz" style={{ cursor: "pointer" }} />
      </Head>

      {data.cards.map((card: CardProps) => (
        <Card key={card._id} data={card} />
      ))}

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
