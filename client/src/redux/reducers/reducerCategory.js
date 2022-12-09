const initialState = {
  categories: [],
};

const ReducerCategory = (state = initialState, actions) => {
  switch (actions.type) {
    case "POST_CATEGORY":
      return {
        categories: [...state.categories, actions.payload],
      };

    case "DELETE_CATEGORY":
      var categoriesLoaded = [];
      state.categories.map((p) => {
        if (p.id == actions.payload.id) {
          p.name = actions.payload.name;
          p.description = actions.payload.description;
          p.active = actions.payload.active;
        }
        categoriesLoaded.push(p);
      });
      return {
        categories: categoriesLoaded,
      };

    case "GET_CATEGORY":
      return {
        ...state,
        categories: actions.payload,
      };

    case "PUT_CATEGORY":
      var categoriesLoaded = [];
      state.categories.map((p) => {
        if (p.id == actions.payload.id) {
          p.name = actions.payload.name;
          p.description = actions.payload.description;
          p.active = actions.payload.active;
        }
        categoriesLoaded.push(p);
      });
      return {
        categories: categoriesLoaded,
      };

    default:
      return state;
  }
};
export default ReducerCategory;
