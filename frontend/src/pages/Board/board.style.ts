import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

export const Container = styled.div`
  padding: 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const MenuContainerTitle = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray2};
`;

export const MenuContainerParagraph = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
`;

export const Members = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

export const SearchUser = styled(Input)`
  padding: 2px 2px 2px 10px;
  box-shadow: 1px 5px 15px 3px rgba(0, 0, 0, 0.05);
  border: none;
`;

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white3};
  border-radius: 2.4rem;
  padding: 2.8rem 2.4rem;
  display: flex;
  gap: 2rem;
`;

export const StyledButton = styled(Button)`
  width: 241px;
  height: 32px;
  background: ${({ theme }) => theme.colors.blue2};
  color: ${({ theme }) => theme.colors.blue1};
  border-radius: 8px;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: flex-start;
`;

export const ButtonDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray3};
`;

export const ListModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
`;

export const ListTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;

  text-align: center;
`;

export const ListTitleInput = styled(Input)`
  min-width: 35rem;
`;

export const ListButton = styled(Button)`
  align-self: center;
  min-width: 10rem;
  justify-content: center;
`;
