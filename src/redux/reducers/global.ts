import constants, {Action} from '../constants';

const { HANDLE_PAGE_TITLE, HANDLE_DRAWER,
  SHOW_HIDE_SIDEBAR,
  SHOW_SOCIAL_ICONS, LOAD_STATUS_CODE, LOAD_USER_NAME,
  REQUESTING_EMAIL,
  REQUESTING_EMAIL_ERRORS,
  REGISTER_LOADING, REGISTER_ERRORS,
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
};


const global:(state: GlobalState, action: Action) => GlobalState = (state = initialState, action: Action) => {
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
    default:
      return state;
  }
};

export default global