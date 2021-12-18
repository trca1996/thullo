import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled, { ThemeContext } from "styled-components";
import Button from "../components/Button";
import List from "../components/List";
import MemberImage from "../components/MemberImage";
import { useAppDispatch, useAppSelector } from "../helper/hooks";
import { changeCardPosition, getBoard } from "../store/actions/boardsActions";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import MenuContainer from "../components/MenuContainer";
import Icon from "../components/Icon";

const Board: React.FC = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { colors } = useContext(ThemeContext);
  const board = useAppSelector((state) => state.currentBoard);
  const boardListsState = useAppSelector((state) => state.boardListState);
  const [privateOpen, setPrivateOpen] = useState(false);

  useEffect(() => {
    if (boardId) dispatch(getBoard(boardId));
  }, [dispatch, boardId]);

  useEffect(() => {
    const closePrivateModal = () => {
      if (privateOpen) setPrivateOpen(false);
    };
    window.addEventListener("click", closePrivateModal);
    return () => {
      window.removeEventListener("click", closePrivateModal);
    };
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      changeCardPosition(destination, source, draggableId, boardId as string)
    );
  };
  return (
    <Container>
      <HeadContainer>
        <div style={{ position: "relative" }}>
          <Button
            backgroundColor={`${colors.white3}`}
            color={`${colors.gray3}`}
            style={{ fontWeight: "bold" }}
            onClick={() => setPrivateOpen((curr) => !curr)}
          >
            <Icon name="lock" />
            <span>Private</span>
          </Button>
          {privateOpen && (
            <MenuContainer style={{ minWidth: "max-content", gap: "1rem" }}>
              <Visibility>Visibility</Visibility>
              <PrivateParagraph>Choose who see to this board.</PrivateParagraph>
              <Button
                style={{ flexDirection: "column" }}
                backgroundColor={
                  !board?.private ? colors.white3 : "transparent"
                }
                color={colors.gray2}
              >
                <ButtonContent>
                  <Icon name="public" />
                  <span>Public</span>
                </ButtonContent>
                <ButtonDescription>
                  Anyone on the internet can see this
                </ButtonDescription>
              </Button>
              <Button
                style={{ flexDirection: "column" }}
                backgroundColor={board?.private ? colors.white3 : "transparent"}
                color={colors.gray2}
              >
                <ButtonContent>
                  <Icon name="lock" />
                  <span>Private</span>
                </ButtonContent>
                <ButtonDescription>
                  Only board members can see this
                </ButtonDescription>
              </Button>
            </MenuContainer>
          )}
        </div>
        <Members>
          {board?.members?.map((member) => (
            <MemberImage
              style={{ width: "3.2rem", height: "3.2rem" }}
              key={member._id}
              name={member.name}
              photo={member.photo}
            />
          ))}
          <Button style={{ fontWeight: "bold" }}>
            <Icon name="person_add_alt" />
          </Button>
        </Members>
        <Button
          backgroundColor={`${colors.white3}`}
          color={`${colors.gray3}`}
          style={{ fontWeight: "bold", marginLeft: "auto" }}
        >
          <Icon name="more_horiz" />
          <span>Show Menu</span>
        </Button>
      </HeadContainer>
      <MainContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {boardListsState?.listOrder.map((listId) => {
            const list = boardListsState.lists[listId];
            const cards = list.cardsIds.map(
              (cardId) => boardListsState.cards[cardId]
            );

            return <List key={list.id} list={list} cards={cards} />;
          })}
        </DragDropContext>

        <StyledButton textStyle={{ flex: "none" }}>
          <span>{board?.lists?.length ? "Add another list" : "Add list"}</span>
          <Icon name="add" />
        </StyledButton>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Visibility = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray2};
`;

const PrivateParagraph = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white3};
  border-radius: 2.4rem;
  padding: 2.8rem 2.4rem;
  display: flex;
  gap: 2rem;
`;

const StyledButton = styled(Button)`
  width: 241px;
  height: 32px;
  background: ${({ theme }) => theme.colors.blue2};
  color: ${({ theme }) => theme.colors.blue1};
  border-radius: 8px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: flex-start;
`;

const ButtonDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray3};
`;

export default Board;
