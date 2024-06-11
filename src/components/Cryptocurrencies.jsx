import { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const { data: response, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(); 
  const [ searchItems, setSearchItems ] = useState("");

  useEffect(() => {
    const filteredItems = response?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchItems.toLowerCase()));

    setCryptos(filteredItems);
  }, [response?.data?.coins, searchItems]);

  if (isFetching) return "Loading ...";


  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchItems(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card'>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img src={currency.iconUrl} className='crypto-image' alt="icon" />}
                hoverable
                key={currency.uuid}
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies