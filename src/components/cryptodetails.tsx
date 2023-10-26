import React,  { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select,} from "antd";
import {  Linechart, Loader } from ".";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCryptosDetailsQuery, useGetCryptosHistoryQuery } from "../services/crpto";

const { Title, Text } = Typography;
const { Option } = Select;

const Cryptodetails = () => {
  const { coinid } = useParams();
  const [ timePeriod, setTimePeriod ] = useState("7d");
  const { data, isFetching } = useGetCryptosDetailsQuery(coinid);
  const { data:coinHistory } = useGetCryptosHistoryQuery({coinid, timePeriod});
  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  
  if (isFetching) return <Loader/>;
  console.log(cryptoDetails)
  return (
    <>
      <Col>
        {/* // heading for crpto Details */}
        <Col className="coin-heading-container">
        <img className="coin-logo" src={cryptoDetails.iconUrl} alt={`an image of ${cryptoDetails.name} logo`} />
          <Title level={2} className="coin-name">
            <span style={{ color: `${cryptoDetails.color}` }}>
              {cryptoDetails.name} ({cryptoDetails.symbol})
            </span>{" "}
            Price
          </Title>
          
          <p>
            <span style={{ color: `${cryptoDetails.color}` }}>
              {cryptoDetails.name}
            </span>{" "}
            live price in US Dollar (USD). View value statistics, market cap and
            supply.
          </p>
        </Col>
        {/* heading ends */}

        {/* dropdown that sorts chart timeframe */}
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Time Period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{}</Option>
          ))}
        </Select>
        {/* dropdown ends here */}
        
        
        <Linechart
        //@ts-ignore
        color={cryptoDetails.color}
        //@ts-ignore
          coinHistory={coinHistory}
          //@ts-ignore
          currentPrice={millify(cryptoDetails.price)}
          //@ts-ignore
          coinName={cryptoDetails.name}
        />
        
        {/* coin stats section */}
        <Col className="stats-container">
          {/* main coin stats */}
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                <span style={{ color: `${cryptoDetails.color}` }}>
                  {cryptoDetails.name}
                </span>{" "}
                Value Statistics
              </Title>
              <p>
                An overview showcasing the stats for{" "}
                <strong
                  style={{ display: "inline", color: `${cryptoDetails.color}` }}
                >
                  {cryptoDetails.name}
                </strong>
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text
                  style={{ color: `${cryptoDetails.color}` }}
                  className="stats"
                >
                  {value}
                </Text>
              </Col>
            ))}
          </Col>

          {/* other coin stats */}
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Stats Info
              </Title>
              <p>
                An overview showing the statistics of {cryptoDetails.name}, such
                as the base and quote currency, the rank, and trading volume.
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text
                  style={{ color: `${cryptoDetails.color}` }}
                  className="stats"
                >
                  {value}
                </Text>
              </Col>
            ))}
          </Col>
        </Col>

        {/* coin links section */}
        <Col className="coin-desc-link">
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              Other{" "}
              <span style={{ color: `${cryptoDetails.color}` }}>
                {cryptoDetails.name}
              </span>{" "}
              Links
            </Title>
            {cryptoDetails?.links.map((link: { name: boolean | React.Key | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; url: string | undefined; }) => (
              //@ts-ignore
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a
                  style={{ color: `${cryptoDetails.color}` }}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default Cryptodetails;
