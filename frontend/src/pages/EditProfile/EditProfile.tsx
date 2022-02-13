import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Input from "../../components/Input";
import { useAppDispatch, useAppSelector } from "../../helper/hooks";
import { changePassword, updateProfile } from "../../store/actions/authActions";
import {
  Container,
  EditContainer,
  EditPassword,
  PhotoEdit,
} from "./editProfile.style";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const user = useAppSelector((store) => store.user);
  const [photoPreview, setPhotoPreview] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState(() => (user ? user.name : ""));
  const [email, setEmail] = useState(() => (user ? user.email : ""));
  const [handlePasswordState, setHandlePasswordState] = useState({
    password: "",
    passwordCurrent: "",
    passwordConfirm: "",
  });

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

  const handleChangePassword = () => {
    dispatch(changePassword(handlePasswordState));
  };

  return (
    <Container>
      <Button
        style={{
          backgroundColor: "transparent",
          color: colors.blue1,
          alignSelf: "flex-start",
        }}
        onClick={() => navigate("/profile")}
      >
        <Icon name="arrow_back_ios_new" />
        <span>Back</span>
      </Button>
      <EditContainer>
        <h6>Change Info</h6>

        <PhotoEdit>
          <img
            src={
              photoPreview
                ? photoPreview.toString()
                : `/img/users/${user?.photo}`
            }
            alt={`${user?.name}`}
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

        <Button style={{ justifyContent: "center" }} onClick={submitUserInfo}>
          <span>Change User Info</span>
        </Button>

        <hr />

        <EditPassword>
          <div>
            <label htmlFor="currentPassword">CURRENT PASSWORD</label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Current Password"
              value={handlePasswordState.passwordCurrent}
              onChange={(e) =>
                setHandlePasswordState((current) => ({
                  ...current,
                  passwordCurrent: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={handlePasswordState.password}
              onChange={(e) =>
                setHandlePasswordState((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="changePassword">CONFIRM PASSWORD</label>
            <Input
              id="changePassword"
              type="password"
              placeholder="Confirm Password"
              value={handlePasswordState.passwordConfirm}
              onChange={(e) =>
                setHandlePasswordState((current) => ({
                  ...current,
                  passwordConfirm: e.target.value,
                }))
              }
            />
          </div>
          <Button
            style={{ justifyContent: "center" }}
            onClick={handleChangePassword}
          >
            <span>Change Password</span>
          </Button>
        </EditPassword>
      </EditContainer>
    </Container>
  );
};

export default EditProfile;
