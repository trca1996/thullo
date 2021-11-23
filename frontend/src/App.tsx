import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { success, error } = useAppSelector((state) => state.status);
  const loading = useAppSelector((state) => state.loading);
  const [userFormType, setUserFormType] = useState<"SignUp" | "Login">(
    "SignUp"
  );
  const alert = useAlert();

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

  return (
    <div>
      <HeaderContainer>
        <Loading disabled={!loading} />
        <Header changeForm={setUserFormType} />
      </HeaderContainer>

      <BodyContainer>
        {!user ? (
          userFormType === "SignUp" ? (
            <SignUp changeForm={setUserFormType} />
          ) : (
            <Login changeForm={setUserFormType} />
          )
        ) : (
          <Routes>
            <Route path="/" element={<AllBoards />} />
            <Route path="/:id" element={<div>hello from ONE board</div>} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="*" element={<p>There's nothing here!</p>} />
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
