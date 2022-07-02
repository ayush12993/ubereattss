import {View, Text, Image, FlatList, ActivityIndicator, Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons"
import DishListItem from "../../components/DishListItem";
import Header from "./Header";
import styles from "./styles";
import {useRoute,useNavigation} from "@react-navigation/native";
import {useEffect,useState} from "react";
import {DataStore} from "aws-amplify";
import {Restaurant,Dish} from "../../models";
import {useBasketContext} from "../../context/BasketContext";

const DEFAULT_IMAGE = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg";

const RestaurantDetailScreen = () => {
    const [restaurant,setRestaurant] = useState(null);
    const [dishes,setDishes] = useState([]);

    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params.id;

    const {setRestaurant: setBasketRestaurant,basket,basketDishes,totalBasketDishesLen} = useBasketContext();

    useEffect(() => {
        if (!id){
            return;
        }
        setBasketRestaurant(null );
        DataStore.query(Restaurant, id).then(setRestaurant);
        DataStore.query(Dish,(dish) => dish.restaurantID("eq",id)).then(
            setDishes
        )
    }, [id]);

    useEffect(() => {
        setBasketRestaurant(restaurant);
    }, [restaurant]);



    console.warn(id); //
    if (!restaurant){
        return <ActivityIndicator size="large"  color="gray"/>;
    }

    return (
        <View style={styles.page}>


  <FlatList
  ListHeaderComponent={() => <Header restaurant={restaurant} />}
  styles={styles.subtitle}
    data={dishes}
    renderItem={({item}) => <DishListItem dish={item} />}
  keyExtractor={(item) =>  item.name}
  />

<Ionicons
    onPress={() =>navigation.goBack()}
             name="arrow-back-circle"
             size={45}
             color="white"
             style={styles.iconContainer}/>


            {basket && (
            <Pressable onPress={() => navigation.navigate("Basket") } style={styles.button}>
                <Text style={styles.buttonText}>Open Basket ({totalBasketDishesLen})</Text>
            </Pressable>)}
        </View>
    );
};



export default RestaurantDetailScreen;
