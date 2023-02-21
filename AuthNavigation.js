import { View, Text } from 'react-native'
import React ,{useEffect,useState}from 'react'
import { SigndeInStack, SigndeOutStack } from './navigation'
import { auth } from './firebase'

const AuthNavigation = () => {

  const [isLoggedIn, setisLoggedIn] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setisLoggedIn(true)
      }else{
        setisLoggedIn(false)
      }
    })
  
    
  }, [])
  
  return <>{ isLoggedIn ? <SigndeInStack/> : <SigndeOutStack/>
  }</>
}

export default AuthNavigation