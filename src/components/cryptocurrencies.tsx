import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/crpto";
import { Loader } from ".";
interface Props {
  hidden: boolean;
}
const Cryptocurrencies = ({ hidden }: Props) => {
  const count = hidden ? 4 : 29000;
  const { data: crpytosList, isFetching } = useGetCryptosQuery(count);
  const [crypto, setCryptos] = useState(crpytosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  // HOOK TO FILTER SEARCH FIELD
  useEffect(() => {
    const filteredData = crpytosList?.data?.coins.filter((coin: any) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [crpytosList, searchTerm]);

  if(isFetching) return <Loader/>
  return (
    <>
      {!hidden && (
        <div className="search-crypto">
          <Input
            type=""
            placeholder="Search Coins"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {crypto?.map(
          (currency: {
            uuid: React.Key | null | undefined;
            rank: any;
            name: any;
            iconUrl: string | undefined;
            price: number;
            marketCap: number;
            change:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              {/* Note: Change currency.id to currency.uuid  */}
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                  hoverable
                >
                  <p>Price: {`$${millify(currency.price)}`}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {currency.change}%</p>
                </Card>
              </Link>
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
