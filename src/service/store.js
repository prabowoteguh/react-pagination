const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  value: 0,
  age: 17,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_AGE":
      return {
        ...state,
        age: state.age + 1,
      };
      break;
    case "UPDATE_GENRE":
      return {
        ...state,
        genre: action.genre,
      };
      break;
    default:
      return state;
      break;
  }
  return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subcription
store.subscribe(() => {
  console.log("store change", store.getState());
});

// Dispatching action
store.dispatch({ type: "ADD_AGE" });
store.dispatch({ type: "UPDATE_GENRE", genre: "romance" });
