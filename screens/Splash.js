import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';

import OnBoarding from 'react-native-onboarding-swiper';

const { height, width } = Dimensions.get('window');
const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  return (
    <View
      style={{
        width: 20,
        height: 6,
        borderRadius:5,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: '#FF694C', fontFamily: 'OpenSans-ExtraBold' }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: '#FF694C', fontFamily: 'OpenSans-ExtraBold' }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: '#FF694C', fontFamily: 'OpenSans-ExtraBold' }}>Done</Text>
  </TouchableOpacity>
);

const Splash = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Nunito': require('../assets/fonts/Nunito.ttf'),
    'VarelaRound-Regular':require('../assets/fonts/VarelaRound-Regular.ttf'),
    'OpenSans-Regular':require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold':require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold':require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  return (
    <ImageBackground
      source={require('../assets/images/Background.png')}
      style={styles.backgroundImage}>
      <OnBoarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.navigate('Signup')}
        onDone={() => navigation.navigate('Signup')}
        pages={[
          {
            image: (
              <Image
                source={require('../assets/images/onboarding/CarWash.png')}
                resizeMode="cover"
                style={{ height: 200, width: 200 }}>
              </Image>
            ),
            title: (
              <Text
                style={{ fontSize: 24, color: 'black', fontFamily: 'OpenSans-ExtraBold' }}>
                Car Wash
              </Text>
            ),
            subtitle: (
              <Text
                style={{ fontSize: 16, color: 'black', fontFamily: 'VarelaRound-Regular' , paddingHorizontal:20,textAlign:'center'}}>
                All Washing stations around you
              </Text>
            ),
          },
          {
            image: (
              <Image
                source={require('../assets/images/onboarding/Wheel.png')}
                resizeMode="cover"
                style={{ height: 200, width: 200 }}>
              </Image>
            ),
            title: (
              <Text
                style={{ fontSize: 24, color: 'black', fontFamily: 'OpenSans-ExtraBold' }}>
                Options Available
              </Text>
            ),
            subtitle: (
              <Text
                style={{ fontSize: 16, color: 'black', fontFamily: 'VarelaRound-Regular',textAlign:'center' }}>
                Services available in your car wash
                information!{' '}
              </Text>
            ),
          },
          {
            image: (
              <Image
                source={require('../assets/images/onboarding/Steering.png')}
                resizeMode="cover"
                style={{ height: 200, width: 200 }}>
              </Image>
            ),
            title: (
              <Text
                style={{ fontSize: 24, color: 'black', fontFamily: 'OpenSans-ExtraBold' }}>
                Car Profile
              </Text>
            ),
            subtitle: (
              <Text
                style={{ fontSize: 16, color: 'black', fontFamily: 'VarelaRound-Regular',textAlign:'center' }}>
                Maintanance Advice for your vehicle
              </Text>
            ),
          },
        ]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    //flex: 1,
    resizeMode: 'cover',
    //flex: 1,
    //alignItems: 'center',
    //width: '100%',
    height: '100%',
  },
  container2: {
    marginTop: 35,
    marginBottom: 35,
    backgroundColor: '#21304D',
    alignItems: 'center',
    borderColor: '#BA0C2F',
    borderBottomWidth: 2,
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'font',
  },
  appBodyText: {
    color: 'white',
    fontSize: RFValue(24),
    fontFamily: 'font',
  },
  button: {
    marginTop: 400,
    borderColor: '#BA0C2F',
    borderBottomWidth: 2,
  },
  button2: {
    marginTop: 20,
    borderColor: '#21304D',
    borderBottomWidth: 2,
  },
  button3: {
    marginTop: 20,
    borderColor: '#BA0C2F',
    borderBottomWidth: 2,
  },
  button4: {
    marginTop: 20,
    borderColor: '#21304D',
    borderBottomWidth: 2,
  },
  buttonsText: {
    color: 'white',
    fontSize: RFValue(26),
    fontFamily: 'font',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Splash;
