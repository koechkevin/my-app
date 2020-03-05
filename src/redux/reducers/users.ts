import constants, {Action} from '../constants';

interface InitialState {
  users: any[];
  loading: boolean;
}
const initialState = {
  users: [],
  loading: false,
};

const usersReducer: (state: InitialState, action: Action) => InitialState
  = (state: InitialState = initialState, action: Action) => {
  switch(action.type) {
    case constants.LOAD_USERS:
      return {...state, users: action.payload};
    case constants.FETCH_USERS_LOADING:
      return {...state, loading: action.payload };
    default:
    return state;
  }
};

export default usersReducer;