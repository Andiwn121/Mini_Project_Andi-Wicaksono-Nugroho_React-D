import React from "react";
import "./homePage.css";
import { Row, Col, Card, Button, Space } from "antd";

const HomePages = () => {
  return (
    <div className="container-home">
      
        <h1 className="text-home">Selamat Datang Admin</h1>

        <Row gutter={50} justify="center" className="container-card">
          <Col span={6}>
            <Card
              title={<h2>Data Konser</h2>}
              className="card-text"
              bordered={false}
              hoverable
            >
              8
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title={<h2>Data Artis</h2>}
              className="card-text"
              bordered={false}
              hoverable
            >
              8
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title={<h2>Tampilan User</h2>}
              className="card-text"
              bordered={false}
              hoverable
            >
              <Button type="primary">Go to Pages</Button>
            </Card>
          </Col>
        </Row>
      
    </div>
  );
};

export default HomePages;
