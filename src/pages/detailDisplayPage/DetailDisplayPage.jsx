import React from "react";
import "./detailDisplay.css";
import { Space, Row, Col, Card, Button } from "antd";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import {
  GET_ARTIS,
  GET_KONSER_BY_PK,
} from "../displayPage/query/display-query";
import LoadingComponent from "../../components/layouts/loading/LoadingComponent";
import { PushpinOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Coldiac } from "../../assets/Index";
import dayjs from "dayjs";

const DetailDisplayPage = () => {
  const { uuid } = useParams();

  // get konser id param
  const {
    data: konserData,
    loading: isKonserLoading,
    error: konserError,
  } = useQuery(GET_KONSER_BY_PK, {
    variables: { uuid },
  });

  const {
    data: artisData,
    loading: isArtisLoading,
    error: artisError,
  } = useQuery(GET_ARTIS);

  return (
    <>
      {isKonserLoading ? (
        <LoadingComponent />
      ) : (
        <Card
          className="container-detail"
          cover={<img src={konserData.konser_by_pk.avatar} alt="" />}
        >
          <Row justify="center" align="middle">
            <Space direction="vertical" className="container-kons">
              <span className="detail-judul">
                {konserData.konser_by_pk.namaKonser}
              </span>
              <span className="detail-desc">
                {konserData.konser_by_pk.deskripsi}
              </span>
              <Link to={konserData.konser_by_pk.lokasi} target="_blank">
                <Button
                  type="primary"
                  icon={<PushpinOutlined />}
                  className="btn-loc"
                >
                  Lokasi
                </Button>
              </Link>
            </Space>
          </Row>

          <Row className="container-lineup" justify="start">
            <Space direction="vertical">
              <span className="lineup-text">Lineup</span>
              <Row
                justify="start"
                align="middle"
                className="looping-artis"
                gutter={[36, 32]}
              >
                {artisData &&
                  artisData.artis &&
                  artisData.artis.map((item) => (
                    <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                      <Card
                        className="container-artisLine"
                        style={{ width: 200, height: 200 }}
                        cover={
                          <div className="card-cover-circle">
                            <img src={item.avatar} alt="My Image" />
                          </div>
                        }
                      >
                        <Row justify="center" align="middle">
                          <span className="nama-artis">{item.namaArtis}</span>
                        </Row>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Space>
          </Row>

          <Row justify="center" align="middle">
            <div className="container-tiket">
              <Row justify="space-between" align="middle">
                <span className="date-konser">
                  {dayjs(konserData.konser_by_pk.tanggal).format(
                    "DD MMMM YYYY"
                  )}
                </span>
                <Link to={konserData.konser_by_pk.linkTiket} target="_blank">
                  <Button className="btn-tic" type="primary">Link Pembelian Tiket</Button>
                </Link>
              </Row>
            </div>
          </Row>
        </Card>
      )}
    </>
  );
};

export default DetailDisplayPage;
