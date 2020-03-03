import constants, {Action} from '../constants';

const { HANDLE_PAGE_TITLE, LOGOUT, HANDLE_DRAWER } = constants;
interface GlobalState {
  pageTitle: string;
  drawerOpen: boolean;
}

const initialState: GlobalState = {
  pageTitle: '',
  drawerOpen: false,
};


const global:(state: GlobalState, action: Action) => GlobalState = (state = initialState, action: Action) => {
  switch(action.type){
    case HANDLE_PAGE_TITLE:
      return {...state, pageTitle: action.payload};
    case LOGOUT:
      return state;
    case HANDLE_DRAWER:
      return {...state, drawerOpen: action.payload};
    default:
      return state;
  }
};

export default global