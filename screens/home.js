import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { useFonts } from 'expo-font';

import firebase from 'firebase';
import firebaseConfig from '../firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}

const db = firebase.firestore();

// <TouchableOpacity style={styles.customerContainer}>
//   <Image
//     style={{height:60,width:60}}
//     source={require('@expo/snack-static/react-native-logo.png')}
//   />
//   <View style={styles.customerInfoContainer}>
//     <Text style={styles.customerInfo}>Toyota Carolla - Bryan Joe</Text>
//     <View style={styles.customerCarInfoContainer}>
//       <Text style={styles.customerCarProgress}>In Progress</Text>
//       <Text style={styles.customerCarInfo}> • Started 30mins ago</Text>
//     </View>
//   </View>
// </TouchableOpacity>

export default function Home({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [customers, setCustomers] = useState([]);

  const [fontsLoaded] = useFonts({
    Nunito: require('../assets/fonts/Nunito.ttf'),
    'VarelaRound-Regular': require('../assets/fonts/VarelaRound-Regular.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const getCustomerDetails = () => {
    db.collection('customers')
      .orderBy('dateCreated')
      .onSnapshot((snapshot) => {
        var allP = [];
        snapshot.docs.map((doc) => {
          var profile = doc.data();
          profile.id = doc.id;
          allP.push(profile);
        });
        setCustomers(allP);
      });
  };

  const getUserDetails = () => {
    db.collection('users')
      .where('email', '==', firebase.auth().currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setName(doc.data().name);
        });
      })
      .catch((error) => {
        alert('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    getUserDetails();
    getCustomerDetails();
  });

  const emptylist = () => {
    return (
      <Text style={styles.subheader}>No cars under wash at this moment</Text>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.customerContainer}>
        <Image
          style={{ height: 60, width: 60 }}
          source={require('../assets/images/OnBoarding/CarWash.png')}
        />
        <View style={styles.customerInfoContainer}>
          <Text style={styles.customerInfo}>
            {item.model + ' - ' + item.name}
          </Text>
          <View style={styles.customerCarInfoContainer}>
            <Text style={styles.customerCarProgress}>In Progress</Text>
            <Text style={styles.customerCarInfo}>
              {' • ' + 'Started 30mins ago'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Available Work Shops</Text>
      </View>

      <FlatList
        ListEmptyComponent={() => emptylist()}
        scrollEnabled
        data={customers}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddEntry')}
        style={styles.fab}>
        <AntDesign name="plus" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
  },
  customerContainer: {
    backgroundColor: '#fcfcfc',
    height: 90,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    gap: 20,
  },
  customerInfo: {
    fontFamily: 'OpenSans-Bold',
  },
  customerCarInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  customerCarInfo: {
    color: '#737373',
    fontFamily: 'VarelaRound-Regular',
    fontWeight: 100,
  },
  customerCarProgress: {
    color: '#00DB3A',
  },
  heading: {
    height: '8%',
    backgroundColor: '#FF694C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  subheader: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Nunito',
  },
  fab: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    backgroundColor: '#FF694C',
    borderRadius: 30,
    elevation: 8,
    bottom: 10,
  },
});
