const initialState = {
  // estado inicial
  rfids: [],
};

const ReducerRfid = (state = initialState, actions) => {
  switch (actions.type) {
    case "GET_RFID":
      // console.log("actions.payload GET: ", actions.payload);
      return {
        ...state,
        rfids: actions.payload,
      };

    case "POST_RFID":
      // console.log("POST VEHICLE actions.payload: ", actions.payload);
      return {
        rfids: [...state.rfids, actions.payload],
      };

    case "PUT_RFID":
      var rfidsLoaded = [];
      // console.log("actions.payload PUT: ", actions.payload);
      state.rfids.map((p) => {
        if (p.id === actions.payload.id) {
          p.rfidNumber = actions.payload.rfidNumber;
          p.brand = actions.payload.brand;
          p.invoiceNumber = actions.payload.invoiceNumber;
          p.invoiceDate = actions.payload.invoiceDate;
          p.company = actions.payload.company;
          p.measure = actions.payload.measure;
          p.type = actions.payload.type;
          p.location = actions.payload.location;
          p.recapNumber = actions.payload.recapNumber;
          p.image = actions.payload.image;
          p.invoiceImage = actions.payload.invoiceImage;
          p.vehicleId = actions.payload.vehicleId;
          p.active = actions.payload.active;
        }
        rfidsLoaded.push(p);
      });
      return {
        rfids: rfidsLoaded,
      };

    case "DELETE_RFID":
      var rfidsLoaded = [];
      state.rfids.map((p) => {
        if (p.id === actions.payload.id) {
          p.active = actions.payload.active;
        }
        rfidsLoaded.push(p);
      });
      return {
        rfids: rfidsLoaded,
      };

    default:
      return state;
  }
};

export default ReducerRfid;
