import axios from "axios";

export interface Photo {
  id: string;
  blurHash: string;
  photoUrl: string;
}

const getPhotos = async (numOfPhotos = 1, keyword = "") => {
  const { data } = await axios.get(
    `/api/v1/utils/getPhotos?keyword=${keyword}&numOfPhotos=${numOfPhotos}`
  );

  return data;
};

export default getPhotos;
