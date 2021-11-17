import { useEffect, useState } from "react";
import styled from "styled-components";
import BoardCard from "../components/BoardCard";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useAppDispatch, useAppSelector } from "../helper/hooks";
import { getAllBoards } from "../store/actions/boardsActions";

const AllBoards = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
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
          <Button text="Add" startIcon="add" onClick={handleOpenModal} />
        </Top>
        <BoardsContainer>
          {boards.map((board: any) => (
            <BoardCard
              key={board.id}
              cover={board.cover}
              title={board.title}
              members={board.members}
            />
          ))}
        </BoardsContainer>
      </Container>

      <Modal open={openModal} handleClose={handleCloseModal}>
        <p>This is modals childrens</p>
        <p>hello</p>
        <div>hello</div>
        <p>This type is good!</p>
      </Modal>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 18rem;
  gap: 3.5rem;

  h6 {
    font-size: 1.6rem;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

export default AllBoards;
