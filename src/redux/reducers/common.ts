import constants, {Action} from '../constants';

const initialState = {
  modals: {
    requestRegister: {
      open: false,
    },
    registerModal: {
      open: true,
    },
    loginModal : {
      open: false,
    },
  },
};

const common = (state=initialState, action: Action) => {
  if (action.type === constants.HANDLE_MODAL) {
    return {...state, modals: {
      ...state.modals, ...action.payload,
      }};
  } else {
    return state;
  }
};

export default common;
