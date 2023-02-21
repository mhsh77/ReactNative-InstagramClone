import { View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native'
import {Divider} from 'react-native-elements'
import React ,{useState,useEffect}from 'react'
import { color } from 'react-native-elements/dist/helpers'
import firebase,{ auth ,db} from '../../firebase'
import { collection,FieldValue } from 'firebase/firestore'



const Post = ({post}) => {
  console.log(post);
  const handleLike = post => {
    const currentUserStatus = !post.likes_by_users.includes(
      auth.currentUser.email
      )
      function arrRemove(arr,value) {
        return arr.filter(function (ele){
          return ele !=value;
        })
      }
      var likes=post.likes_by_users
      if (currentUserStatus){likes.push(auth.currentUser.email)}else{likes=arrRemove(likes,auth.currentUser.email)}
      console.log(likes);
      db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: likes
      })
      .then(()=>{
        console.log('Document Successfully Updated !');
      }).catch(error=>{
        console.log("Error updating doc :",error)
      })
  }
  return (
    <View style={{marginBottom:50}}>
      <Divider width={1} orientation='vertical'/>
      <PostHeader post={post}/>
      <PostImage post={post}/>
      <PostFooter post={post} handleLike={handleLike}/>
      <Likes post={post}/>
      <Caption post={post}/>
      <CommentSection post={post}/>
      <Comments post={post}/>
    </View>
  )
}
const PostHeader = ({post}) => (
  <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
    <View style={{flexDirection:'row',alignItems:'center',marginLeft:8}}>
      <Image source={{uri: post.profile_picture}} style={{width:50,height:50,borderRadius:50,borderWidth:2,borderColor:'gold'}}/>
      <Text style={{color:'white',marginLeft:5,fontWeight:'bold'}}>{post.user}</Text>
    </View> 
    <View style={{justifyContent:'center'}}>
      <Text style={{color:'white',fontWeight:'bold',marginRight:10}}>...</Text>
    </View>
  </View>
)
const PostImage = ({post}) => (
  <View style={{minheight:200}}>
  <Image source={{uri:post.imageUrl}} style={{minHeight:300,maxHeight:500,width:'100%',resizeMode:'contain'}}/>

  </View>
)
const PostFooter = ({post,handleLike}) => (
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View style={styles.postIcons}>
      <TouchableOpacity onPress={()=>handleLike(post)}>
      <Image style={styles.icon} source={{uri:post.likes_by_users.includes(auth.currentUser.email)? postFooterIcons[0].likedimageuri:postFooterIcons[0].imageuri}} />
      </TouchableOpacity>
      <Icon imageStyle={styles.icon} imageuri={postFooterIcons[1].imageuri} />
      <Icon imageStyle={styles.icon} imageuri={postFooterIcons[2].imageuri} />
    </View>
    <View>
    <Icon imageStyle={styles.icon} imageuri={postFooterIcons[3].imageuri} />
    </View>

  </View>

)
var num =123444554
const Likes = ({post}) => (
  <View>
    <Text style={{color:'white',marginLeft:3}}>{post.likes_by_users.length.toLocaleString('en-IN')} likes</Text>
  </View>
)
const Icon = ({imageStyle,imageuri}) => (
  <TouchableOpacity>
    <Image style={imageStyle} source={{uri:imageuri}}/>
  </TouchableOpacity>
)
const Caption = ({post}) => (
<View style={{flexDirection:'row',marginTop:5}}>
<Text style={{color:'white',fontWeight:'bold',marginRight:10}}>{post.user}</Text>
<Text style={{color:'white'}}>{post.caption}</Text>
</View>

   
)
const CommentSection = ({post}) => (
   <View style={{marginTop:5}}>
     {!!post.comments.length && (
       <Text style={{color:'grey'}}>
       View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length >  1 ? 'comments':'comment'}
     </Text>
    )}
    
  </View>

)
    
 const Comments = ({post}) => (
   <View>
   {post.comments.map((comment,index)=>(
     <View key={index} style={{flexDirection:'row',marginTop:5}}>
       
        <Text style={{fontWeight:'bold',color:'white'}}>{comment.user}</Text> 
        <Text style={{color:'white'}}> {comment.commment}</Text>
     </View>
   ))}
   </View>
 ) 

const postFooterIcons = [
  {
    name: 'Like',
    imageuri: 'https://img.icons8.com/material-outlined/96/ffffff/like--v1.png',
    likedimageuri: 'https://img.icons8.com/material/100/ff5050/like--v1.png',
  },{
    name: 'Comment',
    imageuri: 'https://img.icons8.com/material-outlined/384/ffffff/speech-bubble--v1.png'
  },{
    name: 'Share',
    imageuri: 'https://img.icons8.com/external-anggara-basic-outline-anggara-putra/328/ffffff/external-share-basic-ui-anggara-basic-outline-anggara-putra.png'
  },{
    name: 'Save',
    imageuri: 'https://img.icons8.com/pastel-glyph/128/ffffff/bookmark-ribbon.png'
  }
]
export default Post

const styles = StyleSheet.create({
  icon:{
    width:33,
    height:33,
    resizeMode:'contain',
    marginRight:10
  },
  postIcons:{
    flexDirection:'row',
    marginHorizontal:2,
  }
})