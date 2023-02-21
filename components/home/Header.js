import { View, Text ,Image,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { auth } from '../../firebase'
const Header = ({navigation}) => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const signOut = async()=>{
        try {
          await auth.signOut().then(() => console.log('User signed out!'));

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={async()=>{ await signOut()} }>
            <Image style={styles.logo} source={require('../../assets/header-logo.png')}/>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> navigation.push("NewPost")}>
                <Image style={styles.icons} source={require('../../assets/add-header.png')}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.icons} source={require('../../assets/heart-png.png')}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.unreadBadge}>
                    <Text style={{color:'white',fontWeight:'600'}}>11</Text>
                </View>
                <Image style={styles.icons} source={require('../../assets/send-png.png')}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    logo:{
        width:100,
        height:50,
        resizeMode:'contain'
    },
    container:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:20,
    },
    icons:{
        width:25,
        height:30,
        resizeMode:'contain',
        marginHorizontal:5,
    },
    unreadBadge:{
        backgroundColor:'red',
        position:'absolute',
        left:20,
        width:25,
        height:20,
        justifyContent:'center',
        alignItems:'center', 
        borderRadius:25,
        zIndex:100,
    }
})
export default Header