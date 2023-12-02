import {
  Pressable,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import axios from "axios";
import { useState, useEffect } from "react";
import useCamera from "../useComponents/useCamera";
import { useSelector, useDispatch } from "react-redux";

const StatusBarHeight = getStatusBarHeight();
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default ({ navigation }) => {
  const { cameraRef, takePicture, onPressToggle, camToggle } = useCamera();
  const { image, album } = useSelector((state) => state.imageReducer);

  return (
    <Pressable
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00a46c",
      }}
      onPress={() => navigation.goBack()}
    >
      <Camera
        ref={cameraRef}
        type={camToggle}
        style={{
          alignSelf: "center",
          marginTop: StatusBarHeight,
          width: width - 50,
          height: height / 2,
          borderRadius: 10,
          overflow: "hidden",
        }}
      />
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={takePicture}
          camera-reatak
          style={{ paddingHorizontal: 20 }}
        >
          <Entypo name="hair-cross" size={50} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressToggle}
          style={{ paddingHorizontal: 20 }}
        >
          {camToggle === Camera.Constants.Type.front && (
            <View>
              <MaterialIcons name="camera-front" size={50} color="#FFF" />
              <Text style={{ alignSelf: "center", color: "#fff" }}>앞</Text>
            </View>
          )}
          {camToggle === Camera.Constants.Type.back && (
            <View>
              <MaterialIcons name="camera-rear" size={50} color="#FFF" />
              <Text style={{ alignSelf: "center", color: "#fff" }}>뒤</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Result", { camImage: image })}
          style={{ paddingHorizontal: 20 }}
        >
          <MaterialIcons name="send" size={50} color="#FFF" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};
