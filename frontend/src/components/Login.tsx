import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../helper/hooks";
import useForm from "../helper/useForm";
import { login } from "../store/actions/authActions";
import Button from "./Button";
import Input from "./Input";

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    state: { email, password },
    handleChange,
  } = useForm({ email: "", password: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      <div style={{ display: "flex", gap: "1rem" }}>
        <img src="/img/logo-small.svg" alt="logo" />
        <h2>Login</h2>
      </div>

      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          name="email"
          type={"email"}
          icon="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type={"password"}
          icon="lock"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />

        <Button text="Login" textStyle={{ fontWeight: "bold" }} type="submit" />
      </form>

      <Paragraph>
        Don't have an account yer?{" "}
        <span onClick={() => navigate("/signUp")}>Sign Up</span>
      </Paragraph>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 1rem;
  padding: 4rem;
  width: 40rem;
  min-height: 40rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Paragraph = styled.p`
  align-self: center;
  font-size: 1.2rem;

  span {
    color: ${({ theme }) => theme.colors.blue1};
    cursor: pointer;
  }
`;

export default UserForm;
