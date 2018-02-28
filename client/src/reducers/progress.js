const initialState = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
    case 'INCREMENT_PROGRESS': {
      return state + 1;
    }
    case 'DECREMENT_PROGRESS': {
      return Math.max(state - 1, 0);
    }
  }
}
