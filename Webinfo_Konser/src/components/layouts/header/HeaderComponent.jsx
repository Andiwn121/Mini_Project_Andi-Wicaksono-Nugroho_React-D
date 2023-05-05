import React, {useState} from "react";
import { Layout, Menu, Row } from "antd";
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
    <>
      <Header
        justify="space-between"
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Row justify="space-between">
          <Link to="/">
            <div
              style={{
                float: "left",
                width: 120,
                height: 25,
                margin: "16px 24px 16px 0",
                background: "rgba(255, 255, 255, 0.2)",
              }}
              onClick={() => setCurrent("")}
            />
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={onClick}
            selectedKeys={[current]}
            items={MENU_ITEM}
            disabledOverflow
          />
        </Row>
      </Header>
    </>
  );
};

export default HeaderComponent;
