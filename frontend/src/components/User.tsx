import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";
import Icon from "./Icon";

interface UserProps {
  photo?: string;
}

const User = ({ photo }: UserProps) => {
  const { colors } = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container onClick={() => setIsExpanded((curr) => !curr)}>
      <Image src={photo || "/img/users/default.jpg"} alt="user" />

      <p>Igor Trnko</p>

      <Icon name={isExpanded ? "expand_less" : "expand_more"} />

      {isExpanded && (
        <Expand>
          <Button
            text="My Profile"
            startIcon="account_circle"
            style={{
              // change bg color on change page!!!
              background: colors.gray5,
              color: colors.gray1,
              fontSize: "1.4rem",
            }}
            onClick={() => console.log("Go to user Account Details Page")}
          />

          <Button
            text="My Boards"
            startIcon="dashboard"
            style={{
              background: "transparent",
              color: colors.gray1,
              fontSize: "1.4rem",
            }}
            onClick={() => console.log("Get only my boards!")}
          />

          <hr style={{ backgroundColor: colors.gray5 }} />

          <Button
            text="Logout"
            startIcon="logout"
            style={{
              background: "transparent",
              color: colors.red,
              fontSize: "1.4rem",
            }}
            onClick={() => console.log("LOGOUT")}
          />
        </Expand>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  position: relative;
  user-select: none;
  cursor: pointer;
`;

const Image = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.8rem;
`;

const Expand = styled.div`
  position: absolute;
  bottom: -140px;
  z-index: 100;
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white2};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

export default User;
