import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import MapView, { Marker }  from 'react-native-maps';
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from 'react-redux';
import { selectorDestination, selectorOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from 'react';

const apiKey = GOOGLE_MAPS_APIKEY;

const Map = () => {
  const origin = useSelector(selectorOrigin);
  const destination = useSelector(selectorDestination); 
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
  
    const timeoutId = setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }, 500); // Ajusta el tiempo según sea necesario
  
    return () => clearTimeout(timeoutId); // Limpia el temporizador al desmontar
  }, [origin, destination]);
  

  useEffect(() =>{
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial&origins=${origin.description}&destinations=
        ${destination.description}&key=${apiKey}`
      ).then((res) => res.json())
      .then(data => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
      })
    };
    getTravelTime();
  }, [origin, destination, apiKey]);
  
  return (
    <MapView 
    ref={mapRef}
      style={tw`flex-1`}
          mapType='mutedStandard'
          initialRegion={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
          }}
    >   
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={apiKey}
          strokeWidth={3}
          strokeColor='black'
        />
      )}
    
      {origin?.location &&(
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location &&(
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}

    </MapView>
  );
};

export default Map

const styles = StyleSheet.create({})