import React, { useState } from "react";
import "./display.css";
import { CardHeaderThreeComponent } from "../../components/layouts/header/headerForm/Index";
import { Space, Row, Col, Card, Button, Result, Input } from "antd";
import { Jfest } from "../../assets/Index";
import { GET_KONSER } from "./query/display-query";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { PushpinOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/layouts/loading/LoadingComponent";

const DisplayPage = () => {
  const {
    data: konserData,
    loading: isKonserLoading,
    error: isKonserError,
  } = useQuery(GET_KONSER);

  const [data = konserData?.konser, setData] = useState();

  const handleSearch = (e) => {
    const value = e.target.value;

    setData(
      konserData?.konser.filter((item) => {
        const isMatchKonser = value
          ? item.namaKonser.toLowerCase().includes(value.toLowerCase())
          : true;

        return isMatchKonser;
      })
    );
  };

  console.log(konserData);

  return (
    <>
      <CardHeaderThreeComponent>
        <Space direction="vertical" className="container-headline">
          <span className="headline">
            Temukan Pengalaman Musik Terbaik di Konser-konser Terbaru!
          </span>
          <span className="desc-headline">
            Cari informasi seputar Konser Musik yang Kamu Sukai disini.
          </span>
        </Space>
      </CardHeaderThreeComponent>

      {isKonserLoading ? (
        <LoadingComponent />
      ) : (
        <Space direction="vertical" className="container-item">
          <Input
            placeholder="Cari Konser Disini"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
          />

          {konserData && data && data.length > 0 ? (
            <Row justify="start" gutter={[12, 24]}>
              {konserData &&
                data &&
                data?.map((item) => (
                  <Col xs={12} sm={8} md={8} lg={8} xl={8} key={item.uuid}>
                    <Link to={`/display-user/${item.uuid}`}>
                      <Card
                        cover={<img src={item.avatar} alt="j-fest" />}
                        className="container-cardItem"
                        bordered={false}
                        hoverable
                      >
                        <Space direction="vertical" className="container-desc">
                          <span className="nama-konser">{item.namaKonser}</span>
                          <span className="tanggal">
                            {dayjs(item.tanggal).format("DD MMMM YYYY")}
                          </span>
                          <Link to={item.lokasi} target="_blank">
                            <Button
                              type="primary"
                              icon={<PushpinOutlined />}
                              className="btn-loc"
                            >
                              Lokasi
                            </Button>
                          </Link>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                ))}
            </Row>
          ) : (
            <Row justify="center" align="middle">
              <Result status="404" subTitle="Product not found" />
            </Row>
          )}
        </Space>
      )}
    </>
  );
};

export default DisplayPage;
