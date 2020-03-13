import common from './common';
import global from './global'
import messages from './messages';
import resume from './resume';
import user from './user';
import usersReducer from './users';

const reducers = {
  resume, global, user, users: usersReducer, common, messages,
};

export default reducers;