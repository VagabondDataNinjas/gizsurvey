/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Cluster, Marker, Popup, ScaleControl } from 'react-mapbox-gl';
import {
  Segment,
} from 'semantic-ui-react';
import markerData from './data.json';

const ReactMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZ2l6LWdyb290cyIsImEiOiJjamFxdjdhemQ0YnFhMnFvaW56M3lrd3llIn0.ZOAFWU-zAj0Eu95ubcteEw'
});
const styles = {
  clusterMarker: {
  },
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [100.368145, 9.4578508],
      zoom: 5,
      popup: false,
      items: [],
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        items: markerData,
      });
    }, 3000);
  }

  onClusterMouseEnterHandler(coordinates, total, getLeaves) {
    const leaves = getLeaves();
    const contents = [];
    leaves.forEach((reactElement) => {
      const m = reactElement.props;
      contents.push(`${m.name}: ${m.price} THB`);
    });
    this.setState({
      popup: {
        coordinates,
        total,
        contents,
      },
    });
  }

  onClusterMouseLeaveHandler(coordinates, total, getLeaves) {
    this.setState({
      popup: false,
    });
  }

  onMarkerMouseEnterHandler(m) {
    this.setState({
      popup: {
        coordinates: [m.longitude, m.latitude],
        total: 1,
        contents: [`${m.name}: ${m.price} THB`],
      },
    });
  }

  onMarkerMouseLeaveHandler() {
    this.setState({
      popup: false,
    });
  }

  clusterClick(coordinates) {
    this.setState({
      popup: false,
      center: coordinates,
      zoom: this.state.zoom + 1,
    });
  }

  clusterMarker() {
    return (coordinates, pointCount, getLeaves) => {
      const leaves = getLeaves();
      let sum = false;

      leaves.forEach((reactElement) => {
        const mPrice = reactElement.props.price;
        sum += mPrice;
      });
      const avg = (sum) / pointCount;
      return (
        <Marker
          key={coordinates.toString()}
          coordinates={coordinates}
          style={styles.clusterMarker}
          onClick={() => this.clusterClick(coordinates)}
          onMouseEnter={() => this.onClusterMouseEnterHandler(coordinates, pointCount, getLeaves)}
          onMouseLeave={() => this.onClusterMouseLeaveHandler(coordinates, pointCount, getLeaves)}
        >
          <Mark borderSize={Math.min(pointCount, 4) - 1} size={45 + (Math.min(pointCount, 8) * 5)} color={percentageToHsl(getPriceInPercentage(avg), 0, 120)}>
            {avg.toFixed(1)}
          </Mark>
        </Marker>
      );
    };
  }

  render() {
    const { center, popup, zoom, items } = this.state;
    return (
      <Segment style={{ height: '100vh', width: '100vw', position: 'relative' }} className="center aligned">
        <ReactMap
          style="mapbox://styles/mapbox/streets-v10"
          zoom={[zoom]}
          center={center}
          onZoom={(e) => this.setState({ zoom: e.transform._zoom })}
        >
          <Cluster ClusterMarkerFactory={this.clusterMarker()}>
            {items.map((item, i) => (
              <Marker
                coordinates={[item.longitude, item.latitude]}
                price={item.price}
                name={item.name}
                key={item.name}
                onClick={() => this.clusterClick([item.longitude, item.latitude])}
                onMouseEnter={(e) => this.onMarkerMouseEnterHandler(item)}
                onMouseLeave={() => this.onMarkerMouseLeaveHandler(item)}
              >
                <Mark size={50} color={percentageToHsl(getPriceInPercentage(item.price), 0, 120)}>
                  <span>{item.price.toFixed(1)}</span>
                </Mark>
              </Marker>
            ))}
          </Cluster>
          {popup && (
          <Popup offset={[0, -50]} coordinates={popup.coordinates}>
            <StyledPopup>
              {popup.contents.map(
                (content) => (
                  <div key={content}>
                    {content}
                  </div>
                )
              )}
            </StyledPopup>
          </Popup>
        )}
          <ScaleControl />
        </ReactMap>
      </Segment>

    );
  }
}

Map.propTypes = {
};

export default Map;

function getPriceInPercentage(price) {
  const min = 20;
  const max = 50;

  if (price < min) {
    return 0;
  }
  if (price > max) {
    return 1;
  }
  const range = max - min;
  return ((price - min)) / range;
}

const Mark = ({ borderSize = 0, size, color, children }) => (
  <div style={{
    backgroundColor: color,
    borderRadius: '50%',
    border: borderSize + 'px solid #666',
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '1px 1px 10px #888888',
    fontWeight: 500,
  }}
  >
    {children}
  </div>
);

const StyledPopup = ({ children }) => (
  <div
    style={{
      background: 'white',
      color: '#333',
      padding: '5px',
      borderRadius: '2px',
      fontWeight: 400,
    }}
  >
    {children}
  </div>
);

function percentageToHsl(percentage) {
  const hue = ((1 - percentage) * 120);
  return ['hsla(', hue, ',120%,50%, 0.8)'].join('');
}
