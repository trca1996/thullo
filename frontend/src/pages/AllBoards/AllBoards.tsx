import { useEffect, useState } from "react";
import AddBoardModal from "../../components/AddBoardModal";
import BoardCard from "../../components/BoardCard";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { useAppDispatch, useAppSelector } from "../../helper/hooks";
import { getAllBoards } from "../../store/actions/boardsActions";
import { BoardsContainer, Container, Top } from "./allBoards.style";

const AllBoards = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(getAllBoards(["title", "cover"]));
  }, [dispatch]);

  return (
    <>
      <Container>
        <Top>
          <h6>All Boards</h6>
          <Button onClick={handleOpenModal}>
            <Icon name="add" />
            <span>Add</span>
          </Button>
        </Top>
        <BoardsContainer>
          {boards.map((board: any) => (
            <BoardCard
              key={board.id}
              id={board.id}
              cover={board.cover}
              title={board.title}
              members={board.members}
            />
          ))}
        </BoardsContainer>
      </Container>
      <AddBoardModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default AllBoards;
