import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAppDispatch, useAppSelector } from "../helper/hooks";
import { updateProfile } from "../store/actions/authActions";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { user } = useAppSelector((store) => store.user);
  const [photoPreview, setPhotoPreview] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState(() => user.name);
  const [email, setEmail] = useState(() => user.email);

  const handleChangePhoto = (e: any) => {
    setPhoto(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitUserInfo = () => {
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (photo) formData.set("photo", photo);

    dispatch(updateProfile(formData));
  };

  return (
    <Container>
      <Button
        text="Back"
        startIcon="arrow_back_ios_new"
        style={{
          backgroundColor: "transparent",
          color: colors.blue1,
          alignSelf: "flex-start",
        }}
        onClick={() => navigate("/profile")}
      />
      <EditContainer>
        <h6>Change Info</h6>

        <PhotoEdit>
          <img
            src={
              photoPreview
                ? photoPreview.toString()
                : `/img/users/${user.photo}`
            }
            alt={`${user.name}`}
          />
          <label htmlFor="photo">CHANGE PHOTO</label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handleChangePhoto}
          />
        </PhotoEdit>

        <div>
          <label htmlFor="name">NAME</label>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">EMAIL</label>
          <Input
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button text="Change User Info" onClick={submitUserInfo} />

        <hr />

        <EditPassword>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <Input id="password" type="password" placeholder="Password" />
          </div>
          <div>
            <label htmlFor="changePassword">CONFIRM PASSWORD</label>
            <Input
              id="changePassword"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <Button text="Change Password" />
        </EditPassword>
      </EditContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

const EditContainer = styled.div`
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

const PhotoEdit = styled.div`
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

const EditPassword = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default EditProfile;
