import { View, Text, SafeAreaView,StyleSheet,StatusBar } from 'react-native'
import React from 'react'
import AddNewPost from '../components/newPost/addNewPost'
const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={style.safearea}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default NewPostScreen
const style = StyleSheet.create({
    safearea:{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor:'black',
    flex : 1,
    }
})