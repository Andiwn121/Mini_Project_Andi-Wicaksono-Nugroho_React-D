import React, { useState } from "react";
import "./header.css";
import { Layout, Menu, Row, Space, Button } from "antd";
import { MENU_ITEM } from "../Constants";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const { Header } = Layout;
  const path = window.location.pathname;
  const [current, setCurrent] = useState(path);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="navbar">
      <Header
        justify="space-between"
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "#ffffff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Row justify="space-between">
          <Link to="/home">
            <h1 className="company" onClick={() => setCurrent("")}>
              <span className="e">e</span>
              Startup
            </h1>
          </Link>
          {/* <Space direction="horizontal">
            <Link to="/">
              <Button
                type="primary"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                danger
              >
                Logout
              </Button>
            </Link>
            <Link to="/">
              <Button
                type="primary"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                danger
              >
                Logout
              </Button>
            </Link>
          </Space> */}
          <Menu
            theme="light"
            mode="horizontal"
            onClick={onClick}
            selectedKeys={[current]}
            items={MENU_ITEM}
            disabledOverflow
          />
        </Row>
      </Header>
    </div>
  );
};

export default HeaderComponent;
