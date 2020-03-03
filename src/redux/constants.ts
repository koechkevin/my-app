const constants = {
  HANDLE_PAGE_TITLE: 'handle-page-title',
  LOGOUT: 'logout',
  HANDLE_DRAWER: 'open-close-drawer',
};

export interface Action {
  payload?: any;
  type: string;
}

export default constants;