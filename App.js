/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '@env';
MapboxGL.setAccessToken(MAPBOX_API_KEY);
const App = () => {
  const CameraRef = React.useRef(null);
  const [myLocation, setMyLocation] = React.useState([121.0440303, 14.5541878]); //my own locations
  const [locations, setLocations] = React.useState([
    {label: 'me', coor: [121.2185, 14.178]},
    {label: 'UPLB Gate', coor: [121.2434, 14.1674]},
    {label: 'LB Park', coor: [121.2238, 14.1822]},
    {label: 'UPLB Freedom Park', coor: [121.241354, 14.162055]},
    {label: 'UPLB Carabao Park', coor: [121.243122602, 14.166892875]},
    {label: 'LB Dampalit Falls', coor: [121.2145, 14.1619]},
  ]);
  function CenterCamera(location) {
    // console.log(location);
    if (CameraRef.current) {
      CameraRef.current.setCamera({
        centerCoordinate: location,
        zoomLevel: 13,
        animationDuration: 2000,
      });
    }
  }
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          zoomEnabled={true}
          scrollEnabled={true}
          showUserLocation={true}
          compassEnabled={true}
          logoEnabled={false}
          attributionEnabled={false}
          styleURL={MapboxGL.StyleURL.Street}>
          <MapboxGL.Camera
            centerCoordinate={myLocation}
            ref={ref => {
              CameraRef.current = ref;
              CenterCamera(myLocation);
            }}
          />

          <MapboxGL.UserLocation
            visible={true}
            showsUserHeadingIndicator={true}
            renderMode="native"
            androidRenderMode="compass"
            onUpdate={event => {
              setMyLocation([event.coords.longitude, event.coords.latitude]);
            }}
          />
          {locations.map((location, index) => {
            return (
              <MapboxGL.PointAnnotation
                key={index}
                coordinate={location.coor}
              />
            );
          })}
        </MapboxGL.MapView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    height: '50%',
    width: '100%',
    backgroundColor: 'red',
  },
  map: {
    flex: 1,
  },
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },
  clusteredPoints: {},
  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
  circleLayer: {
    circlePitchAlignment: 'map',
    circleColor: '#A59ADD',
    circleRadius: [
      'step',
      ['get', 'point_count'],
      20,
      100,
      25,
      250,
      30,
      750,
      40,
    ],
    circleOpacity: 0.84,
    circleStrokeWidth: 0,
    circleStrokeColor: 'blue',
  },
});
