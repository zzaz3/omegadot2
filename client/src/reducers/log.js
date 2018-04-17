const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ACCOUNT_CREATED': {
      const newLog = {
        name : action.json.name,
        type : "Account Created",
        time : new Date(),
        changedBy : action.user
      }
      fetch('/log', {
        method: 'POST',
        body: JSON.stringify(newLog),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
       return [...state,...newLog];
    }
    case 'TRANSACTION_OCCURED': {
      const newLog = {
        name : action.json.name,
        type : "Account Created",
        time : new Date(),
        data: action.json.data,
        changedBy : action.user
      }
      fetch('/log', {
        method: 'POST',
        body: JSON.stringify(newLog),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
       return [...state,...newLog];
    }
    case 'LOAD_LOG': {
      return action.json;
   }
    default: {
      return state;
    }
  }
}
