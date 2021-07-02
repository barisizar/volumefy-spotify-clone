// /* eslint-disable import/no-anonymous-default-export */
// import {
//   LOGIN_ATTEMPT,
//   LOGIN_ATTEMPT_SUCCESS,
//   LOGIN_ATTEMPT_FAIL,
//   CREATE_USER,
//   CREATE_USER_SUCCESS,
//   CREATE_USER_FAIL,
// } from "./types";

// const initialState = {
//   token: localStorage.getItem("token"),
//   loggedIn: null,
//   loading: false,
//   user: null,
// };

// export default function (state = { initialState }, action) {
//   switch (action.type) {
//     case GET_ERRORS:
//       return {
//         msg: action.payload.msg,
//         status: action.payload.status,
//       };
//     case CLEAR_ERRORS:
//       return {
//         msg: {},
//         status: null,
//       };
//     default:
//       return state;
//   }
// }
