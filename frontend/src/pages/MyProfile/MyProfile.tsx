import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../helper/hooks";
import {
  Container,
  EditButton,
  InfoContainer,
  MiniSection,
  Section,
} from "./myProfile.style";

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

export default MyProfile;
