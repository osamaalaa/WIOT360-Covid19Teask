import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Card, CardBody, Col } from 'reactstrap';
import WalkIcon from 'mdi-react/WalkIcon';

const data = [{ value: 1200, fill: '#4ce1b6' },
  { value: 800, fill: '#eeeeee' }];

const Recovered = ({recoverCases}) => {
  return (
    <Col md={12} xl={3} lg={6} sm={12} xs={12}>
      <Card>
        <CardBody className="dashboard__health-chart-card">
          <div className="card__title">
            <h5 className="bold-text card__title-center">{"Recovered Cases"}</h5>
          </div>
          <div className="dashboard__health-chart">
            <ResponsiveContainer height={180}>
              <PieChart>
                <Pie data={data} dataKey="value" cy={85} innerRadius={80} outerRadius={90} />
              </PieChart>
            </ResponsiveContainer>
            <div className="dashboard__health-chart-info">
              <WalkIcon style={{ fill: '#4ce1b6' }} />
              <p className="dashboard__health-chart-number">{recoverCases}k</p>
              <p className="dashboard__health-chart-units">Cases</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Recovered;
