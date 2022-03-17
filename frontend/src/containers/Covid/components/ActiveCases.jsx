import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Card, CardBody, Col } from 'reactstrap';
import FlashIcon from 'mdi-react/FlashIcon';

const data = [{ value: 360, fill: '#f6da6e' },
  { value: 140, fill: '#eeeeee' }];

const ActiveCases = () => {

  return (
    <Col md={12} xl={3} lg={6} sm={12} xs={12}>
      <Card>
        <CardBody className="dashboard__health-chart-card">
          <div className="card__title">
            <h5 className="bold-text card__title-center">{"ACTIVE CASES"}</h5>
          </div>
          <div className="dashboard__health-chart">
            <ResponsiveContainer height={180}>
              <PieChart>
                <Pie data={data} dataKey="value" cy={85} innerRadius={80} outerRadius={90} />
              </PieChart>
            </ResponsiveContainer>
            <div className="dashboard__health-chart-info">
              <FlashIcon style={{ fill: '#f6da6e' }} />
              <p className="dashboard__health-chart-number">360</p>
              <p className="dashboard__health-chart-units">Cases</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActiveCases;
