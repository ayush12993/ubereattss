import { View, Text, TextInput, StyleSheet, Button,Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Auth, DataStore} from "aws-amplify";
import {User} from "../../models";
import {useAuthContext} from "../../context/AuthContext";
import navigation from "../../navigation";

const Profile = () => {
    const {dbUser}  = useAuthContext();
  const [name, setName] = useState(dbUser?.name||"");
  const [address, setAddress] = useState(dbUser?.address||"");
  const [lat, setLat] = useState(dbUser?.lat+""||"0");
  const [lng, setLng] = useState(dbUser?.lng+""||"0");



  const {sub ,setDbUser} = useAuthContext();

  const onSave = async () => {
      if (dbUser){
          await updateUser();
      }else {
          await createUser();
      }
      navigation.goBack();
  };

  const updateUser = async () => {
       const user = await DataStore.save(
           User.copyOf(dbUser,(updated) => {
               updated.name = name;
               updated.address = address;
               updated.lat = lat;
               updated.lng = lng;
           })
       );
       setDbUser(user);
  }

  const createUser = async () => {
      try {
          const user = await DataStore.save(new User({name, address, lat: parseFloat(lat), lng: parseFloat(lng), sub}));
          setDbUser(user);
      } catch (e) {
          Alert.alert("Error", e.message);
      }
  }
  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
      />
        <View style = {styles.buttonSave}>
            <Button onPress={onSave} title="Save" />
        </View>

        <View style = {styles.buttonSignout}>
            <Button onPress={() => Auth.signOut()} title="Sign out" />
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
    buttonSave: {
      margin: 10,
    },
    buttonSignout: {
      margin: 10,
    },
});

export default Profile;
