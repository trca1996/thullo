import styled from "styled-components";
import MemberImage from "./MemberImage";

interface BoardCardProps {
  cover?: string;
  title: string;
  members: memberObj[];
}

interface memberObj {
  _id: string;
  photo: string;
  name: string;
}

const BoardCard = ({ cover, title, members }: BoardCardProps) => {
  const firstThreeMembers = members.slice(0, 3);
  const numOfOthersMembers = members.slice(3).length;

  return (
    <Card>
      <Image src={`/img/cover/${cover}`} alt={title} />

      <Title>{title}</Title>

      {members.length !== 0 ? (
        <MembersContainer>
          {firstThreeMembers.map((member) => (
            <MemberImage
              key={member._id}
              name={member.name}
              photo={member.photo}
            />
          ))}

          {numOfOthersMembers ? (
            <p>{`+ ${numOfOthersMembers} others`}</p>
          ) : null}
        </MembersContainer>
      ) : (
        <MembersContainer>
          <p>No Members</p>
        </MembersContainer>
      )}
    </Card>
  );
};

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white1};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 1.2rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  width: 24.3rem;
  height: 24.3rem;
`;

const Image = styled.img`
  border-radius: 1.2rem;
  width: 100%;
  height: 13rem;
  margin-bottom: 1.2rem;
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2rem;
  word-wrap: break-word;
`;

const MembersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default BoardCard;
