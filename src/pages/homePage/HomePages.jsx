import React from "react";
import "./homePage.css";
import { Artis, Data_Konser, Display_User } from "../../assets/Index";
import { Row, Col, Card, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { GET_ARTIS_AGGREGATE, GET_KONSER_AGGREGATE } from "./query/home-query";
import { useQuery} from "@apollo/client";


const HomePages = () => {
  const {
    data: artisData,
    loading: isArtisLoading,
    error: isArtisError,
  } = useQuery(GET_ARTIS_AGGREGATE);

  const {
    data: konserData,
    loading: isKonserLoading,
    error: isKonserError,
  } = useQuery(GET_KONSER_AGGREGATE);

  const jumlahKonser = konserData?.konser_aggregate?.aggregate?.count ?? 0;
  const jumlahArtis = artisData?.artis_aggregate?.aggregate?.count ?? 0;
  

  return (
    <div className="container-home">
      <h1 className="text-home">Selamat Datang Admin</h1>

      <Row gutter={50} justify="center" className="container-card">
        <Col span={6}>
          <Link to="/data-konser">
            <Card
              cover={
                <img src={Data_Konser} alt="data" className="cover-card" />
              }
              className="card-text"
              bordered={false}
              hoverable
            >
              <Space direction="vertical">
                <span className="judul-data">Data Konser</span>
                <span className="jumlah-data" onLoad={isKonserLoading}>{ jumlahKonser }</span>
              </Space>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/data-artis">
            <Card
              cover={<img src={Artis} alt="data" className="cover-card" />}
              className="card-text"
              bordered={false}
              hoverable
            >
              <Space direction="vertical">
                <span className="judul-data">Data Artis</span>
                <span className="jumlah-data" onLoad={isArtisLoading}>{ jumlahArtis }</span>
              </Space>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Card
            cover={<img src={Display_User} alt="data" className="cover-card" />}
            className="card-text"
            bordered={false}
            hoverable
          >
            <Space direction="vertical">
              <span className="judul-data">Tampilan User</span>
              <Button type="primary" className="btn-go">
                Go to Pages
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePages;
