import { Text } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import base64 from "base-64";
import { useSelector, useDispatch } from "react-redux";
import { setImage, setAlbum, setResult } from "../redux/Action";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default () => {
  let cameraRef = useRef();
  const { image, album, resultImage } = useSelector(
    (state) => state.imageReducer
  );
  const dispatch = useDispatch();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [camToggle, setCamToggle] = useState(Camera.Constants.Type.back);
  const [camImage, setcamImage] = useState("");
  const [basedUri, setBasedUri] = useState("");
  const [received, setReceived] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("reseived 내용:", received);
  }, [received]);

  useEffect(() => {
    console.log("result 내용:", resultImage);
  }, [resultImage]);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>카메라 권한 접근 중...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>카메라 권한이 허용되지 않았습니다. 허용 바랍니다.</Text>;
  }

  // const fetchImages = async () => {
  //   try {
  //     // 요청 시작 시 error와 Recevied 초기화
  //     setError(null);
  //     setReceived(null);

  //     // loading 상태를 true로 바꾼다.
  //     setLoading(true);
  //     const response = await axios.get("http://35.229.143.20/predict/");
  //     setReceived(response.data.uri);
  //     dispatch(setResult([...response.data.data]));
  //   } catch (e) {
  //     setError(e);
  //   }

  //   // loading 끄기
  //   setLoading(false);
  // };

  const takePicture = async () => {
    // 카메라 참조 없으면 그냥 돌아오기
    if (!cameraRef) return;
    // 찍은 사진 data 가져오기
    const data = await cameraRef.current.takePictureAsync(null);

    // 사진 data의 uri 전역변수에 저장
    dispatch(setImage(data.uri));
    // 지금까지 찍은 사진을 배열로 저장
    dispatch(setAlbum(album));
    setcamImage(data.uri);
    const lastId = album.length === 0 ? 0 : album[album.length - 1].id;
    const newImage = {
      id: lastId + 1,
      name: "미상",
      uri: data.uri,
      date: "5.26",
    };
    dispatch(setAlbum([...album, newImage]));
    // base64, json.stringfy해서 전송
    const base64Image = await FileSystem.readAsStringAsync(data.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setBasedUri(base64Image);
    await axios
      .post("http://35.229.143.20/predict/", { data: [base64Image] })
      .then(function (response) {
        dispatch(
          setResult([
            ...JSON.parse(response.request._response).results[0].images,
          ])
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    // fetchImages();
  };

  const onPressToggle = () => {
    setCamToggle(
      camToggle === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  return {
    cameraRef,
    takePicture,
    onPressToggle,
    camToggle,
    camImage,
    setcamImage,
    setAlbum,
    basedUri,
    loading,
    error,
  };
};
