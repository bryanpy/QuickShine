import { Text, SafeAreaView, StyleSheet, TouchableOpacity,View } from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Entypo,Ionicons,FontAwesome} from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { useFonts } from 'expo-font';

import firebase from 'firebase';
import firebaseConfig from '../firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}

const db = firebase.firestore()

export default function Login({navigation}){
  const[name,setName] = useState('')
  const[phone,setPhone] = useState('')
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

  // const signUp = ()=>{
  //   console.log(email)
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //   .then((userCredential) => {
  //     var user = userCredential.user;

  //     db.collection("users").add({
  //       name: name,
  //       phone: phone,
  //       email:email,
  //       uid:firebase.auth().currentUser.uid
  //     })
  //     .then((docRef) => {
  //       alert("Document written with ID: ", docRef.id);
  //     })
  //     .catch((error) => {
  //       alert("Error adding document: ", error);
  //     });

  //     alert("Registered")
  //     navigation.navigate('Home')
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ..
  //   });
  // }

  return (
    <SafeAreaView style = {styles.container}>
      <View>
        <Text style={styles.header}>
          Create Account
        </Text>
        <Text style={styles.subheader}>
          Sign Up to Begin your Journey
        </Text>
      </View>
      <View>
        <Input
          placeholder="Enter Your Full Name"
          // inputContainerStyle = {{borderWidth:10, borderBlockColor:'#000000'}}
          label = "Full Name"
          leftIcon={<FontAwesome name="user" size={24} color="#545454" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setName(value)}
        />
        <Input
          placeholder="Enter Your Phone Number"
          label = "Phone Number"
          leftIcon={<Entypo name="phone" size={24} color="#545454" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setPhone(value)}
        />
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
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontFamily:'OpenSans-Regular',fontSize:11}}>By signing in you agree to the</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
            <Text style={{fontFamily:'OpenSans-ExtraBold',color:"#FF694C",fontSize:12}}> Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontFamily:'OpenSans-Regular',fontSize:11}}>and</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
            <Text style={{fontFamily:'OpenSans-ExtraBold',color:"#FF694C",fontSize:12}}> Privacy and Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity style = {styles.button} onPress={()=>signUp()}>
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',paddingRight:20,paddingTop:10,alignItems:'center'}}>
          <Text style={{fontFamily:'OpenSans-Regular',fontSize:12}}>Already a user ? </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
            <Text style={{fontFamily:'OpenSans-ExtraBold',color:"#FF694C",fontSize:13}}>Login</Text>
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
  }
});
