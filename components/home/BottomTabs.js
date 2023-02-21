import { View, TouchableOpacity ,Image,StyleSheet} from 'react-native'
import React ,{useState} from 'react'
import { Divider } from 'react-native-elements'
export const bottomTabsIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/144/ffffff/home.png'
    },{
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png'

    },{
        name:'Reals',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/instagram-reel.png',
        inactive:'https://img.icons8.com/ios/500/ffffff/instagram-reel.png'
    },{
        name: 'Shop',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/shopping-bag-full.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/144/ffffff/shopping-bag-full.png'
    },{
        name: 'Profile',
        active: "https://www.w3schools.com/howto/img_avatar.png",
        inactive: "https://www.w3schools.com/howto/img_avatar.png"
    }
]

const BottomTabs = ({icons}) => {
    const [activeTab, setactiveTab] = useState('Home')
    const Icon = ({icon}) => (
        <TouchableOpacity onPress={()=> setactiveTab(icon.name)}>
            <Image source={{uri : activeTab === icon.name ? icon.active:icon.inactive }} 
            style={[styles.icon,
            icon.name === 'Profile'?styles.profilePic():null,
            activeTab === 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab):null,]}/>
        </TouchableOpacity>
    )
  return (
      <View style={styles.wrapper}>
          <Divider width={1} orientation='vertical'/>
      
    <View style={styles.container}>
      {icons.map((icon,index) =>(
          <Icon key={index} icon={icon} />)
      )}
    </View>
    </View>
  )
}

export default BottomTabs

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',justifyContent:'space-around',height:50,paddingTop:10
    },
    icon:{
        width:30,
        height:30,
    },
    wrapper:{
        position:'absolute',
        width:'100%',
        bottom:0,
        zIndex:990,
        backgroundColor:'#000'
    },
    profilePic:(activeTab = '') =>({
        borderRadius:50,
        borderWidth : activeTab === 'Profile' ? 2 :0,
        borderColor:'#fff'

    }),
})