const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MAKE_LOG': {
       return [...state, action.json];
    }
    case 'LOAD_LOG': {
      return action.json;
   }
    default: {
      return state;
    }
  }
}
