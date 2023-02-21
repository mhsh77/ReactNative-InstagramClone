import { View, Text, TouchableOpacity ,Image, StyleSheet} from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => {
  return (
    <View style={style.container}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
  )
}
const Header = ({navigation}) => (
<View style={style.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image source={{uri:'https://img.icons8.com/ios-filled/100/ffffff/back.png'}} style={{width:30,height:30}}/>
        </TouchableOpacity>
      <Text style={style.title}>New Post</Text>
      <Text></Text>
    </View>

)
    
export default AddNewPost

const style = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    container:{
        marginHorizontal:10
    },
    title:{
        color:'white',
        fontWeight:'700',
        fontSize:20,
        marginRight:23,
        
    }
})