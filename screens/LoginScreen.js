import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import LoginForm from '../components/login/LoginForm'

const LoginScreen = ({navigation}) => {
  return (
    <View style={style.container}>
        <View style={style.imageContainer}>
            <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-256.png",width:100,height:100}} style={{}}/>
        </View>
        <LoginForm navigation={navigation}/>

    </View>
  )
}

export default LoginScreen

const style = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:50,
        paddingHorizontal:20,
        backgroundColor:'white'
        
    },
    imageContainer:{
        marginTop:60,
        alignItems:'center'
    },
    formcontainer:{

    }
})