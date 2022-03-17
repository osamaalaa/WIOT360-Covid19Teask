import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from '../../../shared/components/Panel';
import { scaleQuantile } from 'd3-scale';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};


// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#ffedea';
const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const getHeatMapData = () => {
  return [

    { name: 'Afghanistan', value: getRandomInt() },
    { name: 'Åland Islands', value: getRandomInt() },
    { name: 'Albania', value: getRandomInt() },
    { name: 'Algeria', value: getRandomInt() },
    { name: 'American Samoa', value: getRandomInt() },
    { name: 'AndorrA', value: getRandomInt() },
    { name: 'Angola', value: getRandomInt() },
    { name: 'Anguilla', value: getRandomInt() },
    { name: 'Antarctica', value: getRandomInt() },
    { name: 'Antigua and Barbuda', value: getRandomInt() },
    { name: 'Argentina', value: getRandomInt() },
    { name: 'Armenia', value: getRandomInt() },
    { name: 'Aruba', value: getRandomInt() },
    { name: 'Australia', value: getRandomInt() },
    { name: 'Austria', value: getRandomInt() },
    { name: 'Azerbaijan', value: getRandomInt() },
    { name: 'Bahamas', value: getRandomInt() },
    { name: 'Bahrain', value: getRandomInt() },
    { name: 'Bangladesh', value: getRandomInt() },
    { name: 'Barbados', value: getRandomInt() },
    { name: 'Belarus', value: getRandomInt() },
    { name: 'Belgium', value: getRandomInt() },
    { name: 'Belize', value: getRandomInt() },
    { name: 'Benin', value: getRandomInt() },
    { name: 'Bermuda', value: getRandomInt() },
    { name: 'Bhutan', value: getRandomInt() },
    { name: 'Bolivia', value: getRandomInt() },
    { name: 'Bosnia and Herzegovina', value: getRandomInt() },
    { name: 'Bouvet Island', value: getRandomInt() },
    { name: 'Brazil', value: getRandomInt() },
    { name: 'British Indian Ocean Territory', value: getRandomInt() },
    { name: 'Brunei Darussalam', value: getRandomInt() },
    { name: 'Bulgaria', value: getRandomInt() },
    { name: 'Burkina Faso', value: getRandomInt() },
    { name: 'Egypt', value: getRandomInt() },
    { name: 'Saudi Arabia', value: getRandomInt() },
    { name: 'United Arab Emirates', value: getRandomInt() },
    { name: 'Iran', value: getRandomInt() },
    { name: 'France', value: getRandomInt() },
    { name: 'Russia', value: getRandomInt() },
    { name: 'Ukraine', value: getRandomInt() },
    { name: 'Pakistan', value: getRandomInt() }
  ];
};

const ActivityChart = ({ setTooltipContent, response }) => {

  const [data] = useState(getHeatMapData());


  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const geographyStyle = {
    default: {
      outline: 'none'
    },
    hover: {
      fill: '#ccc',
      transition: 'all 250ms',
      outline: 'none'
    },
    pressed: {
      outline: 'none'
    }
  };
  return (
    <Panel xs={12} lg={12} title={"COVID-19 MAP"}>
      <div dir="ltr">

        <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
          <ZoomableGroup>
            <Geographies geography={response}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const current = data.find(s => s.name === geo.properties.NAME);
                  return (<Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME, POP_EST } = geo.properties;
                      setTooltipContent(`
                    ${NAME} — ${rounded(POP_EST)}, ${"NewCases"} —  ${rounded(POP_EST)}
                    `);
                    }}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={geographyStyle}

                  />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

      </div>
    </Panel>
  );
};

ActivityChart.propTypes = {
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({ themeName: state.theme.className }))(ActivityChart);
