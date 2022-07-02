import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Navigation />
                <StatusBar style="auto" />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
