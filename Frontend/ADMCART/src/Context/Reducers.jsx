export function Reducers(state, action) {
  switch (action.type) {
    case "MostrarU":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "Actualizaru":
      return {
        ...state,
        user: action.payload.user,
      };
  }
}
