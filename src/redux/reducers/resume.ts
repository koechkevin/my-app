import constants, {Action} from '../constants';

export interface Skill {
  name: string;
  description: string;
  editActive?: boolean;
}

export interface Work {
  organization: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  role: string;
  description: string;
}

export interface Education {
  school: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
}

export interface Referee {
  name: string;
  jobTitle: string;
  organization: string;
  email?: string;
  mobile?: string;
}

export interface Contact {
  city: string;
  country: string;
  emailAddress: string;
  phone: string;
  region: string;
}

export interface Resume {
  title: string;
  name: string;
  overview: string;
  skills: Skill[];
  work: Work[];
  achievements: string[];
  education: Education[];
  referees: Referee[];
  fetchingResume: boolean;
  contacts: Contact
}

const initialState: Resume = {
  overview: 'Overview',
  title: 'Title',
  name: '',
  achievements: [],
  skills: [],
  work: [],
  education: [],
  referees: [],
  contacts: {
    city: '',
    country: '',
    emailAddress: '',
    phone: '',
    region: '',
  },
  fetchingResume: false,
};

const resume = (state: Resume = initialState, { type, payload }: Action) => {
  switch(type) {
    case constants.LOAD_RESUME:
      return {...state, ...payload};
    case constants.FETCH_RESUME_LOADING:
      return { ...state, fetchingResume: payload};
    case constants.FETCH_RESUME:
      return state;
    case constants.EDIT_RESUME:
      return {...state, ...payload};
    case constants.RESET_RESUME:
      return {...initialState, fetchingResume: state.fetchingResume}
  }
  return state;
};

export default resume;
