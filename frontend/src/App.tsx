import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import { checkUser } from "./store/actions/authActions";
import { useAppDispatch, useAppSelector } from "./helper/hooks";
import { useAlert } from "react-alert";
import { errorReset, successReset } from "./store/actions/statusMessageActions";
import Loading from "./components/Loading";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { resetAllBoards, resetBoard } from "./store/actions/boardsActions";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthRoutes from "./components/AuthRoutes";
import "draft-js/dist/Draft.css";
import AllBoards from "./pages/AllBoards";
import Board from "./pages/Board";
import EditProfile from "./pages/EditProfile";
import MyProfile from "./pages/MyProfile";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { success, error } = useAppSelector((state) => state.status);
  const loading = useAppSelector((state) => state.loading);

  const alert = useAlert();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorReset);
    }
    if (success) {
      alert.success(success);
      dispatch(successReset);
    }
  }, [dispatch, alert, error, success]);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname.startsWith("/profile")
    ) {
      dispatch(resetBoard);
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (!user) {
      dispatch(resetAllBoards);
    }
  }, [user, dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Loading disabled={!loading} />
        <Header />
      </HeaderContainer>

      <BodyContainer>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<AllBoards />} />
            <Route path="/:boardId" element={<Board />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
          </Route>
          <Route path="*" element={<p>NOT FOUND!</p>} />
        </Routes>
      </BodyContainer>
    </div>
  );
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white1};
  z-index: 1000;
`;

const BodyContainer = styled.div`
  margin-top: 5.8rem;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
`;

export default App;
