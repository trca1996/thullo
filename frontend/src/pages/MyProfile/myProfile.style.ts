import styled from "styled-components";
import Button from "../../components/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;

  h5 {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export const InfoContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 1rem;
  width: 50rem;

  hr {
    background-color: ${({ theme }) => theme.colors.gray4};
    border: none;
    height: 1px;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;

  h6 {
    font-size: 1.5rem;
  }

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.8rem;
  }
`;

export const EditButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  padding: 0.5rem 2rem;
`;

export const MiniSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
