import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

export default () => {
  const { album } = useSelector((state) => state.imageReducer);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
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
            style={{
              width: 250,
              height: 250,
              borderRadius: 20,
              marginLeft: 100,
            }}
          />
          <View style={styles.TextViewInFlatList}>
            <Text style={styles.InnerText}>이름: {item.name}</Text>
            <Text style={styles.InnerText}>날짜: {item.date}</Text>
            <Text
              style={{
                color: "#b1e5d3",
                paddingHorizontal: 10,
                fontWeight: "bold",
                paddingTop: 3,
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
    <SafeAreaView>
      <FlatList data={album} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LinearInFlatlist: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 100,
    marginTop: 220,
    top: 10,
  },
  ForTouchable: {
    flexDirection: "row",
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
  InnerText: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#00a46c",
    paddingTop: 3,
  },

  TextViewInFlatList: {
    height: 60,
    // flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
  },
});
