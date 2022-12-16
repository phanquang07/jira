import { Col, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Route } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

export const HomeLayout = (props) => {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Row className="app">
            <Col flex="0 1 200px" style={{ background: "yellow" }}>
              <Sidebar />
            </Col>
            <Col flex="1 1 auto" style={{background:"#999"}}>
              <Header />
              <props.component {...propsRoute} />
            </Col>
          </Row>
        );
      }}
    />
  );
};
