import {View, Text, Image, FlatList,ActivityIndicator} from 'react-native'
import orders from '../../../assets/data/orders.json'
import restaurants from '../../../assets/data/restaurants.json'
import React, {useEffect, useState} from 'react'
import styles from "./styles";
import Basket from "../Basket";
import DishListItem from "../../components/DishListItem";
import OrderListItem from "../../components/OrderListItem";
import BasketDishitem from "../../components/BasketDishItem";
import {useOrderContext} from "../../context/OrderContext";
import {useRoute} from "@react-navigation/native";

const order = orders[0];

const OrderDetailsHeader = ({order}) => {


  return (
    <View>
        <View style={styles.page}>
            <Image source={{ uri: order.Restaurant.image }} style={styles.image} />


            <View style={styles.container}>
                <Text style={styles.title}>{order.Restaurant.name}</Text>
                <Text style={styles.subtitle}>
                {order.status}</Text>

                <Text style={styles.menuTitle}>Your Orders</Text>
            </View>

        </View>
    </View>
  )
}

const OrderDetails = ({}) => {
    const [order,setOrder] = useState();
    const {getOrder} = useOrderContext();
    const route = useRoute();
    const id = route.params?.id;

    useEffect(() => {
        getOrder(id).then(setOrder);
    },[]);

    if (!order){
        return <ActivityIndicator size="large" color="gray" />;
    }
    return (
<FlatList
    ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
    data={order.dishes} renderItem={({item}) => <BasketDishitem basketDish={item} /> }/>
    )
}


export default OrderDetails
