import { Text, SafeAreaView, StyleSheet, TouchableOpacity,View } from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Entypo,Ionicons,FontAwesome} from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { useFonts } from 'expo-font';

import firebase from 'firebase';
import firebaseConfig from '../firebase'

export default function Login({navigation}){
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[secureTextEntry,setSecureTextEntry] = useState(true)

  const [fontsLoaded] = useFonts({
    'Nunito': require('../assets/fonts/Nunito.ttf'),
    'VarelaRound-Regular':require('../assets/fonts/VarelaRound-Regular.ttf'),
    'OpenSans-Regular':require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold':require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold':require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const login = ()=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("signed in")
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(error.message)
    });
  }

  return (
    <SafeAreaView style = {styles.container}>
      <View>
        <Text style={styles.header}>
          Welcome Back
        </Text>
        <Text style={styles.subheader}>
          Sign in to your account to continue
        </Text>
      </View>
      <View>
        <Input
          placeholder="Enter your Email"
          label = "Email"
          leftIcon={<Ionicons name="mail" size={24} color="#545454" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setEmail(value)}
        />
        <Input
          placeholder="Choose your Password"
          label = "Password"
          secureTextEntry={secureTextEntry}
          leftIcon={<Entypo name="key" size={24} color="#545454"/>}
          rightIcon={secureTextEntry ? (
                          <Entypo name="eye-with-line" size={20} color="#545454" onPress={()=>{setSecureTextEntry(!secureTextEntry)}}/>
                        ) : (
                          <Entypo name="eye" size={20} color="#545454" onPress={()=>{setSecureTextEntry(!secureTextEntry)}}/>
                        )}
          
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setPassword(value)}
        />
        <TouchableOpacity style={{paddingRight:10,alignSelf:'flex-end'}} onPress={()=>navigation.navigate("Forgot")}>
          <Text style={styles.smallText}>Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style = {styles.button} onPress={()=>{login()}}>
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableOpacity>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',paddingRight:20,paddingTop:10,alignItems:'center'}}>
          <Text  style={{fontFamily:'OpenSans-Regular',fontSize:12}}>Dont have an account? </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}>
            <Text style={{fontFamily:'OpenSans-ExtraBold',color:"#FF694C",fontSize:13}}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#fffefc',
    padding: 8,
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
  smallText:{
    fontSize:10,
    fontFamily:'VarelaRound-Regular',
    color:"#FF694C"
  }
});
