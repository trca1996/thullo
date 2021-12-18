import { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../helper/hooks";
import { logout } from "../store/actions/authActions";
import Button from "./Button";
import Icon from "./Icon";

interface UserProps {
  photo: string;
  name: string;
}

const User = ({ photo, name }: UserProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const { colors } = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const closeExtend = () => {
      if (isExpanded) setIsExpanded(false);
    };

    window.addEventListener("click", closeExtend);
    return () => {
      window.removeEventListener("click", closeExtend);
    };
  });

  return (
    <Container onClick={() => setIsExpanded((curr) => !curr)}>
      <Image src={`/img/users/${photo}`} alt="user" />

      <p>{name}</p>

      <Icon name={isExpanded ? "expand_less" : "expand_more"} />

      {isExpanded && (
        <Expand>
          <Button
            style={{
              background: pathname.startsWith("/profile")
                ? colors.gray5
                : "transparent",
              color: colors.gray1,
              fontSize: "1.4rem",
            }}
            onClick={() => navigate("/profile")}
          >
            <Icon name="account_circle" />
            <span>My Profile</span>
          </Button>

          <Button
            style={{
              background: pathname === "/" ? colors.gray5 : "transparent",
              color: colors.gray1,
              fontSize: "1.4rem",
            }}
            onClick={() => navigate("/")}
          >
            <Icon name="dashboard" />
            <span>My Boards</span>
          </Button>

          <hr style={{ backgroundColor: colors.gray5 }} />

          <Button
            style={{
              background: "transparent",
              color: colors.red,
              fontSize: "1.4rem",
            }}
            onClick={() => dispatch(logout())}
          >
            <Icon name="logout" />
            <span>Logout</span>
          </Button>
        </Expand>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  position: relative;
  user-select: none;
  cursor: pointer;
  min-width: 14rem;
`;

const Image = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.8rem;
`;

const Expand = styled.div`
  position: absolute;
  top: 40px;
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
