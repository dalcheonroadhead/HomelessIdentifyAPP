export const SET_IMAGE = "SET_IMAGE";
export const SET_ALBUM = "SET_ALBUM";
export const SET_RESULT = "SET_RESULT";

export const setImage = (image) => (dispatch) => {
  dispatch({
    type: SET_IMAGE,
    payload: image,
  });
};

export const setAlbum = (album) => (dispatch) => {
  dispatch({
    type: SET_ALBUM,
    payload: album,
  });
};

export const setResult = (resultImage) => (dispatch) => {
  dispatch({
    type: SET_RESULT,
    payload: resultImage,
  });
};
