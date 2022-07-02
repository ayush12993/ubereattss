import {View, Text, StyleSheet, FlatList} from 'react-native';
import restaurants from '../../../assets/data/restaurants.json';
import {AntDesign} from '@expo/vector-icons';
import { useState } from 'react';
import Basket from "../../screens/Basket";

const BasketDishitem = ({basketDish}) => {
    return (
        <View style={styles.row}>
            <View style={styles.quantityContainer}>
                <Text>{basketDish.quantity}</Text>
            </View>
            <Text style={{fontWeight: '600'}}>{basketDish.Dish.name}</Text>
            <Text style={{marginLeft: "auto", }}>${basketDish.Dish.price}</Text>
        </View>
    );
};
const styles = StyleSheet.create({

    name: {
        fontSize: 24,
        fontWeight: '600',
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

    quantityContainer: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 5,
        marginRight: 10,
        paddingVertical: 2,
        borderRadius: 3,
    },
});

export default BasketDishitem;
