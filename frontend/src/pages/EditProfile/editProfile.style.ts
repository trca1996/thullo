import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 1rem;
  width: 50rem;
  padding: 1rem 2rem;

  h6 {
    font-size: 1.5rem;
  }
`;

export const PhotoEdit = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.8rem;
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;
  }
`;

export const EditPassword = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
