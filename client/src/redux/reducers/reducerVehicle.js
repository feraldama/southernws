const initialState = {
  // estado inicial
  vehicles: [],
};

const ReducerVehicle = (state = initialState, actions) => {
  switch (actions.type) {
    case "GET_VEHICLE":
      return {
        ...state,
        vehicles: actions.payload,
      };

    case "POST_VEHICLE":
      // console.log("POST VEHICLE actions.payload: ", actions.payload);
      return {
        vehicles: [...state.vehicles, actions.payload],
      };

    case "PUT_VEHICLE":
      var vehiclesLoaded = [];
      // console.log("actions.payload: ", actions.payload);
      state.vehicles.map((p) => {
        if (p.id === actions.payload.id) {
          p.name = actions.payload.name;
          p.description = actions.payload.description;
          p.plate = actions.payload.plate;
          p.image = actions.payload.image;
          p.active = actions.payload.active;
          p.categories = actions.payload.categories;
          p.category = actions.payload.category;
        }
        vehiclesLoaded.push(p);
      });
      return {
        vehicles: vehiclesLoaded,
      };

    case "DELETE_VEHICLE":
      var vehiclesLoaded = [];
      state.vehicles.map((p) => {
        if (p.id === actions.payload.id) {
          p.active = actions.payload.active;
        }
        vehiclesLoaded.push(p);
      });
      return {
        vehicles: vehiclesLoaded,
      };

    default:
      return state;
  }
};

export default ReducerVehicle;
