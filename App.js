import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from "react-native";
import RootNavigator from "./src/navigation";
import {NavigationContainer} from "@react-navigation/native";
import {Amplify, Auth} from 'aws-amplify'
import {withAuthenticator} from "aws-amplify-react-native";
import awsconfig from './src/aws-exports'
import AuthContextProvider from "./src/context/AuthContext";
import BasketContextProvider from "./src/context/BasketContext";
import OrderContextProvider from "./src/context/OrderContext";
Amplify.configure({...awsconfig,Analytics:{disabled:true}});

function App() {
  return (
 <NavigationContainer>
 <AuthContextProvider>
     <BasketContextProvider>
         <OrderContextProvider>
             <RootNavigator />
         </OrderContextProvider>
     </BasketContextProvider>
 </AuthContextProvider>
       <StatusBar style="light" />
 </NavigationContainer>
  );
}

export default withAuthenticator(App);

