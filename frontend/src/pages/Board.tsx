import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "../components/Button";
import List from "../components/List";
import MemberImage from "../components/MemberImage";
import { useAppSelector } from "../helper/hooks";

export interface ListPros {
  id: string;
  _id: string;
  cards: [];
  title: string;
}

const Board: React.FC = () => {
  //   const { boardId } = useParams();
  //   const dispatch = useAppDispatch();
  const { colors } = useContext(ThemeContext);
  const board = useAppSelector((state) => state.currentBoard);

  // console.log(board);

  return (
    <Container>
      <HeadContainer>
        <Button
          text="Private"
          startIcon="lock"
          backgroundColor={`${colors.white3}`}
          color={`${colors.gray3}`}
          style={{ fontWeight: "bold" }}
        />
        <Members>
          {board?.members.map(
            (member: { name: string; photo: string; _id: string }) => (
              <MemberImage
                style={{ width: "3.2rem", height: "3.2rem" }}
                key={member._id}
                name={member.name}
                photo={member.photo}
              />
            )
          )}
          <Button startIcon="person_add_alt" style={{ fontWeight: "bold" }} />
        </Members>
        <Button
          text="Private"
          startIcon="more_horiz"
          backgroundColor={`${colors.white3}`}
          color={`${colors.gray3}`}
          style={{ fontWeight: "bold", marginLeft: "auto" }}
        />
      </HeadContainer>
      <MainContainer>
        {board?.lists.map((list: ListPros) => (
          <List key={list.id} data={list} />
        ))}

        <StyledButton
          text={board?.lists.length ? "Add another list" : "Add list"}
          endIcon="add"
          textStyle={{ flex: "none" }}
        />
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

export default Board;
