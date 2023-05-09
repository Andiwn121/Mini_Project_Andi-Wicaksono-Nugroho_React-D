import React from "react";
import { Layout } from "antd";

const FooterComponent = () => {
  const { Footer } = Layout;

  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor:"#4b0082",
        color: "#fff"
      }}
    >
      SonicSpectrum ©2023 Created by Andi Wicaksono Nugroho
    </Footer>
  );
};

export default FooterComponent;
