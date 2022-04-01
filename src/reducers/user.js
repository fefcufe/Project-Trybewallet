const INITIAL_STATE_USER = {
  email: '',
};

const userReducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case 'ADD_EMAIL':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
