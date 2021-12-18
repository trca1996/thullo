import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAppSelector } from "../helper/hooks";

const MyProfile = () => {
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.user);

  return (
    <Container>
      <h5>Personal Info</h5>

      <InfoContainer>
        <Section>
          <h6>Profile</h6>

          <EditButton onClick={() => navigate("edit")}>
            <span>Edit</span>
          </EditButton>
        </Section>

        <hr />

        <MiniSection>
          <p>PHOTO</p>
          {user && <img src={`/img/users/${user.photo}`} alt="" />}
        </MiniSection>

        <hr />

        <MiniSection>
          <p>NAME</p>
          <p>{user?.name}</p>
        </MiniSection>

        <hr />

        <MiniSection>
          <p>EMAIL</p>
          <p>{user?.email}</p>
        </MiniSection>

        <hr />

        <MiniSection>
          <p>PASSWORD</p>
          <p>************</p>
        </MiniSection>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
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

const InfoContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 1rem;
  width: 50rem;

  hr {
    background-color: ${({ theme }) => theme.colors.gray4};
    border: none;
    height: 1px;
  }
`;

const Section = styled.div`
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

const EditButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  padding: 0.5rem 2rem;
`;

const MiniSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default MyProfile;
