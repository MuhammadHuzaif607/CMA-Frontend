import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOAD_USER,
  LOGIN_FAIL,
} from '../type';

const Authreducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case REGISTER_FAIL:
    case LOGOUT:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        token: '',
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: action?.payload ?? null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        isLoading: false,
        error: action.error,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default Authreducer;
