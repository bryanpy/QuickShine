import { Text, SafeAreaView, StyleSheet, TouchableOpacity,View } from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fontisto, AntDesign} from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { useFonts } from 'expo-font';


export default function Test(){
  const[email,setEmail] = useState('')
  
  return (
    <SafeAreaView style = {styles.container}>
      <Text>Lmao</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#fffefc',
    padding: 8,
    paddingVertical:30
  },

  button: {
    alignSelf:"center",
    backgroundColor:"#FF694C",
    height:50,
    width:'90%',
    borderRadius:20,
    justifyContent:"center"
  },
  buttonText:{
    textAlign:"center",
    fontSize:20,
    fontFamily:'OpenSans-Bold',
    color:"white"
  },

  input:{
    borderColor:"#ffffff",
    fontFamily:'OpenSans-Regular',
    fontSize:15,
  },
  inputLabel:{
    fontSize:15,
    fontFamily:'VarelaRound-Regular',
    color:"#adadad"
  },

  header:{
    textAlign:"center",
    fontSize:35,
    fontFamily:'OpenSans-ExtraBold',
    color:"#262626"
  },
  subheader:{
    textAlign:"center",
    fontSize:15,
    fontFamily:"Nunito",
  },
});
