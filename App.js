import react from "react"; 
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from "react-redux";
import { store } from  "./store.js";
import HomeScreen from "./screens/HomeScreen.js";
import MapScreen from "./screens/MapScreen.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
          behavior={Platform.OS === "android" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "android" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen 
                name='HomeScreen' 
                component={HomeScreen}
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name='MapScreen' 
                component={MapScreen}
                options={{
                  headerShown: false,
                }} 
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
      </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
    
  );
}
