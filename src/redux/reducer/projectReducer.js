import { CREATE_PROJECT, GET_ALL_PROJECT } from "../../util/setting";

const initialState = {
  projectList: [],
}

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      // console.log('action list project: ', action.projectList);
      state.projectList = action.projectList
      return { ...state }
    case CREATE_PROJECT:
      state.newProject = [...state.projectList, action.newProject]
      return { ...state }
    default:
      return state
  }
}