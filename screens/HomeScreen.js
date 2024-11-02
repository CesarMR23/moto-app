import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/navOptions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin, selectorOrigin } from '../slices/navSlice';
import { Icon } from 'react-native-elements';
import { getLocation } from '../services/locationService'

const apiKey = GOOGLE_MAPS_APIKEY;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const googlePlacesRef = useRef(null);
  const origin = useSelector(selectorOrigin);

  const handleGetLocation = async () => {
    const location = await getLocation();
    if (location) {
        const originData = {
            location: {
                lat: location.latitude,
                lng: location.longitude,
            },
            description: "Ubicación actual",
        };
        dispatch(setOrigin(originData));
    }
};

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
            style={{
                width:100,
                height:100,
                resizeMode: "contain",
            }}
            source={{
                uri:"https://links.papareact.com/gzs",
            }}
        />

      <Text style={styles.title}>Current Location</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
        <Text style={styles.buttonText}>Get Current Location</Text>
      </TouchableOpacity>

        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder='where from?'
          styles={{
            container:{
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }));

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: apiKey,
            language: "en",
            components: "country:VE", // Limitar a Venezuela
          }}
          debounce={400}
          renderRightButton={() => (
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity 
                style={tw`w-6 h-6 bg-gray-100 rounded-full items-center justify-center`}
                onPress={() => {
                  googlePlacesRef.current.clear();
                }}
              >
                <Icon name='close' type='material' color='gray' size={18} />
              </TouchableOpacity>
            </View>
          )} 
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    text:{
        color: "blue",
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
});
