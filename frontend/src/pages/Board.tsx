import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled, { ThemeContext } from "styled-components";
import Button from "../components/Button";
import List from "../components/List";
import MemberImage from "../components/MemberImage";
import { useAppDispatch, useAppSelector } from "../helper/hooks";
import {
  addMember,
  changeBoardVisibility,
  changeCardPosition,
  getBoard,
} from "../store/actions/boardsActions";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import MenuContainer from "../components/MenuContainer";
import Icon from "../components/Icon";
import { useSocket } from "../context/SocketProvider";
import { CHANGE_CARD_POSITION_STATE } from "../store/constants/boardsConstants";
import Input from "../components/Input";
import BoardSideMenu from "../components/BoardSideMenu";

const Board: React.FC = () => {
  const socket = useSocket();
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { colors } = useContext(ThemeContext);
  const board = useAppSelector((state) => state.currentBoard);
  const user = useAppSelector((state) => state.user);
  const boardListsState = useAppSelector((state) => state.boardListState);
  const [privateOpen, setPrivateOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const userSearchRef = useRef<HTMLInputElement>(null);
  const [addUserEmail, setAddUserEmail] = useState("");
  const [showBoardMenu, setShowBoardMenu] = useState(false);

  useEffect(() => {
    socket.emit("join-board", boardId);

    socket.on("change-position", (result) => {
      dispatch({
        type: CHANGE_CARD_POSITION_STATE,
        payload: {
          destination: result.destination,
          source: result.source,
          cardId: result.draggableId,
        },
      });
    });

    return () => {
      socket.off("change-position");
      socket.emit("leave-board", boardId);
    };
  });

  useEffect(() => {
    if (boardId) dispatch(getBoard(boardId));
  }, [dispatch, boardId]);

  useEffect(() => {
    const closeMenuContainer = () => {
      if (privateOpen) setPrivateOpen(false);
      if (addMemberOpen) setAddMemberOpen(false);
    };
    window.addEventListener("click", closeMenuContainer);
    return () => {
      window.removeEventListener("click", closeMenuContainer);
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

    socket.emit(
      "change-card-position",
      {
        destination,
        source,
        draggableId,
        boardId,
      },
      boardId
    );
  };

  useEffect(() => {
    if (addMemberOpen) userSearchRef.current?.focus();
  }, [addMemberOpen]);

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
            <span>{board?.isPrivate ? "Private" : "Public"}</span>
          </Button>
          {privateOpen && board?.admin?._id === user?._id && (
            <MenuContainer style={{ minWidth: "max-content", gap: "1rem" }}>
              <MenuContainerTitle>Visibility</MenuContainerTitle>
              <MenuContainerParagraph>
                Choose who see to this board.
              </MenuContainerParagraph>

              <Button
                style={{ flexDirection: "column" }}
                backgroundColor={
                  !board?.isPrivate ? colors.white3 : "transparent"
                }
                color={colors.gray2}
                onClick={() => {
                  if (board?.id)
                    dispatch(changeBoardVisibility(false, board.id));
                }}
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
                backgroundColor={
                  board?.isPrivate ? colors.white3 : "transparent"
                }
                color={colors.gray2}
                onClick={() => {
                  if (board?.id)
                    dispatch(changeBoardVisibility(true, board.id));
                }}
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
          {board.members.length > 0 &&
            board.members.map((member) => (
              <MemberImage
                style={{ width: "3.2rem", height: "3.2rem" }}
                key={member._id}
                name={member.name}
                photo={member.photo}
              />
            ))}
          <Button
            style={{ fontWeight: "bold" }}
            onClick={() => setAddMemberOpen((curr) => !curr)}
          >
            <Icon name="person_add_alt" />
          </Button>
          {addMemberOpen && (
            <MenuContainer
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              style={{ minWidth: "max-content", gap: "1rem" }}
            >
              <MenuContainerTitle>Invite to Board</MenuContainerTitle>
              <MenuContainerParagraph>
                Search users you want to invite to
              </MenuContainerParagraph>
              <SearchUser
                type="text"
                placeholder="User email..."
                inputRef={userSearchRef}
                value={addUserEmail}
                onChange={(e) => setAddUserEmail(e.target.value)}
                Element={
                  <Button
                    onClick={() => {
                      dispatch(addMember(addUserEmail, boardId as string));
                      setAddMemberOpen(false);
                      setAddUserEmail("");
                    }}
                  >
                    <Icon name="add" />
                  </Button>
                }
              />
            </MenuContainer>
          )}
        </Members>
        <Button
          backgroundColor={`${colors.white3}`}
          color={`${colors.gray3}`}
          style={{ fontWeight: "bold", marginLeft: "auto" }}
          onClick={() => setShowBoardMenu(true)}
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

      <BoardSideMenu
        showBoardMenu={showBoardMenu}
        board={board}
        setShowBoardMenu={setShowBoardMenu}
      />
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
  position: relative;
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const MenuContainerTitle = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray2};
`;

const MenuContainerParagraph = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const SearchUser = styled(Input)`
  padding: 2px 2px 2px 10px;
  box-shadow: 1px 5px 15px 3px rgba(0, 0, 0, 0.05);
  border: none;
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
