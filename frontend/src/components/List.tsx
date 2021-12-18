import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { CardType } from "../types/types";
import Button from "./Button";
import Card from "./Card";
import Icon from "./Icon";

const List: React.FC<{
  cards: CardType[];
  list: { title: string; id: string; cardsIds: string[] };
}> = ({ cards, list }) => {
  return (
    <Container>
      <Head>
        <p>{list.title}</p>
        <Icon name="more_horiz" style={{ cursor: "pointer" }} />
      </Head>

      <Droppable droppableId={list.id}>
        {(provided) => (
          <CardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card._id} data={card} index={index} />
            ))}
            {provided.placeholder}
          </CardContainer>
        )}
      </Droppable>

      <StyledButton>
        <span>{cards.length ? "Add another card" : "Add card"}</span>
        <Icon name="add" />
      </StyledButton>
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledButton = styled(Button)`
  width: 241px;
  height: 32px;
  background: ${({ theme }) => theme.colors.blue2};
  color: ${({ theme }) => theme.colors.blue1};
  border-radius: 8px;
  justify-content: space-between;
`;

export default List;
