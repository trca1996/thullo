import styled from "styled-components";
import MemberImage from "./MemberImage";

const MemberCard: React.FC<{
  name: string;
  photo: string;
  subParagraph?: string;
}> = ({ children, name, photo, subParagraph }) => {
  return (
    <Container>
      <MemberImage
        style={{ width: "3.5rem", height: "3.5rem" }}
        name={name}
        photo={photo}
      />

      <Main>
        <Name>{name}</Name>
        {subParagraph && <SubParagraph>{subParagraph}</SubParagraph>}
      </Main>

      <ChildrenElement>{children}</ChildrenElement>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1.3rem;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Name = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const SubParagraph = styled.p`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 1rem;
`;

const ChildrenElement = styled.div`
  align-self: center;
  margin-left: auto;
`;

export default MemberCard;
