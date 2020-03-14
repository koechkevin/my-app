import moment from 'moment';
import {Dispatch} from 'redux';
import {database} from '../../firebase';
import {api} from '../../services/axios';
import constants from '../constants';

export const messageListener = (userId: string) => {
  database.ref(`/messages`)
    .on('value', (snapshot) => {
    // console.log('========>', snapshot.val());
  });
};

export const createMessage = async ({from, to, message, id, recipient, me }: any, dispatch: Dispatch, callback?: any) =>
{
  const createdAt = moment().format();
  const msg = { from, to, message, createdAt, id, read: false};
  dispatch({ type: constants.ADD_MESSAGE, payload: msg});
  await database.ref(`/chats/${from}/${to}/user`).set(recipient);
  await database.ref(`/chats/${to}/${from}/user`).set(me);
  await database.ref(`/chats/${from}/${to}/list`).push({...msg, read: true});
  await database.ref(`/chats/${to}/${from}/list`).push(msg);
  const snap = await database.ref(`/chats/${to}/${from}/notifications`).once('value');
  const notificationCount = snap.val();
  await database.ref(`/chats/${from}/${to}/notifications`).set(notificationCount ? notificationCount + 1 : 1);
  callback && callback();
};

export const getMessages = ({ currentUser, user}: any, dispatch: Dispatch) => {
  const subscription = database.ref(`/chats/${currentUser}/${user}/list`);
  subscription.on('value', (snapshot, b) => {
      const value = snapshot.val();
      const chats = value && Object.keys(value).map((each: string) => {
        return {...value[each], firebaseId: each}
      });
      dispatch({ type: constants.LOAD_MESSAGES, payload: chats || []});
    });
  return subscription;
}

export const getChats = ({ currentUser }: any, dispatch: Dispatch) => {
  const ref = database.ref(`chats/${currentUser}`);
  ref.on('value', (snapshot) => {
    const value = snapshot.val() || {};
    const list = Object.values(value).filter((each: any) => !!each.user);
    dispatch({ type: constants.LOAD_CHATS, payload: list})
  });
  return ref;
};

export const sendMail = async (data: any) => {
  return api.post('/messages/email', data);
}