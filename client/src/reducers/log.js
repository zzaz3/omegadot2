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
    case 'USER_CREATED': {
      const newLog = {
        name : action.json.name,
        type : "User Created",
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
      debugger;
      var newData = {
        debits: action.json.debitEntries,
        credits: action.json.creditEntries,
        description: action.json.description,
        status: "pending",
        rejectReason: action.json.rejectReason,
      }
      var newLog = {
        name : action.json.name,
        type : "Transaction",
        time : new Date(),
        data: newData,
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
