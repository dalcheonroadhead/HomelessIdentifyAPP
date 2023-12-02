import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { SearchData } from "./../TestData/Test";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const StatusBarHeight = getStatusBarHeight();

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
export default ({ navigation, route }) => {
  const { camImage } = route.params;
  const { resultImage } = useSelector((state) => state.imageReducer);
  const ListHeaderComponent = ({ title }) => {
    return (
      <View>
        <Text style={{ fontWeight: "bold", alignSelf: "stretch" }}>
          {title}
        </Text>
      </View>
    );
  };
  const renderItemForResultImage = ({
    item: { image_base64, name, similarity },
  }) => {
    return (
      <View style={[styles.list]}>
        <Image
          source={{ uri: `data:image/png;base64,${image_base64}` }}
          style={{ width: WIDTH / 4, height: HEIGHT / 4, borderRadius: 20 }}
        />
        <View>
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              alignSelf: "baseline",
              fontWeight: "bold",
            }}
          >
            유사도: {similarity}
          </Text>
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              alignSelf: "baseline",
              fontWeight: "bold",
            }}
          >
            이름: {name}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item: { name, uri, id } }) => {
    return (
      <View style={[styles.list]}>
        <Image
          source={uri}
          style={{ width: WIDTH / 4, height: HEIGHT / 4, borderRadius: 20 }}
        />
        <Text
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            alignSelf: "baseline",
            fontWeight: "bold",
          }}
        >
          {id}
          {"  "}
          {name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.ForSafeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#00a46c",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          paddingHorizontal: 20,
          height: HEIGHT / 4 + 60,
        }}
      >
        <View style={styles.ForView}>
          <Image source={{ uri: camImage }} style={styles.ForImage} />
          <Text style={styles.ForText}> 찍은 사진 </Text>
        </View>
      </View>
      <LinearGradient
        colors={["rgba(0,164,109,0.4)", "transparent"]}
        style={styles.Linear}
      />
      <View style={{ flexDirection: "row", flex: 1 }}>
        <FlatList
          ListHeaderComponent={() => (
            <ListHeaderComponent
              title={"신분증 DB 속 유사도 높은 사진 Top 5"}
            />
          )}
          data={resultImage}
          renderItem={renderItemForResultImage}
          keyExtractor={(item) => item.similarity}
          contentContainerStyle={{ flexGrow: 1 }}
        />

        <FlatList
          ListHeaderComponent={() => (
            <ListHeaderComponent title={"Star Gan v2 Output"} />
          )}
          data={SearchData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  ForSafeAreaView: {
    backgroundColor: "#f0fcf8",
    flex: 1,
  },
  ForImage: {
    width: WIDTH / 4,
    height: HEIGHT / 4,
    borderRadius: 50,
  },
  ForText: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF",
    alignContent: "center",
  },
  ForView: {
    flex: 1,
    marginTop: 10,
    marginLeft: WIDTH / 15,
    marginRight: WIDTH / 15,
    alignItems: "center",
  },
  Linear: {
    left: 0,
    right: 0,
    height: 50,
    marginTop: -45,
  },
  list: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#FFF",
    flexDirection: "row",
  },
});
