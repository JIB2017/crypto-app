import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const { Title } = Typography;

const LineChart = ({coinHistory, currentPrice, coinName}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let coin of coinHistory?.data?.history) {
    coinPrice.push(coin.price);
    coinTimestamp.push(new Date(coin.timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: 
        {
          ticks: {
            beginAtZero: true,
          },
        },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title"> Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName}: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart