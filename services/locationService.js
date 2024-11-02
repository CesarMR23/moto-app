import * as Location from 'expo-location';

export const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permiso denegado');
        return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    };
};
