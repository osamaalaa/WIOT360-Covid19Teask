import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  AreaChart, Area, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import Panel from '../../../shared/components/Panel';
import getTooltipStyles from '../../../shared/helpers';


const ChartBig = ({ dir, themeName , cases , recoverCases }) => {

  const data = [
    { name: 'Page A', uv: cases },
    { name: 'Page B', uv: recoverCases },
    { name: 'Page C', uv: cases },
    { name: 'Page D', uv: cases },
    { name: 'Page E', uv: 45 },
    { name: 'Page E', uv: 41 },
    { name: 'Page F', uv: cases },
    { name: 'Page G', uv: 58 },
  ];
  

  return (
    <Panel lg={12}  title={"LastLEFT"}>
      <div className="dashboard__weight-stats"> 
        <div className="dashboard__weight-stat">
          <p className="dashboard__weight-stat-title">Recovered Cases</p>
          <p className="dashboard__weight-stat-value dashboard__weight-stat-value--control">{recoverCases}</p>
        </div>
        <div className="dashboard__weight-stat">
          <p className="dashboard__weight-stat-title">NewCases </p>
          <p className="dashboard__weight-stat-value dashboard__weight-stat-value--total">{cases}</p>
        </div>
      </div>
      <div dir="ltr">
        <ResponsiveContainer height={250}>
          <AreaChart
            data={data}
            margin={{
              top: 0, right: 0, left: -15, bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FA697D" stopOpacity={1} />
                <stop offset="100%" stopColor="#E14C4C" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <YAxis
              tickFormatter={value => `${value}`}
              axisLine={false}
              tickLine={false}
              orientation={dir === 'rtl' ? 'right' : 'left'}
            />
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#F66C7D"
              strokeWidth={3}
              fill="url(#colorUv)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
};

ChartBig.propTypes = {
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({ themeName: state.theme.className }))(ChartBig);
