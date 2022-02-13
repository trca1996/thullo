import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { useAppDispatch, useAutoClose } from "../helper/hooks";
import {
  editBoardDescription,
  removeBoard,
  removeMember,
} from "../store/actions/boardsActions";
import { BoardType } from "../types/types";
import AppEditor from "./AppEditor";
import Button from "./Button";
import Icon from "./Icon";
import MemberCard from "./MemberCard";
import SectionHeading from "./SectionHeading";
import { stateToHTML } from "draft-js-export-html";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const BoardSideMenu: React.FC<{
  showBoardMenu: boolean;
  board: BoardType;
  setShowBoardMenu: (arg: boolean) => void;
}> = ({ showBoardMenu, board, setShowBoardMenu }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { colors } = useContext(ThemeContext);
  const [editDescription, setEditDescription] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    key: string | "board" | null;
  }>({ isOpen: false, key: null });

  const [editorState, setEditorState] = useState<EditorState>(() => {
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (board.description) {
      setEditorState(() => {
        const contentState = JSON.parse(board.description as string);

        return EditorState.createWithContent(convertFromRaw(contentState));
      });
    }
  }, [board.description]);

  const closeSideBar = () => {
    if (showBoardMenu) setShowBoardMenu(false);
  };
  useAutoClose(closeSideBar);

  const cancelEditDescription = () => {
    setEditDescription(false);
    // setEditorState()
  };

  const saveEditDescription = (editorState: EditorState) => {
    dispatch(
      editBoardDescription(
        JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        board.id as string
      )
    );
    setEditDescription(false);
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, key: null });
  };

  const handleRemove = (key: string) => {
    if (key === "board") {
      dispatch(removeBoard(board.id as string));
    } else {
      dispatch(removeMember(key, board.id as string));
    }

    setModal({ isOpen: false, key: null });
    navigate("/");
  };

  return (
    <BoardMenu showMenu={showBoardMenu} onClick={(e) => e.stopPropagation()}>
      <Heading>
        <BoardTitle>{board.title}</BoardTitle>
        <div onClick={() => setShowBoardMenu(false)}>
          <Icon name="close" style={{ cursor: "pointer" }} />
        </div>
      </Heading>

      <hr />

      <MenuSection>
        <SectionHeading
          Icon={<Icon name="account_circle" />}
          title={"Made by"}
        />

        {board.admin && (
          <MemberCard
            name={board.admin.name}
            photo={board.admin.photo}
            subParagraph={new Date(
              board.createdAt as string
            ).toLocaleDateString("en", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        )}
      </MenuSection>

      <MenuSection>
        <SectionHeading
          Icon={<Icon name="description" />}
          title={"Description"}
          buttonTitle={board.description ? "Edit" : "Add"}
          ButtonIcon={<Icon name={board.description ? "edit" : "add"} />}
          onClick={() => setEditDescription(true)}
          hideButton={editDescription}
        />
        {editDescription && (
          <>
            <AppEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />

            <div style={{ display: "flex", gap: "5px" }}>
              <Button
                backgroundColor={colors.green1}
                color={colors.white}
                style={{ padding: "5px 10px" }}
                onClick={() => saveEditDescription(editorState)}
              >
                Save
              </Button>
              <Button
                backgroundColor="transparent"
                color={colors.gray3}
                style={{ padding: "5px 10px" }}
                onClick={cancelEditDescription}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
        {board.description && !editDescription && (
          <Description
            dangerouslySetInnerHTML={{
              __html: stateToHTML(
                convertFromRaw(JSON.parse(board.description)),
                {
                  blockStyleFn: (block) => {
                    if (
                      block.get("type") === "unordered-list-item" ||
                      "ordered-list-item"
                    ) {
                      return {
                        style: {
                          listStylePosition: "inside",
                        },
                      };
                    }
                  },
                }
              ),
            }}
          ></Description>
        )}
      </MenuSection>

      <MenuSection>
        <SectionHeading title="Team" Icon={<Icon name="description" />} />
        {board.admin && (
          <MemberCard name={board.admin.name} photo={board.admin.photo}>
            <Button color={colors.gray4} backgroundColor="transparent">
              Admin
            </Button>
          </MemberCard>
        )}
        {board.members?.map((member) => (
          <MemberCard key={member._id} name={member.name} photo={member.photo}>
            <Button
              backgroundColor="transparent"
              color={colors.red}
              style={{
                border: `1px solid ${colors.red}`,
                padding: "0.45rem 1.1rem",
              }}
              onClick={() => setModal({ isOpen: true, key: member._id })}
            >
              Remove
            </Button>
          </MemberCard>
        ))}
      </MenuSection>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}
      >
        <Button
          backgroundColor={colors.red}
          onClick={() => setModal({ isOpen: true, key: "board" })}
        >
          Remove Board
        </Button>
      </div>

      <Modal open={modal.isOpen} handleClose={handleCloseModal}>
        <Question>{`Are you sure you want to remove this ${
          modal.key === "board" ? modal.key : "user"
        }?`}</Question>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "2rem",
          }}
        >
          <Button
            style={{ minWidth: "10rem", justifyContent: "center" }}
            onClick={() => handleRemove(modal.key as string)}
          >
            Yes
          </Button>
          <Button
            style={{ minWidth: "10rem", justifyContent: "center" }}
            onClick={() => setModal({ isOpen: false, key: null })}
          >
            No
          </Button>
        </div>
      </Modal>
    </BoardMenu>
  );
};

const BoardMenu = styled.div<{ showMenu: boolean }>`
  height: calc(100% - 7rem);
  width: 37.7rem;
  position: fixed;
  right: ${({ showMenu }) => (showMenu ? "0" : "-37.7rem")};
  top: 7rem;
  background-color: black;
  transition: right 0.3s ease-in;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  background: ${({ theme }) => theme.colors.white1};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;
  padding-bottom: 0.8rem;
`;

const BoardTitle = styled.h5`
  font-size: 1.4rem;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1rem 0;
`;

const Description = styled.div`
  font-size: 1.2rem;
  font-weight: normal;
`;

const Question = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
`;

export default BoardSideMenu;
