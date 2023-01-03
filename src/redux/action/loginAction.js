import { Alert, Space, notification } from "antd"
import axios from "axios"
import { history } from "../../App"
import { URL_API, TOKEN_JIRA, ACCESS_TOKEN, USER_LOGIN } from "../../util/setting"
import { LOGIN } from "../types/userType"

export const registerAction = (userInfo) => {
  return () => {
    axios({
      url: `${URL_API}/Users/signup`,
      method: 'POST',
      data: userInfo,
      headers: {
        TokenCybersoft: TOKEN_JIRA
      }
    })
      .then((res) => {
        // console.log('register res: ', res);
        // <Space
        //   direction="vertical"
        //   style={{
        //     width: '100%',
        //   }}
        // >
        //   <Alert message="Success Tips" type="success" showIcon closable />
        // </Space>
        alert("Success")
        history.push('/project-management')
      })
      .catch((error) => {
        console.log('err: ', error.response.data?.message);
        alert('Thất bại')
        // { error.contextHolder }
        // <Space>
        //   {/* <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        //   <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        //   <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button> */}
        //   <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
        // </Space>
      })
  }
}

export const loginAction = (userInfo) => {
  return (dispatch2) => {
    axios({
      url: `${URL_API}/Users/signin`,
      method: 'POST',
      data: userInfo,
      headers: {
        TokenCybersoft: TOKEN_JIRA
      }
    })
      .then((res) => {
        // console.log('res signin: ', res.data.content);
        localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken)
        let userInfo = JSON.stringify(res.data.content)
        localStorage.setItem(USER_LOGIN, userInfo)

        let action = {
          type: LOGIN,
          uLogin: userInfo
        }
        dispatch2(action)
        history.push('/project-management')
      })
      .catch((error) => {
        console.log('error login: ', error.response.data.message);
        // <Space
        //   direction="vertical"
        //   style={{
        //     width: '100%',
        //   }}
        // >
        //   <Alert message="Error" type="error" showIcon />
        // </Space>
      })
  }
}