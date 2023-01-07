import React from "react";
import { Alert, Card } from "antd";
import { ACCESS_TOKEN } from "../../util/setting";
import { Redirect } from "react-router-dom";
const { Meta } = Card;
import { ID_TOKEN } from "../../util/setting";
export default function Profile() {
  if (!ID_TOKEN) {
    // <Alert message="Warning" type="warning" showIcon closable />
    alert("Bạn cần đăng nhập trước");
    return <Redirect to="/login" />;
  }
  return (
    ID_TOKEN.map((item) => {
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={item.avatar} />}
      ></Card>
    })
  );
}
