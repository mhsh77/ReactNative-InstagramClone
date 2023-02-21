import { View, Text, ScrollView ,Image,StyleSheet} from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'
const Stories = () => {
  return (
    <View style={{marginBottom:13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story,index) => (
            <View style={{alignItems:'center',marginRight:5}} key={index}>
            <Image source={{uri:story.image}} style={styles.story}/>
            <Text style={{color:'white',fontWeight:'bold'}}>
                {story.user.length > 10 ? story.user.slice(0,10) + '...':
                                            story.user}</Text>
            </View>
        ))}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    story:{
        width:75,
        height:75,
        borderRadius:50,
        borderColor:"gold",
        borderWidth:3,
    }
})
export default Stories