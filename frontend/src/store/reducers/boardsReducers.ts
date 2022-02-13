import {
  BoardType,
  CardType,
  ListStateTypes,
  ListType,
  UserType,
} from "../../types/types";
import {
  ADD_BOARD_RESPONSE,
  ADD_LIST,
  ADD_MEMBER,
  ALL_BOARDS_RESPONSE,
  CHANGE_BOARD_VISIBILITY,
  CHANGE_CARD_POSITION_STATE,
  EDIT_BOARD_DESCRIPTION,
  GET_BOARD,
  REMOVE_BOARD,
  REMOVE_MEMBER,
  RESET_ALL_BOARDS,
  RESET_BOARD,
} from "../constants/boardsConstants";

export const boardsReducer = (state: BoardType[] = [], action: any) => {
  switch (action.type) {
    case ALL_BOARDS_RESPONSE:
      return action.payload;
    case ADD_BOARD_RESPONSE:
      return [action.payload, ...state];
    case RESET_ALL_BOARDS:
      return [];
    default:
      return state;
  }
};

const boardInitState: BoardType = {
  id: null,
  title: null,
  cover: null,
  isPrivate: null,
  admin: null,
  lists: [],
  members: [],
  createdAt: null,
  description: null,
};

export const boardReducer = (state = boardInitState, action: any) => {
  switch (action.type) {
    case GET_BOARD:
      return {
        id: action.payload.id as string,
        title: action.payload.title as string,
        cover: action.payload.cover as string,
        isPrivate: action.payload.isPrivate as boolean,
        admin: action.payload.admin as string,
        lists: action.payload.lists as ListType,
        members: action.payload.members as UserType,
        createdAt: action.payload.createdAt as string,
        description: action.payload.description as string,
      };
    case CHANGE_BOARD_VISIBILITY:
      return { ...state, isPrivate: action.payload };
    case ADD_MEMBER:
      return { ...state, members: [...state.members, action.payload] };
    case EDIT_BOARD_DESCRIPTION:
      return { ...state, description: action.payload };
    case REMOVE_MEMBER:
      return { ...state, members: action.payload || [] };
    case ADD_LIST:
      const newList = action.payload;
      return { ...state, lists: [...state.lists, newList] };
    case RESET_BOARD:
    case REMOVE_BOARD:
      return {
        id: null,
        title: null,
        cover: null,
        isPrivate: null,
        admin: null,
        lists: [],
        members: [],
        createdAd: null,
        description: null,
      };
    default:
      return state;
  }
};

const listStateInit: ListStateTypes = {
  cards: {},
  lists: {},
  listOrder: [],
};

export const boardListState = (state = listStateInit, action: any) => {
  switch (action.type) {
    case GET_BOARD:
      let cardsArr: CardType[] = [];
      const listOrder: string[] = [];
      const cards: { [key: string]: CardType } = {};
      const lists: {
        [key: string]: { id: string; title: string; cardsIds: string[] };
      } = {};
      action.payload.lists.forEach((list: ListType) => {
        listOrder.push(list.id);
        lists[list.id] = {
          id: list.id,
          title: list.title,
          cardsIds: list.cards.map((card) => card._id),
        };
        cardsArr = [...cardsArr, ...list.cards];
      });
      cardsArr.forEach((card) => {
        cards[card._id] = card;
      });
      return { cards, lists, listOrder };
    case CHANGE_CARD_POSITION_STATE:
      const source = action.payload.source;
      const destination = action.payload.destination;
      const cardId = action.payload.cardId;

      const startList = state.lists[source.droppableId];
      const finishList = state.lists[destination.droppableId];
      if (startList === finishList) {
        const newCardsIds = Array.from(startList.cardsIds);
        newCardsIds.splice(source.index, 1);
        newCardsIds.splice(destination.index, 0, cardId);
        const newList = {
          ...startList,
          cardsIds: newCardsIds,
        };
        return {
          ...state,
          lists: {
            ...state.lists,
            [newList.id]: newList,
          },
        };
      } else {
        const startCardsIds = Array.from(startList.cardsIds);
        startCardsIds.splice(source.index, 1);
        const newStartList = {
          ...startList,
          cardsIds: startCardsIds,
        };
        const finishCardsIds = Array.from(finishList.cardsIds);
        finishCardsIds.splice(destination.index, 0, cardId);
        const newFinishList = {
          ...finishList,
          cardsIds: finishCardsIds,
        };
        return {
          ...state,
          lists: {
            ...state.lists,
            [newStartList.id]: newStartList,
            [newFinishList.id]: newFinishList,
          },
        };
      }
    case ADD_LIST:
      const newList = action.payload;
      return {
        ...state,
        lists: {
          ...state.lists,
          [newList.id]: {
            id: newList.id,
            title: newList.title,
            cardsIds: [],
          },
        },
        listOrder: [...state.listOrder, newList.id],
      };
    case RESET_BOARD:
    case REMOVE_BOARD:
      return listStateInit;
    default:
      return state;
  }
};
