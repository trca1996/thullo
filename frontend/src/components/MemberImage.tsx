import styled from "styled-components";

interface MemberImageProps {
  name: string;
  photo: string;
  style?: object;
  className?: string;
}

const MemberImage = ({ name, photo, className, style }: MemberImageProps) => {
  if (photo !== "default.jpg") {
    return (
      <Image
        className={className}
        style={{ ...style }}
        src={`/img/users/${photo}`}
        alt="user"
      />
    );
  }

  return (
    <NameImage className={className} style={{ ...style }}>
      {name
        .split(" ")
        .map((subName) => subName[0])
        .join("")}
    </NameImage>
  );
};

const Image = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.8rem;
`;

const NameImage = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 600;
`;

export default MemberImage;
