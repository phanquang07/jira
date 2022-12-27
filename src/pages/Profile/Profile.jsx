import React from "react";
import { Alert, Card } from "antd";
import { ACCESS_TOKEN } from "../../util/setting";
import { Redirect } from "react-router-dom";
const { Meta } = Card;

export default function Profile(props) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    // <Alert message="Warning" type="warning" showIcon closable />
    alert('Bạn cần đăng nhập trước')
    return <Redirect to="/login" />;
  }
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    ></Card>
  );
}
