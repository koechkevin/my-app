import common from './common';
import global from './global'
import resume from './resume';
import user from './user';
import usersReducer from './users';

const reducers = {
  resume, global, user, users: usersReducer, common,
};

export default reducers;