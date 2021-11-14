import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import { checkUser } from "./store/actions/authActions";
import { useAppDispatch, useAppSelector } from "./helper/hooks";
import { useAlert } from "react-alert";
import { RESET_ERROR } from "./store/constants/authConstants";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";

function App() {
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.user);
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
      dispatch({ type: RESET_ERROR });
    }
  }, [dispatch, alert, error]);

  return (
    <div>
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
