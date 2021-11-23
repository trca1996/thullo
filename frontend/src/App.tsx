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
      <Loading disabled={!loading} />
      <Header changeForm={setUserFormType} />

      <div
        style={{
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!user ? (
          userFormType === "SignUp" ? (
            <SignUp changeForm={setUserFormType} />
          ) : (
            <Login changeForm={setUserFormType} />
          )
        ) : (
          <Routes>
            <Route path="/" element={<AllBoards />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="*" element={<p>There's nothing here!</p>} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
