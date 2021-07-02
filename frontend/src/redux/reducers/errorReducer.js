/* eslint-disable import/no-anonymous-default-export */
import { GET_ERRORS, CLEAR_ERRORS } from "./types";

const initialState = {
  msg: {},
  status: null,
};

export default function (state = { initialState }, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
      };
    default:
      return state;
  }
}
