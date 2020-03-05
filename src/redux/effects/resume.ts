import {Dispatch} from 'redux';
import {api} from '../../services/axios';
import constants from '../constants';

export const fetchResume = async (userId: string, dispatch: Dispatch)  => {
  dispatch({ type: constants.FETCH_RESUME_LOADING, payload: true });
  try {
    const {data } = await api.get(`/auth/users/${userId}`);
    const { resume, ...restDetails  } = data;
    dispatch({ type: constants.LOAD_RESUME, payload: resume});
    dispatch({ type: constants.LOAD_USER_DETAILS, payload: {...restDetails} });
    dispatch({ type: constants.FETCH_RESUME_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: constants.FETCH_RESUME_LOADING, payload: false });
    dispatch({ type: constants.LOAD_STATUS_CODE, payload: error.response && error.response.status});
    throw error;
  }
};

export const fetchUsers = async (dispatch: Dispatch)  => {
  dispatch({ type: constants.FETCH_USERS_LOADING, payload: true });
  try {
    const {data } = await api.get(`/auth/users`);
    const { users } = data;

    dispatch({ type: constants.LOAD_USERS, payload: users });
  } catch (error) {
    throw error;
  }
  dispatch({ type: constants.FETCH_USERS_LOADING, payload: false });
}