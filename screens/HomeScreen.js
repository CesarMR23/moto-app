import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/navOptions.js';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice.js';
import { Icon } from 'react-native-elements';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const googlePlacesRef = useRef(null);
  
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
          onPress={(data, details=null) =>{
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
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
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
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text:{
        color: "blue",
    }
})