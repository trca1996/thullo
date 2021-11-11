import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import { checkUser } from "./store/actions/authActions";
import { useAppDispatch, useAppSelector } from "./helper/hooks";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [userFormType, setUserFormType] = useState<"SignUp" | "Login">(
    "SignUp"
  );

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <div>
      <Header changeForm={setUserFormType} />

      {!user ? (
        <div
          style={{
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {userFormType === "SignUp" ? (
            <SignUp changeForm={setUserFormType} />
          ) : (
            <Login changeForm={setUserFormType} />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
