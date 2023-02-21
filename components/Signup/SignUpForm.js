import { View, Text, StyleSheet,TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import firebase, { auth,db } from '../../firebase';
const SignUpForm = ({navigation}) => {
    const SignUpFormSchema = yup.object().shape({
        email:yup.string().required('email is required'),
        username: yup.string().min(2).required(),
        password:yup.string().required().min(8,'Your password has to have at least 8 char'),

    })
    async function g() {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
      }
    
    const onSignup = async (email,password,username) =>{
        try {
            const authu = await auth.createUserWithEmailAndPassword(email,password)
            console.log('account is created')
            db.collection('users').doc(authu.user.email).set({
                id: authu.user.uid,
                username:username,
                email:email,
                profilePic:await g()
            })
        } catch (error) {
            Alert.alert('dude',error.message)
        }
    }
    
  return (
      <Formik
      initialValues={{ email: '',username:'',password:'' }}
      onSubmit={(values) => {
       console.log(values)
       console.log('your comment submited');  
       onSignup(values.email,values.password,values.username)
     }}
        validationSchema={SignUpFormSchema}
        validateOnMount ={true}
      >
      {({ handleChange, handleBlur, handleSubmit, values ,errors,isValid}) => (    
      <>
    <View style={style.formcontainer}>
        <TextInput
        placeholder='Email'
        placeholderTextColor='#888'
        style={[
            style.textInput,
            {
                borderColor: 
                values.email.length <1 || EmailValidator.validate(values.email)
                ?'#ccc'
                :'red',
            } ]}
        keyboardType='email-address'
        textContentType='emailAdderss'
        autoFocus={true}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}

        />
        {errors.email && (
            <Text style={{color:'red',marginTop:5,fontSize:10}}>{errors.email}</Text>
        )}
        <TextInput
        placeholder='Username'
        placeholderTextColor='#888'
        style={[
            style.textInput,
            {
                borderColor: 
                1>values.username.length || values.username.length >= 3 ?'#ccc':'red',
            } ]}
        keyboardType='default'
        textContentType='username'
        
        onChangeText={handleChange('username')}
        onBlur={handleBlur('username')}
        value={values.username}

        />
        {errors.username && (
            <Text style={{color:'red',marginTop:5,fontSize:10}}>{errors.username}</Text>
        )}
        <TextInput
        placeholder='Password'
        placeholderTextColor='#888'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        style={
            [
                style.textInput,
            {
                borderColor:1>values.password.length || values.password.length >= 8 ?'#ccc':'red'
            }]}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        />
        {errors.password && (
            <Text style={{color:'red',marginTop:5,fontSize:10}}>{errors.password}</Text>
        )}{console.log(values)}
    
        <TouchableOpacity style={style.loginButton(isValid)} onPress={handleSubmit} disabled={!isValid}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:70}}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text style={{color:'#6bb0f5'}}>Sign In</Text>
        </TouchableOpacity>
        </View>
        
    </View>
    </>
      )}
    </Formik>
  )
}

export default SignUpForm

const style = StyleSheet.create({
    formcontainer:{
        marginTop:60
    },
    textInput: {
        borderWidth:1,
        borderColor:'grey',
        borderRadius:5,
        height:50,
        paddingLeft:15,
        backgroundColor:"#fafafa",
        marginTop:10
    },
    loginButton: isValid => ({
        backgroundColor:isValid?'#aaf':"#9acaf7",
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderRadius:5,
        marginTop:40
    })
})