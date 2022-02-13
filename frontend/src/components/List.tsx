import { useEffect, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useAppDispatch, useAppSelector, useAutoClose } from "../helper/hooks";
import { editList, removeList } from "../store/actions/boardsActions";
import { CardType } from "../types/types";
import Button from "./Button";
import Card from "./Card";
import Icon from "./Icon";
import Input from "./Input";
import MenuContainer from "./MenuContainer";

const List: React.FC<{
  cards: CardType[];
  list: { title: string; id: string; cardsIds: string[] };
}> = ({ cards, list }) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.currentBoard);
  const listTitleRef = useRef<HTMLInputElement>(null);
  const [isListMenuOpen, setIsListMenuOpen] = useState(false);
  const [listTitle, setListTitle] = useState({
    isEditable: false,
    value: list.title,
  });

  const handleSubmitNewTitle = (
    listTitle: string,
    listId: string,
    boardId: string
  ) => {
    setListTitle((curr) => ({ ...curr, isEditable: false }));
    if (list.title === listTitle) return;
    dispatch(editList(listTitle, listId, boardId));
  };

  useEffect(() => {
    if (listTitle.isEditable) {
      listTitleRef.current?.focus();
    }
  }, [listTitle.isEditable]);

  const closeListMenu = () => {
    if (isListMenuOpen) setIsListMenuOpen(false);
    if (listTitle.isEditable) {
      if (listTitle.value.length <= 5) return;
      handleSubmitNewTitle(listTitle.value, list.id, board.id as string);
    }
  };
  useAutoClose(closeListMenu);

  return (
    <Container>
      <Head>
        <EditContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {listTitle.isEditable && <p>Edit - min 5 characters</p>}
          <ListTitleInput
            type="text"
            value={listTitle.value}
            onChange={(e) =>
              setListTitle((curr) => ({ ...curr, value: e.target.value }))
            }
            disabled={!listTitle.isEditable}
            inputRef={listTitleRef}
            submitFn={() => {
              if (listTitle.value.length <= 5) return;
              handleSubmitNewTitle(
                listTitle.value,
                list.id,
                board.id as string
              );
            }}
          />
        </EditContainer>
        <div onClick={() => setIsListMenuOpen((curr) => !curr)}>
          <Icon name="more_horiz" style={{ cursor: "pointer" }} />
        </div>
        {isListMenuOpen && (
          <ListMenuContainer>
            <p
              onClick={() =>
                setListTitle((curr) => ({ ...curr, isEditable: true }))
              }
            >
              Rename
            </p>
            <hr />
            <p
              onClick={() => {
                dispatch(removeList(list.id, board.id as string));
              }}
            >
              Delete this list
            </p>
          </ListMenuContainer>
        )}
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
  position: relative;
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

const ListMenuContainer = styled(MenuContainer)`
  right: -1rem;
  padding: 1.4rem 1.2rem;
  gap: 1rem;
  min-width: 15rem;

  p {
    color: ${({ theme }) => theme.colors.gray3};
    cursor: pointer;
  }

  hr {
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`;

const EditContainer = styled.div`
  position: relative;

  p {
    position: absolute;
    top: -2rem;
    font-size: 1.2rem;
    padding: 0 1rem;
  }
`;

const ListTitleInput = styled(Input)`
  font-weight: 500;
  font-size: 1.4rem;
`;

export default List;
