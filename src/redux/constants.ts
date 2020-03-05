const constants = {
  HANDLE_PAGE_TITLE: 'update the name of the page title',
  LOGOUT: 'logout',
  HANDLE_DRAWER: 'open/close drawer',
  FETCH_RESUME: 'make api request to fetch',
  LOAD_RESUME: 'load resume from backend to application state',
  LOAD_USER_DETAILS: 'load user details to show on dashboard',
  FETCH_RESUME_LOADING: 'loading status when fetching a resume',
  SHOW_HIDE_SIDEBAR: 'toggle showing and hiding of sidebar',
  SHOW_SOCIAL_ICONS: 'handle whether to display social buttons on the header',
  LOAD_USERS: 'load all users into store',
  FETCH_USERS_LOADING: 'loading status when fetching users',
  LOAD_STATUS_CODE: 'loads the status code from api response',
  LOAD_USER_NAME: 'load username to store',
  HANDLE_MODAL: 'handles modal state',
  REQUESTING_EMAIL: 'loading request email sending',
  REGISTER_LOADING: 'register request loading',
  REQUESTING_EMAIL_ERRORS: 'errors emanating from a user requesting to register',
  AUTH_KEY_TOKEN: 'AUTH_KEY_TOKEN',
  REGISTER_ERRORS: 'errors during register',
};

export interface Action {
  payload?: any;
  type: string;
}

export default constants;