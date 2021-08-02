import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import OrderScreen from "../screens/OrderScreen";
import TakingOrders from "../screens/TakingOrders";
import MyScan from "../components/MyScan";
import AddMember from "../screens/AddMember";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Stack_SplacrScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Stack_SplacrScreen" component={SplashScreen} />
      <Stack.Screen name="Stack_HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Stack_OrderScreen" component={OrderScreen} />
      <Stack.Screen name="Stack_TakingOrdersScreen" component={TakingOrders} />
      <Stack.Screen name="Stack_MyScan" component={MyScan} />
      <Stack.Screen name="Stack_AdminHomeScreen" component={AdminHomeScreen} />
      <Stack.Screen name="Stack_AddMember" component={AddMember} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
