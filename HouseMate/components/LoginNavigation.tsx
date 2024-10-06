import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/components/login";
import Main from "./main";
import Home from "@/app/(tabs)/index";
import noHouseAssignedScreen from "@/components/noHouseAssigned";

import { useUser } from "../context/userContext";
const Stack = createStackNavigator();

const LoginNavigation = () => {
  const { UID } = useUser();
  const [initialRouteName, setInitialRouteName] = useState(
    UID ? "Main" : "Login"
  );

  useEffect(() => {
    setInitialRouteName(UID ? "Main" : "Login");
  }, [UID]);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="assignHouse"
          options={{ headerShown: false }}
          component={noHouseAssignedScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
