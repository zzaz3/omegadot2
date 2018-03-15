const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ACCOUNT_CREATED': {
      const newLog = {
        name : action.json.name,
        type : action.json.type,
        time : new Date(),
        beforeValue : 0,
        afterValue : 0,
        changedBy : action.user
      }
      debugger;
      fetch('/log', {
        method: 'POST',
        body: JSON.stringify(newLog),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
       return [...state,...action.json];
    }
    case 'LOAD_LOG': {
      return action.json;
   }
    default: {
      return state;
    }
  }
}
