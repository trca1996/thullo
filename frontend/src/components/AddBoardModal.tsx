import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addBoard } from "../store/actions/boardsActions";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import Modal from "./Modal";

interface AddBoardModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

const AddBoardModal: React.FC<AddBoardModalProps> = ({
  openModal,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();
  const [cover, setCover] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const InputPhotoRef = useRef<HTMLInputElement>(null);

  const setInitValues = () => {
    setCover("");
    setCoverPreview("");
    setTitle("");
    setIsPrivate(false);
  };

  const handleChangePhoto = (e: any) => {
    if (e.target.files.length) {
      setCover(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCoverPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddBoard = async () => {
    const formData = new FormData();
    formData.set("title", title);
    formData.set("private", isPrivate.toString());
    if (cover) formData.set("cover", cover);

    dispatch(addBoard(formData));
    handleCloseModal();
    setInitValues();
  };

  return (
    <Modal open={openModal} handleClose={handleCloseModal}>
      <ImageContainer>
        <img
          src={coverPreview?.toString() || `/img/cover/defaultCover.jpg`}
          alt="cover"
        />
        <ExitButton
          onClick={() => {
            setCoverPreview("");
            setCover("");
          }}
        >
          <Icon name="close" />
        </ExitButton>
      </ImageContainer>

      <StyledInput
        type="text"
        placeholder="Add board title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ButtonContainer>
        <StyledButton
          textStyle={{ textAlign: "center" }}
          onClick={() => InputPhotoRef.current?.click()}
          isSet={cover ? true : false}
        >
          <Icon name="image" />
          <span>Cover</span>
        </StyledButton>
        <input
          ref={InputPhotoRef}
          type="file"
          name="photo"
          id="photo"
          style={{ display: "none" }}
          onChange={handleChangePhoto}
        />

        <StyledButton
          textStyle={{ textAlign: "start" }}
          onClick={() => setIsPrivate((curr) => !curr)}
          isPrivate={isPrivate}
        >
          <Icon name="lock" />
          <span>Private</span>
        </StyledButton>
      </ButtonContainer>

      <ActionContainer>
        <CancelButton
          onClick={() => {
            setInitValues();
            handleCloseModal();
          }}
        >
          <span>Cancel</span>
        </CancelButton>
        <CreateButton onClick={handleAddBoard}>
          <Icon name="add" />
          <span>Create</span>
        </CreateButton>
      </ActionContainer>
    </Modal>
  );
};

const ImageContainer = styled.div`
  width: 25.9rem;
  height: 7.8rem;
  border-radius: 0.8rem;
  position: relative;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.8rem;
  }
`;

const ExitButton = styled(Button)`
  position: absolute;
  top: -0.7rem;
  right: -0.7rem;
  font-size: 2rem;
  padding: 0.5rem;
`;

const StyledInput = styled(Input)`
  margin-bottom: 2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
`;

const StyledButton = styled(Button)<{ isSet?: boolean; isPrivate?: boolean }>`
  flex: 1;
  background: ${({ theme, isSet, isPrivate }) =>
    isSet || isPrivate ? theme.colors.blue1 : theme.colors.white3};
  color: ${({ theme, isSet, isPrivate }) =>
    isSet || isPrivate ? theme.colors.white1 : theme.colors.gray3};
  text-align: center;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray3};
`;

const CreateButton = styled(Button)``;

export default AddBoardModal;
