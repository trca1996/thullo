import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../helper/hooks";
import useForm from "../helper/useForm";
import { signup } from "../store/actions/authActions";
import Button from "./Button";
import Input from "./Input";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    state: { name, email, password, passwordConfirm },
    handleChange,
  } = useForm({ name: "", email: "", password: "", passwordConfirm: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup(name, email, password, passwordConfirm));
  };

  return (
    <Container>
      <div style={{ display: "flex", gap: "1rem" }}>
        <img src="/img/logo-small.svg" alt="logo" />
        <h2>Sign Up</h2>
      </div>

      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          name="name"
          type={"text"}
          icon="drive_file_rename_outline"
          placeholder="Name"
          value={name}
          onChange={handleChange}
        />

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

        <Input
          name="passwordConfirm"
          type={"password"}
          icon="lock_open"
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={handleChange}
        />

        <Button
          text="SignUp"
          textStyle={{ fontWeight: "bold" }}
          type="submit"
        />
      </form>

      <Paragraph>
        Already a member? <span onClick={() => navigate("/login")}>Login</span>
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

export default SignUp;
