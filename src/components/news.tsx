import  { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { Loader } from ".";
import { useGetCryptosNewsQuery } from "../services/cryptoNews";
import { useGetCryptosQuery } from "../services/crpto";
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "";


interface Props {
  hidden: boolean;
}
const News = ({ hidden }: Props) => {

  const [newsCategory, setNewsCategory]= useState("Cryptocurrency")
  const { data} = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory,
    count: hidden ? 4 : 70,
  });

  if (!cryptoNews?.value) return <Loader/>;

  return (
    
      <Row gutter={[4, 4]}>
        {!hidden && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Coin For Relevant News"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={( input:any, option:any) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency"> Cryptocurrency</Option>
              {data?.data?.coins.map((coin:any)=><Option value={coin.name}> {coin.name}</Option>)}
            </Select>
          </Col>
          )}
          

        
        {cryptoNews.value.map((news: any, i: any) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxHeight: "120px", maxWidth: "200px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("seconds").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
  );
};

export default News;
