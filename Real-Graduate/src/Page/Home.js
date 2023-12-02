import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import Result from "./Result";
import CameraModal from "../Modal/CameraModal";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{
          headerTransparent: true,
          headerTintColor: "#FFF",
          title: "",
        }}
      />
      <Stack.Screen
        name="CamModal"
        component={CameraModal}
        options={{
          presentation: "modal",
          headerTransparent: true,
          title: "가까이 가주세요!",
          headerTintColor: "#FFF",
        }}
      />
    </Stack.Navigator>
  );
};
