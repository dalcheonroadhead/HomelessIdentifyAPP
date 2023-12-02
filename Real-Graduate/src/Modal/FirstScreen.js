import { Modal, SafeAreaView, Image, Dimensions, Text } from "react-native";
import { useModal } from "../useComponents/useModal";
const { width, height } = Dimensions.get("screen");
export default () => {
  const { firstScreenVisible } = useModal();
  return (
    <Modal visible={firstScreenVisible}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#00a46c",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../img/logo.png")}
          style={{
            width: width / 4,
            height: height / 4,
            resizeMode: "contain",
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};
