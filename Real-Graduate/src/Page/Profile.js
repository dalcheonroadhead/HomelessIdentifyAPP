import { View } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { setImage, setAlbum } from "../redux/Action";
import useCamera from "../useComponents/useCamera";
import { useEffect } from "react";
import { SearchData } from "../TestData/Test";
import FirstScreen from "../Modal/FirstScreen";

export default ({ navigation }) => {
  const { image, album } = useSelector((state) => state.imageReducer);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: 400,
          paddingHorizontal: 5,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["rgba(0,164,109,0.09)", "transparent"]}
          style={styles.LinearInFlatlist}
        />

        <TouchableOpacity style={styles.ForTouchable}>
          <Image
            source={{ uri: item.uri }}
            style={{ width: 200, height: 200, borderRadius: 20 }}
          />
          <View style={styles.TextViewInFlatList}>
            <Text>이름: {item.name}</Text>
            <Text
              style={{
                paddingHorizontal: 10,
                fontWeight: "bold",
                color: "#00a46c",
                paddingTop: 3,
              }}
            >
              날짜: {item.date}
            </Text>
            <Text
              style={{
                position: "absolute",
                top: 30,
                left: 11,
                color: "#b1e5d3",
              }}
            >
              자세히 보기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.GreenView}>
        <Image source={require("../img/1.png")} style={styles.ForImage} />
        <View style={styles.InsideView}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Image
              source={require("../img/logo.png")}
              style={{ height: 100, width: 120 }}
            />
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.ForText}>MemeMoneyQuest</Text>
          </View>
          <View style={{ paddingRight: 20 }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "felx-start",
              }}
              onPress={() => navigation.navigate("CamModal")}
            >
              <FontAwesome name="camera" size={100} color="#FFF" />
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                {" "}
                신원확인 하러 가기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LinearGradient
        colors={["rgba(0,164,109,0.4)", "transparent"]}
        style={styles.Linear}
      >
        <View style={styles.searchBar}>
          <TextInput
            placeholder="과거 조회 이력을 검색해보세요!"
            placeholderTextColor={"#b1e5d3"}
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 260,
            }}
          />
          <FontAwesome name="search" size={24} color="#b1e5d3" />
        </View>
      </LinearGradient>
      <View style={styles.NextofHeader}>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
            }}
          >
            최근이력
          </Text>
          <View style={styles.HighLight}></View>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <View
            style={{
              backgroundColor: "#00a46c",
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF",
              }}
            >
              More
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={album}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.NextofHeader}>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
            }}
          >
            신원 확인 하러 가기
          </Text>
          <View style={styles.HighLight}></View>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <View
            style={{
              backgroundColor: "#00a46c",
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF",
              }}
            >
              More
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Result", { camImage: image })}
        style={{
          backgroundColor: "#FFF",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../img/logo.png")}
          style={{ height: 300, width: 320 }}
        />
        <Text style={{ fontWeight: "bold" }}>결과 확인하자!</Text>
      </TouchableOpacity>
      <FirstScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  GreenView: {
    backgroundColor: "#00a46c",
    height: "28%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
  },
  ForImage: {
    height: 10,
    width: 20,
    marginTop: 50,
  },
  InsideView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  ForText: {
    fontSize: 40,
    color: "#FFF",
    fontWeight: "bold",
    // paddingRight: "10%",
  },
  Linear: {
    left: 0,
    right: 0,
    height: 90,
    marginTop: -45,
  },
  searchBar: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: "5%",
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  NextofHeader: {
    flexDirection: "row",
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
  },
  HighLight: {
    height: 4,
    backgroundColor: "#b1e5d3",
    width: 60,
    marginTop: -5,
    zIndex: -1,
  },
  LinearInFlatlist: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 100,
    marginTop: 220,
    top: 10,
  },
  ForTouchable: {
    justifyContent: "space-evenly",
    height: 250,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: 160,
  },
  TextViewInFlatList: {
    height: 60,
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
