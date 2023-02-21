import { View, Text, StyleSheet,TextInput, TouchableOpacity ,Alert} from 'react-native'
import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import firebase, { auth } from '../../firebase';

const LoginForm = ({navigation}) => {
    const LoginFormSchema = yup.object().shape({
        email:yup.string().required('email is required'),
        password:yup.string().required().min(8,'Your password has to have at least 8 char')
    })
    const onlogin = async (email,password) => {
        try {
            await auth.signInWithEmailAndPassword(email,password)
            console.log("loged in");
        } catch (error) {
            Alert.alert(error.message)
            console.log(error.message);
        }
    }
  return (
      <Formik
      initialValues={{ email: '',password:'' }}
      onSubmit={(values) => {
       console.log(values)
       console.log('your comment submited');
       onlogin(values.email,values.password)  
     }}
        validationSchema={LoginFormSchema}
        validateOnMount ={true}
      >
      {({ handleChange, handleBlur, handleSubmit, values ,errors,isValid}) => (    
      <>
    <View style={style.formcontainer}>
        <TextInput
        placeholder='Phone number,username or email'
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
        <TouchableOpacity style={{alignItems:'flex-end',marginTop:10}}>
            <Text style={{color:'#aaf'}}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.loginButton(isValid)} onPress={()=>{
            handleSubmit()
        }} disabled={!isValid}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Login</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:70}}>
        <Text>Don't hanve an account? </Text>
        <TouchableOpacity onPress={()=>navigation.push('Signup')}>
            <Text style={{color:'#6bb0f5'}}>Sign Up</Text>
        </TouchableOpacity>
        </View>
        
    </View>
    </>
      )}
    </Formik>
  )
}

export default LoginForm

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