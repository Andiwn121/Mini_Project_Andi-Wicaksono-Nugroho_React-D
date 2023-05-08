import React from "react";
import "./layout.css";
import { Layout } from "antd";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";

const LayoutComponent = ({ children }) => {

    const {Content} = Layout;

  return (
    <>
      <Layout>
        <HeaderComponent />
        
        <Content
          className="site-layout"
          style={{
            padding: "0px",
          }}
        >
          <div
            style={{
              padding: 0,
              minHeight: 380,
            }}
          >
            {children}
          </div>
        </Content>

        <FooterComponent />
      </Layout>
    </>
  );
};

export default LayoutComponent;
