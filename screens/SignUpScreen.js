import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import SignUpForm from '../components/Signup/SignUpForm'

const SignUpScreen = ({navigation}) => {
  return (
    <View style={style.container}>
        <View style={style.imageContainer}>
            <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-256.png",width:100,height:100}} style={{}}/>
        </View>
        <SignUpForm navigation={navigation}/>

    </View>
  )
}

export default SignUpScreen

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