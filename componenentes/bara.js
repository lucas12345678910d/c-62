import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Pesquisa from "../telas/pesquisa";
import Transacao from "../telas/transacao";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default class Barra extends Component {
    render(){
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Pesquisa') {
              iconName = "search"
            } else if (route.name === 'transação') {
              iconName ="book" 
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Pesquisa" component={Pesquisa} />
        <Tab.Screen name="transação" component={Transacao} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
}