import constants, {Action} from '../constants';

export interface SocialLink {
  name: string;
  link: string;
}

export interface Detail {
  name: string;
  link?: string;
}

export interface QuickLink {
  title: string;
  details: Detail[];
}

export interface User {
  firstName: string;
  avatarUrl: string;
  lastName: string;
  avatarColor?: string;
  socialLinks: SocialLink[];
}

export interface UserState extends User {
  quickLinks: QuickLink[]
}

const initialState: UserState = {
  firstName: '', lastName: '', avatarUrl: '', socialLinks: [], avatarColor: '', quickLinks: [],
};

const user: (state: User, action: Action) => User = (state: User = initialState, {type, payload}: Action) => {
  switch(type){
    case constants.LOAD_USER_DETAILS:
      return {...state, ...payload};
    case 'constants':
      return state;
    default:
      return state;
  }
};

export default user;