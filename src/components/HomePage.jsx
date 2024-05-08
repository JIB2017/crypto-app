import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components/index'

const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } =  useGetCryptosQuery();
  const response = data?.data;

  if (isFetching) return "Loading ..."

  return (
    <div className='routes'>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(response.totalCoins)}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(response.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(response.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(response.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(response.totalMarkets)}/></Col>
      </Row>
      <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptos In The World</Title>
        <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <News simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to="/news">Show more</Link></Title>
      </div>
    </div>
  )
}

export default HomePage