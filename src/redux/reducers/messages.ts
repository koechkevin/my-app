import constants, {Action} from '../constants';

const initialState = {
  messageList: [],
  chatList: [],
};

const messages = (state = initialState, action: Action) => {
  switch(action.type) {
    case constants.LOAD_MESSAGES:
      return {...state, messageList: action.payload};
    case constants.LOAD_CHATS:
      return {...state, chatList: action.payload};
    case constants.ADD_MESSAGE:
      return {...state, messageList: [...state.messageList, action.payload]}
    default:
      return state;
  }
};

export default messages;
