import React from "react";
import "./homePage.css";
import { Artis, Data_Konser, Display_User } from "../../assets/Index";
import { Row, Col, Card, Button, Space } from "antd";

const HomePages = () => {
  return (
    <div className="container-home">
      <h1 className="text-home">Selamat Datang Admin</h1>

      <Row gutter={50} justify="center" className="container-card">
        <Col span={6}>
          <Card
            cover={<img src={Data_Konser} alt="data" className="cover-card" />}
            className="card-text"
            bordered={false}
            hoverable
          >
            <Space direction="vertical">
              <span>Data Konser</span>
              <span>8</span>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            cover={<img src={Artis} alt="data" className="cover-card" />}
            className="card-text"
            bordered={false}
            hoverable
          >
            <Space direction="vertical">
              <span>Data Artis</span>
              <span>8</span>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            cover={<img src={Display_User} alt="data" className="cover-card" />}
            className="card-text"
            bordered={false}
            hoverable
          >
            <Space direction="vertical">
              <span>Tampilan User</span>
              <Button type="primary" className="btn-go">Go to Pages</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePages;
