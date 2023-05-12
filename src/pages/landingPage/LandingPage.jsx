import React from "react";
import { Row, Col, Space, Button } from "antd";
import "./landing.css";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div className="container-landing">
      <Row justify="center">
        <Col xl={14} align="middle">
          <Space direction="vertical" className="container-land-text">
            <span className="tagline-text">
              <span className="outlined-text-color">Listening</span>
              to good music makes your
              <span className="outlined-text-color">mood better.</span>
            </span>
            <h5 className="landing-desc">
              SonicSpectrum merupakan sebuah website yang dapat membantu anda
              mempermudah dalam mencari info seputar konser musik. telusuri
              lebih lanjut untuk melihat konser - konser yang anda inginkan!
            </h5>

            <Link to="/display-user">
              <Button className="btn-start" type="primary">
                Get Started!
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
