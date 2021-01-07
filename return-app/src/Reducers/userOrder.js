import {
  MY_ORDER,
  NOT_FOUND,
  FIND_MY_ORDER,
  NEW_RETURN,
} from '../Actions/types';

const initialState = {
  userOrder: null,
  basket: [],
  loading: false,
  message: null,
};

export const userOrder = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_RETURN:
      return {
        ...state,
        basket: [],
        loading: false,
        userOrder: null,
        message: null,
      };
    case FIND_MY_ORDER:
      return {
        ...state,
        loading: false,
        userOrder: null,
      };
    case MY_ORDER:
      return {
        ...state,
        userOrder: payload[0].ordernum,
        basket: payload,
        loading: false,
        message: 'we have found your order click next to continue',
      };
    case NOT_FOUND:
      return {
        ...state,
        loading: false,
        userOrder: null,
        basket: [],
        message: 'something went wrong please try again',
      };

    default:
      return state;
  }
};
