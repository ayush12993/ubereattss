import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { useState } from 'react';
import BasketDishitem from "../../components/BasketDishItem";
import {useBasketContext} from "../../context/BasketContext";
import {useOrderContext} from "../../context/OrderContext";
import {useNavigation} from "@react-navigation/native";

const Basket = () => {
    const {restaurant,basketDishes,totalPrice} = useBasketContext();
    const {createOrder} = useOrderContext();
    const navigation = useNavigation();

    const onCreateOrder = async () => {
        await createOrder();
        navigation.goBack();
    };

   return(
    <View style={styles.page}>
        <Text style={styles.name}>{restaurant?.name}</Text>
        <Text>Your items</Text>

        <FlatList data={basketDishes}
        renderItem = {({item}) => <BasketDishitem basketDish = {item}/>}
        />

        <View style={styles.seperator} />


        <Pressable onPress={onCreateOrder} style={styles.button}>
            <Text style={styles.buttonText}>Create Order &#8226; ${totalPrice.toFixed(2)}</Text>
        </Pressable>
    </View>
   );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: '100%',
        paddingVertical: 30,  // temp fix
        padding: 10,
    },
    description: {
        color: 'gray',
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
         marginVertical: 10,
    },
    seperator: {
      height: 1,
      backgroundColor: 'lightgrey',
      marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    quantity: {
        fontSize: 25,
        marginHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: "600",
        fontSize: 18,
    },
    button: {
        backgroundColor: 'black',
        marginTop: "auto",
        padding: 20,
        alignItems: "center",
    },
    quantityContainer: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 5,
        marginRight: 10,
        paddingVertical: 2,
        borderRadius: 3,
    },
});

export default Basket;
