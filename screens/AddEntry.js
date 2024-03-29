import { Text, SafeAreaView, StyleSheet, TouchableOpacity,View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Entypo,Ionicons,FontAwesome,AntDesign} from '@expo/vector-icons';
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

const data = [
  { label: 'Full Wash', value: '60'},
  { label: 'Semi Wash', value: '30'}
];

export default function AddEntry({navigation}){
  const[name,setName] = useState('')
  const[phone,setPhone] = useState('')
  const[email,setEmail] = useState('')
  const[carNumber,setCarNumber] = useState('')
  const[model,setModel] = useState('')
  const [washType, setWashType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [fontsLoaded] = useFonts({
    'Nunito': require('../assets/fonts/Nunito.ttf'),
    'VarelaRound-Regular':require('../assets/fonts/VarelaRound-Regular.ttf'),
    'OpenSans-Regular':require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold':require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold':require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const addEntry = ()=>{
    console.log("WashType:",washType)
    db.collection("customers").add({
      name: name,
      phone: phone,
      email:email,
      carNumber:carNumber,
      model:model,
      washType:washType,
      progress:"Waiting",
      dateCreated:new Date().toLocaleString()
    })
    .then((docRef) => {
      alert("Document written with ID: ", docRef.id);
      
      console.log("WashType:",washType)
    })
    .catch((error) => {
      alert("Error adding document: ", error);
    });
    navigation.navigate('Home')
  }

  const getUserDetails = ()=>{
    db.collection("users").where("uid", "==", firebase.auth().currentUser.uid) 
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        setName(doc.data().name)
        setPhone(doc.data().phone)
        setEmail(doc.data().email)
      });
    })
  }

  useEffect(() => {
    getUserDetails()
  });

  return (
    <SafeAreaView style = {styles.container}>
      <View>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginHorizontal:7}}>
          <AntDesign name="leftcircleo" size={27} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.header}>
            Make an Appointment
          </Text>
          <Text style={styles.subheader}>
            Add Car Details to book an Appointment
          </Text>
        </View>
      </View>
      <View>
        <Input
          placeholder="Enter your Full Name"
          label = "Full Name"
          value = {name}
          leftIcon={<FontAwesome name="user" size={24} color="#545454" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
        />
        <Input
          placeholder="Enter your Phone Number"
          label = "Phone Number"
          value = {phone}
          leftIcon={<Entypo name="phone" size={24} color="#545454" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
        />
        <Input
          placeholder="Enter your Email"
          label = "Email"
          value = {email}
          leftIcon={<Ionicons name="mail" size={24} color="#545454" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setEmail(value)}
        />
        <Input
          placeholder="Enter your Car Number"
          label = "Car Number"
          value = {carNumber}
          leftIcon={<Ionicons name="mail" size={24} color="#545454" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setCarNumber(value)}
        />
        <Input
          placeholder="Enter your Car Model"
          label = "Car Model"
          value = {model}
          leftIcon={<AntDesign name="car" size={24} color="black" />}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={value => setModel(value)}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Wash Type' : 'Select Wash Type'}
          searchPlaceholder="Search..."
          value={washType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setWashType(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <View>
        <TouchableOpacity style = {styles.button} onPress={()=>addEntry()}>
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableOpacity>
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
    fontSize:25,
    fontFamily:'OpenSans-ExtraBold',
    color:"#262626"
  },
  subheader:{
    textAlign:"center",
    fontSize:15,
    fontFamily:"Nunito",
  }
});
