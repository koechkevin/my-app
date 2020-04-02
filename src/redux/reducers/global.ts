import constants, {Action} from '../constants';

const { HANDLE_PAGE_TITLE, HANDLE_DRAWER,
  SHOW_HIDE_SIDEBAR,
  SHOW_SOCIAL_ICONS, LOAD_STATUS_CODE, LOAD_USER_NAME,
  REQUESTING_EMAIL,
  REQUESTING_EMAIL_ERRORS,
  REGISTER_LOADING, REGISTER_ERRORS, LOGIN_LOADING, LOGIN_FAILED, AUTHENTICATE, HANDLE_IS_EDITABLE,
} = constants;
interface GlobalState {
  pageTitle: string;
  drawerOpen: boolean;
  sideBarMenuVisible: boolean;
  showSocialIcons: boolean;
  statusCode: number;
  username: string;
  requestingEmail: boolean;
  requestingEmailErrors: {
    message: string;
    fieldName: string;
  }
  registerLoading: boolean;
  registerErrors: any[];
  loginLoading: boolean;
  loginFailed: boolean;
  auth: {
    authenticated: boolean;
  }
  isEditable: boolean;
  forgotPasswordLoading: boolean;
  fillNewPasswordLoading: boolean;
  fillNewPasswordErrors: any[];
  forgotPasswordErrors: any;
  emailPage: boolean;
}

const initialState: GlobalState = {
  pageTitle: '',
  drawerOpen: false,
  sideBarMenuVisible: true,
  showSocialIcons: false,
  statusCode: 200,
  username: '',
  requestingEmail: false,
  requestingEmailErrors: {
    message: '', fieldName: '',
  },
  registerLoading: false,
  registerErrors: [],
  loginLoading: false,
  loginFailed: false,
  isEditable: false,
  auth : {
    authenticated: false,
  },
  forgotPasswordLoading: false,
  fillNewPasswordLoading: false,
  fillNewPasswordErrors: [],
  forgotPasswordErrors: {},
  emailPage: false,
};


const globalState:(state: GlobalState, action: Action) => GlobalState = (state = initialState, action: Action) => {
  switch(action.type){
    case HANDLE_PAGE_TITLE:
      return {...state, pageTitle: action.payload};
    case LOAD_STATUS_CODE:
      return {...state, statusCode: action.payload};
    case HANDLE_DRAWER:
      return {...state, drawerOpen: action.payload};
    case SHOW_HIDE_SIDEBAR:
      return {...state, sideBarMenuVisible: action.payload};
    case LOAD_USER_NAME:
      return {...state, username: action.payload};
    case SHOW_SOCIAL_ICONS:
      return {...state, showSocialIcons: action.payload };
    case REQUESTING_EMAIL:
      return {...state, requestingEmail: action.payload};
    case REGISTER_LOADING:
      return {...state, registerLoading: action.payload};
    case REQUESTING_EMAIL_ERRORS:
      return {...state, requestingEmailErrors: action.payload};
    case REGISTER_ERRORS:
      return {...state, registerErrors: action.payload};
    case LOGIN_LOADING:
      return {...state, loginLoading: action.payload};
    case LOGIN_FAILED:
      return {...state, loginFailed: action.payload};
    case AUTHENTICATE:
      return {...state, auth: action.payload};
    case HANDLE_IS_EDITABLE:
      return {...state, isEditable: action.payload};
    case constants.FORGOT_PASSWORD_LOADING:
      return {...state, forgotPasswordLoading: action.payload};
    case constants.FILL_NEW_PASSWORD_LOADING:
      return {...state, fillNewPasswordLoading: action.payload};
    case constants.FILL_NEW_PASSWORD_ERRORS:
      return {...state, fillNewPasswordErrors: action.payload};
    case constants.FORGOT_PASSWORD_ERRORS:
      return {...state, forgotPasswordErrors: action.payload};
    case constants.EMAIL_PAGE:
      return {...state, emailPage: action.payload};
    default:
      return state;
  }
};

export default globalState
