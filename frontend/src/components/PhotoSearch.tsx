import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import getPhotos, { Photo } from "../helper/getPhotos";
import Button from "./Button";
import Input from "./Input";

const PhotoSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos(12).then((data) => setPhotos(data.photos));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getPhotos(12, keyword).then((data) => setPhotos(data.photos));
  };

  return (
    <Container>
      <Title>Photo Search</Title>
      <SubTitle>Search Unsplash for photos</SubTitle>

      <form onSubmit={handleSubmit}>
        <Input
          style={{
            padding: "1px 1px 1px 1rem",
            marginBottom: "0.5rem",
            width: "228px",
          }}
          type="text"
          placeholder="Keywords..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          Element={<Button startIcon="search" type="submit" />}
        />
      </form>

      <PicturesContainer>
        {photos.map((photo) => (
          <Image key={photo.id} src={photo.photoUrl} alt="cover" />
        ))}
      </PicturesContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white1};
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  position: absolute;
  top: 4rem;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray2};
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray3};
  margin-bottom: 1rem;
`;

const PicturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 0.4rem;
  object-fit: cover;
`;

export default PhotoSearch;
