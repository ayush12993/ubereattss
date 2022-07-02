import { View, Text,FlatList } from 'react-native'
import React from 'react'
import OrderListItem from "../../components/OrderListItem";
import styles from "../RestaurantDetailScreen/styles";

import {useOrderContext} from "../../context/OrderContext";
import {Order} from "../../models";

const OrderScreens = () => {
    const { orders} = useOrderContext();


  return (
    <View style={{ flex: 1, width: '100%',}}>
        <FlatList data={orders}
                   renderItem={({item}) => <OrderListItem order={item} />}
                  />
    </View>
  )
}

export default OrderScreens;
