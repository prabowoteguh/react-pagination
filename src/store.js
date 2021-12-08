import { createStore } from "redux";
import axios from "axios";

const initialState = {
  sidebarShow: "responsive",
  listGenre: [],
};

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_GENRE":
      return axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49`
        )
        .then((response) => {
          this.setState({
            allData: response.data.genres,
          });
          console.log("RESPONSE =>", response.data.genres);
          return { ...state, listGenre: response.data.genres };
        })
        .catch((error) => {
          console.log("ERROR =>", error);
        })
        .finally((response) => {
          return { ...state, listGenre: response.data.genres };
        });
      return { ...state, listGenre: action.genre };
    default:
      return state;
  }
};

const store = createStore(changeState);
store.subscribe(() => {
  console.log("store change", store.getState());
});
export default store;
