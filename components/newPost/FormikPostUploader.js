import { View, Image, TextInput,Text,Button, } from 'react-native'
import React ,{useState,useEffect}from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import {  Divider } from 'react-native-elements';
import  {db,auth,firebase} from '../../firebase'
import {getDocs,collection} from "firebase/firestore"
let uploadPostSchema = yup.object().shape({
    imageUrl: yup.string().url().required(),
    caption: yup.string().max(2000),

})
const placeholderImage = "https://nicepet.ir/wp-content/uploads/2020/06/placeholder-1.png"
const FormikPostUploader = ({navigation}) => {
    const [thumbnailurl, setthumbnailurl] = useState(placeholderImage)
    const [currentLoggedInUser, setcurrentLoggedInUser] = useState(null)
    const [users, setusers] = useState([])
    const usersCollection = collection(db,'users');
  

    const getUsername = async () => {
      const user = auth.currentUser
      console.log(user.uid);
      const  unsubscrib = await db
        .collection('users')
        .where('owner_id','==',user.uid).limit(1).onSnapshot(
          snapshot => {snapshot.docs.map(doc => {
            console.log(doc);
            setcurrentLoggedInUser({
              username: doc.data().username,
              profilePicture:doc.data().profilePic
            })
          })
          }
        )
        return unsubscrib
    }


    useEffect(()=>{
      const getUsers = async() =>{
        const data = await getDocs(usersCollection);
        data.docs.map((doc)=>{
          setcurrentLoggedInUser({
            username: doc.data().username,
            profilePicture:doc.data().profilePic
          })
        })
      }
      getUsers()

      //getUsername()
      console.log(currentLoggedInUser);
    },[])
    const uploadPostToFirebase = (imageUrl,caption) => {
      console.log(currentLoggedInUser)
      const unsubscrib = db
      .collection('users')
      .doc(auth.currentUser.email).collection('posts').add(
        {
          imageUrl:imageUrl,
          user:currentLoggedInUser.username,
          profile_picture:currentLoggedInUser.profilePicture,
          owner_uid:auth.currentUser.uid,
          owner_email:auth.currentUser.email,
          caption:caption,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          
          likes_by_users:[],
          comments:[],
        }
      )
    }
  return (
    <Formik
     initialValues={{ imageUrl: '',caption:'' }}
     onSubmit={values => {
      uploadPostToFirebase(values.imageUrl,values.caption)
      navigation.goBack()  
    }}
     validationSchema={uploadPostSchema}
     validateOnMount
   >
     {({ handleChange, handleBlur, handleSubmit, values ,errors,isValid}) => (
       <View>
         <View style={{flexDirection:'row',alignItems:'flex-start',margin:20}}>
          <Image source={{uri:thumbnailurl ? thumbnailurl :placeholderImage }} style={{width:100,height:100,borderRadius:10}}/>
          <TextInput
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}
            style={{color:'white',fontSize:20,marginLeft:10}}
            placeholder={'Write Caption'}
            placeholderTextColor={'grey'}
            multiline={true}
          />
         </View>
         
         <TextInput
         onChange={(e)=>setthumbnailurl(e.nativeEvent.text)}
           onChangeText={handleChange('imageUrl')}
           onBlur={handleBlur('imageUrl')}
           value={values.imageUrl}
           style={{color:'white',marginBottom:5}}
           placeholder={'Image URL'}
           placeholderTextColor={'grey'}
         />
         {errors.imageUrl &&(
           <Text style={{color:'red'}}>{errors.imageUrl}</Text>
         )}
         <Button onPress={handleSubmit} title="Share" disabled={!isValid} color="black" style={{color:'grey'}} />
         {console.log(errors)
         }
       </View>
       
     )}
   </Formik>
  )
}

export default FormikPostUploader