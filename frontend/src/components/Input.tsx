import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Icon from "./Icon";

interface InputProps {
  type: "email" | "password" | "text";
  name?: string;
  icon?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  Element?: any;
  style?: object;
  id?: string;
  className?: string;
}

const Input = ({
  type,
  name,
  icon,
  placeholder,
  value,
  onChange,
  Element,
  style,
  id,
  className,
}: InputProps) => {
  return (
    <Container style={{ ...style }} className={className}>
      {icon && <Icon name={icon} />}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {Element && <>{Element}</>}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.colors.gray3};
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;

  input {
    background: transparent;
    flex: 1;
    outline: none;
    border: none;
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray4};
    }
  }
`;

export default Input;
