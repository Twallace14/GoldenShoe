import { NEW_RETURN, NOT_SENT, RETURNING_ITEMS } from '../Actions/types';

const initialState = {
  returnNo: null,
  name: null,
  isLoading: false,
  items: [],
  message: null,
};

const activeReturn = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_RETURN:
      return { ...state, returnNo: null, name: null, isLoading: false };
    case NOT_SENT:
      return {
        ...state,
        returnNO: null,
        name: null,
        items: [],
        message: 'something gone wrong please try again',
      };
    case RETURNING_ITEMS:
      return {
        ...state,
        returnNo: payload.returnNo,
        name: payload.name,
        isLoading: false,
        message: 'continue',
      };
    default:
      return state;
  }
};

export default activeReturn;
