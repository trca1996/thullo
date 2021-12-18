export interface CardType {
  _id: string;
  title: string;
  description: string;
  cover: string;
  list: string;
  members: [];
  attachments: [];
  comments: [];
  labels: [];
  index: number;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

export interface ListType {
  id: string;
  title: string;
  cards: CardType[];
}

export interface BoardType {
  id: null | string;
  title: null | string;
  private: null | boolean;
  admin: null | string;
  lists: null | ListType[];
  members: null | UserType[];
  cover: string | null;
}

export interface ListStateTypes {
  cards: {
    [key: string]: CardType;
  };
  lists: {
    [key: string]: { id: string; title: string; cardsIds: string[] };
  };
  listOrder: string[];
}

export interface DndObj {
  droppableId: string;
  index: number;
}
