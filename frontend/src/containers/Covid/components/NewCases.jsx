import React from 'react';

import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Card, CardBody, Col } from 'reactstrap';
import FlashIcon from 'mdi-react/FlashIcon';

const data = [{ value: 68, fill: '#ff4861' },
  { value: 32, fill: '#eeeeee' }];

const HeartRate = ({cases}) => {

  return (
    <Col md={12} xl={3} lg={6} sm={12} xs={12}>
      <Card>
        <CardBody className="dashboard__health-chart-card">
          <div className="card__title">
            <h5 className="bold-text card__title-center">{"New Cases"}</h5>
          </div>
          <div className="dashboard__health-chart">
            <ResponsiveContainer height={180}>
              <PieChart>
                <Pie data={data} dataKey="value" cy={85} innerRadius={80} outerRadius={90} />
              </PieChart>
            </ResponsiveContainer>
            <div className="dashboard__health-chart-info">
              <FlashIcon style={{ fill: '#ff4861' }} />
              <p className="dashboard__health-chart-number">{cases}</p>
              <p className="dashboard__health-chart-units">Cases</p>
            </div>
          </div>
          {/* <p className="dashboard__goal">Reference: 58-120</p> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default HeartRate;
