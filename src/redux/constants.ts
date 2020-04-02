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
  LOGIN_LOADING: 'login request loading',
  LOGIN_FAILED: 'login failed',
  AUTHENTICATE: 'load if user is authenticated',
  HANDLE_IS_EDITABLE: 'is the resume I am viewing editable by me?',
  EDIT_RESUME: 'edit resume data',
  RESET_RESUME: 'return initial state dispatched when component un mounts',
  FORGOT_PASSWORD_LOADING: 'forgot password loading',
  FILL_NEW_PASSWORD_LOADING: 'fill new password loading',
  FILL_NEW_PASSWORD_ERRORS: 'errors fro filling password',
  FORGOT_PASSWORD_ERRORS: 'forgot password errors',
  UPLOAD_PROGRESS: 'upload progress',
  LOAD_MESSAGES: 'load messages list',
  LOAD_CHATS:'load chats list',
  ADD_MESSAGE: 'add a message I have written',
  LOAD_OPPOSITE_CHATS: 'load my chats on the other end',
  EMAIL_PAGE: 'email page active',
};

export interface Action {
  payload?: any;
  type: string;
}

export default constants;
