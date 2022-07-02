import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const DishListItem = ({dish}) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate("Dish",{id: dish.id})} style={styles.container}>
            <View style={{ flex:1,}}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>
          <Text style={styles.price}>$ {dish.price}</Text>
          </View>
         {dish.image && ( <Image style={styles.image} source={{uri: dish.image}} />)}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingHorizontal: 10,
       flexDirection: 'row',
       paddingVertical: 20,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
     },
    name: {
        fontSize: 20,
        fontWeight: "600",
        letterSpacing:0.5,
    },
    description: {
        color: "gray",
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
    },
    image: {
        height: 100,
        aspectRatio: 1,
    },
});
 export default DishListItem;
