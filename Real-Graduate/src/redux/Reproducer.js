import { SET_IMAGE, SET_ALBUM, SET_RESULT } from "./Action";

const initialState = {
  image: "",
  album: [],
};

function imageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGE:
      return { ...state, image: action.payload };
    case SET_ALBUM:
      return { ...state, album: action.payload };
    case SET_RESULT:
      return { ...state, resultImage: action.payload };
    default:
      return state;
  }
}

export default imageReducer;
