import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/newPostScreen'
import 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
const stack = createStackNavigator();
const screenOptions = {
    headerShown:false,
}

export const SigndeInStack = () => {
  return (
      <NavigationContainer>
          <stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
              <stack.Screen name='Home' component={HomeScreen}/>
              <stack.Screen name='NewPost' component={NewPostScreen}/>
          </stack.Navigator>
      </NavigationContainer>
    
  )
}

export const SigndeOutStack = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
                <stack.Screen name='Login' component={LoginScreen}/>
                <stack.Screen name='Signup' component={SignUpScreen}/>
            </stack.Navigator>
        </NavigationContainer>
      
    )
  }
  
