import axios from 'axios';
import generator from 'generate-serial-number';

export const FetchOrderData = (orders) => {
  return async (dispatch) => {
    dispatch({
      type: 'FIND_MY_ORDER',
    });

    try {
      const itemList = await axios.post(
        'http://localhost:3000/fetchOrderedItems',
        { orderNum: orders }
      );

      if (itemList.data !== 'not found' || !itemList.data) {
        dispatch(OrderData(itemList.data));
      } else {
        dispatch({
          type: 'NOT_FOUND',
        });
      }
    } catch (error) {
      dispatch({
        type: 'NOT_FOUND',
      });
    }
  };
};

export const PostReturnData = (data) => {
  return async (dispatch) => {
    console.log(data);
    try {
      data.returnNo = generator.generate(12);

      const move = await axios.post('http://localhost:3000/postReturnInfo', {
        returnData: data,
      });

      if (move.data) {
        dispatch({
          type: 'RETURNING_ITEMS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'NOT_SENT',
        });
      }
    } catch (error) {
      dispatch({
        type: 'NOT_SENT',
      });
    }
  };
};

export const NewReturn = () => ({
  type: 'NEW_RETURN',
});

export const OrderData = (orders) => ({
  type: 'MY_ORDER',
  payload: orders,
});
