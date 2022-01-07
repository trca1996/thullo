import { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { BoardType } from "../types/types";
import Button from "./Button";
import Icon from "./Icon";
import MemberCard from "./MemberCard";
import SectionHeading from "./SectionHeading";

const BoardSideMenu: React.FC<{
  showBoardMenu: boolean;
  board: BoardType;
  setShowBoardMenu: (arg: boolean) => void;
}> = ({ showBoardMenu, board, setShowBoardMenu }) => {
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const closeSideBar = () => {
      if (showBoardMenu) setShowBoardMenu(false);
    };
    window.addEventListener("click", closeSideBar);

    return () => {
      window.removeEventListener("click", closeSideBar);
    };
  }, [setShowBoardMenu, showBoardMenu]);

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
        />

        {board.description && (
          <Description
            dangerouslySetInnerHTML={{
              __html: board.description.replaceAll("\n", "</br>"),
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
        {board.members.map((member) => (
          <MemberCard key={member._id} name={member.name} photo={member.photo}>
            <Button
              backgroundColor="transparent"
              color={colors.red}
              style={{
                border: `1px solid ${colors.red}`,
                padding: "0.45rem 1.1rem",
              }}
            >
              Remove
            </Button>
          </MemberCard>
        ))}
      </MenuSection>
    </BoardMenu>
  );
};

const BoardMenu = styled.div<{ showMenu: boolean }>`
  height: 100%;
  width: 37.7rem;
  position: fixed;
  right: ${({ showMenu }) => (showMenu ? "0" : "-37.7rem")};
  top: 7rem;
  background-color: black;
  transition: right 0.3s ease-in;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  background: ${({ theme }) => theme.colors.white1};
  padding: 2rem;
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

export default BoardSideMenu;
