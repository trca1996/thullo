import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import { checkUser } from "./store/actions/authActions";
import { useAppDispatch, useAppSelector } from "./helper/hooks";
import { useAlert } from "react-alert";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import { errorReset, successReset } from "./store/actions/statusMessageActions";
import AllBoards from "./pages/AllBoards";
import Loading from "./components/Loading";
import styled from "styled-components";
import Board from "./pages/Board";
import { useLocation } from "react-router-dom";
import { resetAllBoards, resetBoard } from "./store/actions/boardsActions";

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
    if (pathname === "/" || pathname.startsWith("/profile")) {
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
        {!user ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<AllBoards />} />
            <Route path="/:boardId" element={<Board />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signUp" element={<Navigate to="/" />} />
            {/* <Route path="*" element={<p>NEED 404 PAGE</p>} /> */}
          </Routes>
        )}
      </BodyContainer>
    </div>
  );
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white1};
`;

const BodyContainer = styled.div`
  margin-top: 5.8rem;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
`;

export default App;
