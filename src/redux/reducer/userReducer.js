import { GET_LIST_USERS, USER_SEARCHED } from "../../util/setting"

const initialState = {
  usersSearched: [],
  listUsers: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    // case GET_LIST_USERS:
    //   state.listUsers = action.listUsers
    //   return { ...state }
    case USER_SEARCHED:
      return { ...state, usersSearched: action.usersSearched }
    default:
      return state
  }
}
