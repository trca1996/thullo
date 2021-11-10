import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";
import Input from "./Input";
import User from "./User";

interface SignUpProps {
  changeForm: Dispatch<SetStateAction<"SignUp" | "Login">>;
}

const Header = ({ changeForm }: SignUpProps) => {
  const { colors } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // SEARCH...
    console.log(search);
  };

  return (
    <Container>
      <img src="/img/logo.svg" alt="logo" />

      {/* IF THERE IS BOARD OPENED SHOW THIS */}
      {false && (
        <BoardGroup>
          <div>
            <BoardName>Board name</BoardName>
          </div>
          <Line></Line>
          <Button
            text="All board"
            startIcon="apps"
            style={{
              background: colors.white3,
              color: colors.gray3,
              height: "3.2rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          />
        </BoardGroup>
      )}

      {/* IF USER IS LOGGED IN */}
      {false ? (
        <RightGroup>
          <Input
            type="text"
            placeholder="Keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "2px 2px 2px 1.3rem",
              border: "none",
              boxShadow: "1px 5px 15px 3px rgba(0, 0, 0, 0.05)",
              height: "3.4rem",
              width: "33.8rem",
            }}
            Element={
              <Button
                text="Search"
                style={{
                  alignSelf: "stretch",
                  width: "7.4rem",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
                onClick={handleSearch}
              />
            }
          />
          <User />
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
