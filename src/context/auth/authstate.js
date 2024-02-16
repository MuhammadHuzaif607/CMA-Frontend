import React, { useReducer } from 'react';
import AuthContext from './authcontext';
import Authreducer from './authreducer';
import axios from 'axios';

import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOAD_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
} from '../type';
import setAuthToken from '../../components/utils/settoken';
const AuthState = ({ children }) => {
  const initstate = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    isLoading: true,
    user: null,
    error: null,
  };

  // Register User
  const registerUserHandler = async (data) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/users', data, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
        data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Load user data
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  // Login User
  const loginUser = async (data) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/auth', data, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
        data: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  const [state, dispatch] = useReducer(Authreducer, initstate);
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        user: state.user,
        error: state.error,
        registerUser: registerUserHandler,
        loadUser,
        loginUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
