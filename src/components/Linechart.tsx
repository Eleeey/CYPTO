// import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
interface Props{
  coinHistory:any,
  currentPrice:any,
  coinName:any,
  color:any
}

ChartJS.register(ArcElement, Tooltip, Legend, TimeScale);
const { Title } = Typography;
//@ts-ignore
const Linechart = ({ coinHistory,currentPrice,coinName,color}:Props) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.unshift(coinHistory?.data?.history[i].price);
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimeStamp.unshift(
      new Date(
        coinHistory?.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: `Price of ${coinName}`,
        data: coinPrice,
        fill: false,
        backgroundColor: `${color}`,
        borderColor: `${color}`,
      },
    ],
  };
  const options = {};
  console.log(coinTimeStamp);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          <span style={{ color: `${color}` }}>{coinName}</span> Price Chart
        </Title>
        <Col className="price-container">
          <Title
            style={{ color: `${color}` }}
            level={2}
            className="current-price-change"
          >
            {coinHistory?.data?.change}%
          </Title>
          <Title level={2} className="current-price">
            Current <span style={{ color: `${color}` }}>{coinName}</span> Price:{" "}
            <span style={{ color: `${color}` }}>${currentPrice}</span>
          </Title>
        </Col>
      </Row>

      <Line data={data} options={options} />
    </>
  );
};

export default Linechart;
