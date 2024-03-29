import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './screens/Splash';
// import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
// import Home from './screens/home.js';
// import Loading from './screens/Loading.js';
// import Forgot from './screens/Forgot.js';
// import AddEntry from "./screens/AddEntry"
import Test from "./screens/test.js"


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    {/* <Stack.Screen name="Loading" component={Loading}/> */}
    {/* <Stack.Screen name="Splash" component={Splash}/> */}
    <Stack.Screen name="Signup" component={Signup}/>
    {/* <Stack.Screen name="Login" component={Login}/> */}
    {/* <Stack.Screen name="Forgot" component={Forgot}/> */}
    {/* <Stack.Screen name="Home" component={Home}/> */}
    {/* <Stack.Screen name="AddEntry" component={AddEntry}/> */}
    
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: '#ecf0f1',
  //   padding: 8,
  // },
  
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
