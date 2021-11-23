import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../helper/hooks";
import { getAllBoards } from "../store/actions/boardsActions";
import Button from "./Button";
import Input from "./Input";
import User from "./User";

interface SignUpProps {
  changeForm: Dispatch<SetStateAction<"SignUp" | "Login">>;
}

const Header = ({ changeForm }: SignUpProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    dispatch(getAllBoards(["title", "cover"], 1, 10, search));
  };

  return (
    <Container>
      <img
        src="/img/logo.svg"
        alt="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />

      {/* IF THERE IS BOARD OPENED SHOW THIS */}
      {false && (
        <BoardGroup>
          <div>
            <BoardName>Board name</BoardName>
          </div>
          <Line></Line>
          <StyledButton text="All board" startIcon="apps" />
        </BoardGroup>
      )}

      {/* IF USER IS LOGGED IN */}
      {user ? (
        <RightGroup>
          <SearchInput
            type="text"
            placeholder="Keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            Element={<SearchButton text="Search" onClick={handleSearch} />}
          />
          <User name={user.name} photo={user.photo} />
        </RightGroup>
      ) : (
        <Auth>
          <p onClick={() => changeForm("Login")}>Login</p>
          <p onClick={() => changeForm("SignUp")}>Sign Up</p>
        </Auth>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  min-height: 6.8rem;
  padding: 0 2.4rem;
`;

const BoardGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;
`;

const BoardName = styled.h3`
  font-weight: 500;
  font-size: 1.8rem;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.white3};
  color: ${({ theme }) => theme.colors.gray3};
  height: 3.2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Line = styled.div`
  width: 2px;
  background: ${({ theme }) => theme.colors.gray5};
  align-self: stretch;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const SearchInput = styled(Input)`
  padding: 2px 2px 2px 1.3rem;
  border: none;
  box-shadow: 1px 5px 15px 3px rgba(0, 0, 0, 0.05);
  height: 3.4rem;
  width: 33.8rem;
`;

const SearchButton = styled(Button)`
  align-self: stretch;
  width: 7.4rem;
  font-weight: 500;
  font-size: 1rem;
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  gap: 1rem;

  p {
    cursor: pointer;
  }
`;

export default Header;
