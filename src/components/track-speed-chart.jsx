import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';

import 'chartist/dist/chartist.min.css';

class TrackSpeedChart extends Component {
  render() {
    const { lapData } = this.props;
    const series = lapData.points.map((e) => {
      return e.speed;
    });

    const chartData = { series: [ series ] };

    return (
      <div>
        <ChartistGraph data={chartData} type={'Line'} />
      </div>
    )
  }
}

TrackSpeedChart.propTypes = {
  lapData: PropTypes.object.isRequired
};

export default TrackSpeedChart
