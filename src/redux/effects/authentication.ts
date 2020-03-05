import { notification } from 'antd';
import {Dispatch} from 'redux';
import {api} from '../../services/axios';
import constants from '../constants';

const authorize = (token: string) => {
  localStorage.setItem(constants.AUTH_KEY_TOKEN, token);
};

export const requestRegister = async (data: any, args: any, dispatch: Dispatch) => {
  try {
    dispatch({ type: constants.REQUESTING_EMAIL, payload: true});
    await api.post('/auth/request-email', data);
    dispatch({ type: constants.HANDLE_MODAL, payload: { requestRegister: { open: false }}});
    notification.success(args);
  } catch(error) {
    if (error.response && error.response.status === 409) {
      dispatch({ type: constants.REQUESTING_EMAIL_ERRORS, payload: error.response.data});
    }
  }
  dispatch({ type: constants.REQUESTING_EMAIL, payload: false});
};

export const register = async (data: any, params: string, dispatch: Dispatch) => {
  try {
    dispatch({ type: constants.REGISTER_LOADING, payload: true});
    const response = await api.post(`/auth/register${params}`, data);
    authorize(response.data.token);
    window.location.href = '/';
  } catch(error) {
    dispatch({ type: constants.REGISTER_LOADING, payload: false});
    if (error.response && error.response.status === 422) {
      return dispatch({ type: constants.REGISTER_ERRORS, payload: error.response.data.errors});
    }
    window.location.href = '/exception/404';
  }
  dispatch({ type: constants.REGISTER_LOADING, payload: false});
};

export const validateUsername = async (username: string, dispatch: Dispatch) => {
  try {
    await api.post('/auth/validate-username', { username });
    dispatch({ type: constants.REGISTER_ERRORS, payload: []});
  } catch (error) {
    if (error.response && error.response.status === 422) {
      return dispatch({ type: constants.REGISTER_ERRORS, payload: error.response.data.errors});
    }
  }
}