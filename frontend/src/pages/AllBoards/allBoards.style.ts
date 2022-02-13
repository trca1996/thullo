import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 18rem;
  gap: 3.5rem;

  h6 {
    font-size: 1.6rem;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;
