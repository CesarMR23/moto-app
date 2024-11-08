import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import RideOptionsCard from './RideOptionsCard';
import { setDestination } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites.js';
const apiKey = GOOGLE_MAPS_APIKEY;

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const googlePlacesRef = useRef(null);

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Hello World</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View style={tw`relative`}>
                    <GooglePlacesAutocomplete
                        ref={googlePlacesRef}
                        placeholder='Where to?'
                        styles={toInputBoxStyles}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,  
                                })
                            );
                            navigation.navigate("RideOptionsCard");
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: apiKey,
                            language: "en",
                            components: "country:VE", // Limitar búsqueda a Venezuela
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                        renderRightButton={() => (
                            <View style={tw`absolute right-3 top-2`}>
                                <TouchableOpacity
                                    style={tw`items-center justify-center`}
                                    onPress={() => {
                                        googlePlacesRef.current.clear();
                                    }}
                                >
                                    <Icon name='close' type='material' color='gray' size={25} />
                                </TouchableOpacity>
                            </View>
                        )}    
                    />
                    <NavFavourites />
                </View>
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("RideOptionsCard")}
                    style={tw`flex flex-row bg-black justify-between w-24 px-4 py-5 rounded-full`}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-5 rounded-full`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 10,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 10,
        paddingBottom: 0,
    },
});
