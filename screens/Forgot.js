import { Text, SafeAreaView, StyleSheet, TouchableOpacity,View } from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fontisto,AntDesign  } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { useFonts } from 'expo-font';


import firebase from 'firebase';
import firebaseConfig from '../firebase'

export default function Login({navigation}){
  const[email,setEmail] = useState('')

  const [fontsLoaded] = useFonts({
    'Nunito': require('../assets/fonts/Nunito.ttf'),
    'VarelaRound-Regular':require('../assets/fonts/VarelaRound-Regular.ttf'),
    'OpenSans-Regular':require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold':require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold':require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const sendEmail = ()=>{
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("mail sent")
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  }
  
  return (
    <SafeAreaView style = {styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <AntDesign name="leftcircleo" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <View style={{paddingBottom:100}}>
          <Text style={styles.header}>
            Forgot Password
          </Text>
          <Text style={styles.subheader}>
            You can reset your password through your email
          </Text>
        </View>
        <Input
          placeholder="example@email.com"
          label = "Email"
          leftIcon={<Fontisto name="email" size={24} color="black" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setEmail(value)}
        />
      </View>
      <View>
        <TouchableOpacity style = {styles.button} onPress={()=>{sendEmail()}}>
          <Text style={styles.buttonText}>
            Send Email
          </Text>
        </TouchableOpacity>
      </View>
      
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
