import styled from "styled-components";
import Label from "./Label";
import Button from "./Button";
import MemberImage from "./MemberImage";
import Info from "./Info";
import { Draggable } from "react-beautiful-dnd";
import { CardType } from "../types/types";
import Icon from "./Icon";

// title, description, cover, list, members, attachments, comments, labels
export interface labelProps {
  _id: string;
  name: string;
  color: string;
}

const Card: React.FC<{ data: CardType; index: number }> = ({ data, index }) => {
  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {data.cover && <Image src={data.cover} alt={data.title} />}

          <Title>{data.title}</Title>

          <LabelContainer>
            {data.labels &&
              data.labels.map((label: labelProps) => (
                <Label key={label._id} data={label} />
              ))}
          </LabelContainer>

          {
            <BottomContainer>
              <MembersContainer>
                {data.members &&
                  data.members.map(
                    (member: { _id: string; name: string; photo: string }) => (
                      <MemberImage
                        key={member._id}
                        name={member.name}
                        photo={member.photo}
                      />
                    )
                  )}
                <StyledButton>
                  <Icon name="add" />
                </StyledButton>
              </MembersContainer>

              <Section>
                {data.comments && data.comments.length ? (
                  <Info icon="chat" info={data.comments.length} />
                ) : null}

                {data.attachments && data.attachments.length ? (
                  <Info icon="attach_file" info={data.attachments.length} />
                ) : null}
              </Section>
            </BottomContainer>
          }
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white1};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 1.2rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  width: 24.3rem;
  cursor: pointer;
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
  margin-bottom: 1.2rem;
  word-wrap: break-word;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MembersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  font-weight: bold;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0.5rem;
  justify-content: center;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export default Card;
