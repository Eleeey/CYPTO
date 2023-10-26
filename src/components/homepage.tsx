// import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/crpto";
import { CryptoCurrencies, News, Loader } from ".";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader />;
  console.log(data);
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Services
      </Title>

      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              style={{ textAlign: "center" }}
              title="Total Coins"
              value={globalStats.total}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              style={{ textAlign: "center" }}
              title="Total Exchanges"
              value={globalStats.totalExchanges}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              style={{ textAlign: "center" }}
              title="Total Market Cap"
              value={`$${millify(globalStats.totalMarketCap)}`}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              style={{ textAlign: "center" }}
              title="Total 24th Volume"
              value={`$${millify(globalStats.total24hVolume)}`}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              style={{ textAlign: "center" }}
              title="Total Markets"
              value={globalStats.totalMarkets}
            />
          </Card>
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Coins
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/cryptocurrencies"}>More Coins</Link>
        </Title>
      </div>
      <CryptoCurrencies hidden={true} />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top Trending News
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/news"}>More News</Link>
        </Title>
      </div>
      <News hidden={true} />
    </>
  );
};

export default Homepage;
