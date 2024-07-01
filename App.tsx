import "./src/styles/global.css";
import Home from "./src/app/Home";
import Login from "./src/app/Login";
import Register from "./src/app/Register";
import Principal from "./src/app/Principal";
import Profile from "./src/app/Profile";
import React from "react";
import Categories from "./src/app/Categories";
import Category from "./src/app/Category";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/context/AuthContext";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Principal: undefined;
  Profile: undefined;
  Categories: undefined;
  Category: { categoria: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Principal" component={Principal} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Category" component={Category} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
