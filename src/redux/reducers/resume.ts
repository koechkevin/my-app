import constants, {Action} from '../constants';

export interface Skill {
  name: string;
  description: string;
}

export interface Work {
  organization: string;
  startDate: string;
  endDate: string;
  role: string;
  description: string;
}

export interface Education {
  school: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Referee {
  name: string;
  jobTitle: string;
  organization: string;
  email?: string;
  mobile?: string;
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
}

const initialState: Resume = {
  overview: '',
  title: '',
  name: '',
  achievements: [],
  skills: [],
  work: [],
  education: [],
  referees: [],
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
  }
  return state;
};

export default resume;
