import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import History from "./src/Page/History";
import Home from "./src/Page/Home";
import { Image, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            style: styles.tabBar,
          }}
        >
          <Tab.Screen
            name="프로필"
            component={Home}
            options={{
              tabBarIcon: () => (
                <MaterialIcons name="person" size={24} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="조회이력"
            component={History}
            options={{
              tabBarIcon: () => (
                <MaterialIcons name="auto-awesome" size={24} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#eff4f0",
    elevation: 2,
  },
});
