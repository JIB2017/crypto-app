import HTMLReactParser from "html-react-parser/lib/index";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetCryptoHistoryQuery, useGetCryptosDetailsQuery } from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [ timePeriod, setTimePeriod ] = useState("7d");
  const { data: response, isFetching } = useGetCryptosDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});
  const coin = response?.data?.coin;
  // const coinHistory = period?.data?.history;
  
  // console.log(response?.data?.coin);

  if (isFetching) return "Is loading..."

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${coin?.price && millify(coin?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coin?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${coin?.["24hVolume"] && millify(coin?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coin?.marketCap && millify(coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${coin?.allTimeHigh?.price && millify(coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coin?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${coin?.supply?.total && millify(coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${coin?.supply?.circulating && millify(coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coin.name} Price
        </Title>
        <p>
          {coin.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select 
        defaultValue="7d" 
        className="select-timeperiod" 
        placeholder="Select Time Period" 
        onChange={(value) => setTimePeriod(value)}>
          {time.map((date) => <Option key={date}>{date}</Option>) }
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(coin?.price)} coinName={coin?.name} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={2} className="coin-detail-container">
              {coin.name} Value Statistics
            </Title>
            <p>An onverview showing the stats of {coin.name}</p>
          </Col>
          {stats.map(({title, value, icon}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="coin-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={2} className="coin-detail-container">
              {coin.name} Others Statistics
            </Title>
            <p>An onverview showing the stats of all currencies</p>
          </Col>
          {genericStats.map(({title, value, icon}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {coin.name}
            </Title>
              {HTMLReactParser(coin.description)}
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {coin.name} Links
            </Title>
            {coin.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails