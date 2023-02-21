import { View, Text, SafeAreaView,StatusBar,StyleSheet, ScrollView,Image} from 'react-native'
import React, { useEffect ,useState} from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/post'
import { USERS } from '../data/users'
import BottomTabs, { bottomTabsIcons } from '../components/home/BottomTabs'
import { db } from '../firebase'
const HomeScreen = ({navigation}) => {
  const [posts, setposts] = useState([])
  useEffect(()=>{
    db.collectionGroup('posts').onSnapshot(snapshot => {
      setposts(snapshot.docs.map(doc => ({id:doc.id,...doc.data()})));
    })
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Stories/>
      <ScrollView>
      {posts.map((post,index) => (
            <Post post={post}/>
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabsIcons} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor:'black',
    flex : 1,
  }
})
export default HomeScreen