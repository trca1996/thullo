import React, { ChangeEvent, KeyboardEventHandler } from "react";
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
  inputRef?: React.LegacyRef<HTMLInputElement>;
  submitFn?: (props?: any) => void;
  disabled?: boolean;
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
  inputRef,
  submitFn = undefined,
  disabled,
}: InputProps) => {
  const handleSubmit: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (submitFn && e.key === "Enter") {
      submitFn();
    }
  };

  return (
    <Container
      style={{ ...style }}
      className={className}
      onKeyPress={handleSubmit}
      disabled={Boolean(disabled)}
    >
      {icon && <Icon name={icon} />}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={inputRef || null}
        disabled={disabled}
      />
      {Element && <>{Element}</>}
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid
    ${({ theme, disabled }) => (disabled ? "transparent" : theme.colors.gray4)};
  color: ${({ theme }) => theme.colors.gray3};
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;

  input {
    font-size: inherit;
    font-weight: inherit;
    background: transparent;
    flex: 1;
    outline: none;
    border: none;
    text-overflow: ellipsis;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray4};
    }
  }
`;

export default Input;
