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
  isPrivate: null | boolean;
  admin: null | UserType;
  lists: ListType[];
  members: UserType[];
  cover: string | null;
  createdAt: null | string;
  description: null | string;
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
