// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HomeScreen from "./HomeScreen";
import TemperatureScreen from "./TemperatureScreen";
import BedroomScreen from "./BedroomScreen";
import LivingRoomScreen from "./LivingRoomScreen"; // Màn hình Living Room
import StudyRoomScreen from "./StudyRoomScreen"; // Màn hình Living Room
import KitchenScreen from "./KitchenScreen"; // Màn hình Living Room
import SettingsScreen from './SettingsScreen'; // Đường dẫn tới SettingsScreen



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Temperature" component={TemperatureScreen} />
        <Stack.Screen name="BedroomScreen" component={BedroomScreen} />
        <Stack.Screen name="LivingRoomScreen" component={LivingRoomScreen} />
        <Stack.Screen name="StudyRoomScreen" component={StudyRoomScreen} />
        <Stack.Screen name="KitchenScreen" component={KitchenScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
