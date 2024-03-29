import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../firebase';

// firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}

const db = firebase.firestore();

export default class Loading extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.props.navigation.navigate('AddEntry')
        // this.props.navigation.navigate('Splash');
        this.props.navigation.navigate('Home');
        // this.props.navigation.navigate('Signup');
      } else {
        // this.props.navigation.navigate('Home');
        this.props.navigation.navigate('Splash')
        // this.props.navigation.navigate('Forgot');
        // this.props.navigation.navigate('Signup');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
