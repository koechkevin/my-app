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
  uploadPercent: 0,
};

const common = (state=initialState, action: Action) => {
  switch (action.type) {
    case constants.HANDLE_MODAL:
      return {...state, modals: {
          ...state.modals, ...action.payload,
        }};
    case constants.UPLOAD_PROGRESS:
      return {...state, uploadPercent: action.payload};
    default:
      return state;
  }
};

export default common;
