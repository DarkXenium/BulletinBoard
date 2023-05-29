const initialstate = {
  posts: [],
};
const postReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "SINGLEPOST":
      return { ...state, posts: action.payload };
  }
};
