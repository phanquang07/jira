import axios from 'axios'
import { GET_ALL_PROJECT, ID_TOKEN, TOKEN_JIRA } from '../../util/setting'
import { URL_API } from "../../util/setting";
import { CREATE_PROJECT } from '../../util/setting';

export const getAllProjectAction = () => {
  return (dispatch2) => {
    axios({
      url: `${URL_API}/Project/getAllProject`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_JIRA,
        Authorization: 'Bearer ' + ID_TOKEN
      }
    })
      .then((res) => {
        // console.log('GET LIST: ', res.data.content);
        let action = {
          type: GET_ALL_PROJECT,
          projectList: res.data.content
        }
        dispatch2(action)
      })
      .catch((err) => {
        console.log('err projectAction: ', err);
      })

  }
}

export const createProjectAction = (values) => {
  // console.log('values: ', values);
  return (dispatch2) => {
    axios({
      url: `${URL_API}/Project/createProject`,
      method: "POST",
      data: { ...values, creator: "Anonymous" },
      "content-type": "application/json",
      headers: {
        TokenCybersoft: TOKEN_JIRA,
        // Authorization: 'Bearer ' + ID_TOKEN
      }
    })
      .then((res) => {
        // console.log('GET LIST: ', res.data.content);

        let action = {
          type: CREATE_PROJECT,
          newProject: {
            ...values,
            // projectCategory: {
            //   id: values.projectCategoryId,
            // }
          }
        }
        // console.log("action.projectCategory.id: ", action);
        dispatch2(action)
      })
      .catch((err) => {
        console.log('err projectAction: ', err);
      })
  }
}
