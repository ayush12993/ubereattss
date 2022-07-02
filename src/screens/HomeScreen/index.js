import { StyleSheet, FlatList,View,Text } from 'react-native';
import {Restaurant} from '../../models';
import RestaurantItem from "../../components/RestaurantItems";
import {useState,useEffect} from "react";
import { DataStore } from "aws-amplify";

export default function HomeScreen() {

    const [restaurants,setRestaurants]= useState([]);

    useEffect(() => {
            DataStore.query(Restaurant).then(setRestaurants).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
            });
    }, []);


  return (
<View style={styles.page} >
<FlatList  data={restaurants}

 renderItem={({item}) => <RestaurantItem restaurant={item} />}
 showsVerticalScrollIndicator={false}
 />
</View>

);
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
