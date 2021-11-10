import { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  const [userFormType, setUserFormType] = useState<"SignUp" | "Login">(
    "SignUp"
  );

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
        {userFormType === "SignUp" ? (
          <SignUp changeForm={setUserFormType} />
        ) : (
          <Login changeForm={setUserFormType} />
        )}
      </div>
    </div>
  );
}

export default App;
