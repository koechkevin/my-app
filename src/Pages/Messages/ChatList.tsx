import {faSearch} from '@fortawesome/pro-light-svg-icons';
import { Typography } from 'antd';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {Icon} from '../../components';
import {database} from '../../firebase';
import {notify} from '../../redux/effects/notifications';
import {fetchUsers} from '../../redux/effects/resume';
import styles from './Chatlist.module.scss';


const { Text } = Typography;

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const SingleChat: FC<any> = (props) => {
  const { user, list } = props;
  const { id, auth } = useSelector(({ user: { id }, global: { auth }}: any) => ({ id, auth }));
  // change this to use route
  const active = id === user?.userId;
  const [online, setOnline] = useState(false);
  const classNames = [styles.single, active ? styles.active : ''].join(' ');

  const messages = Object.values(list || {}).filter((each: any) => each.from !== auth.userId && !each.read);
  const previous = usePrevious(messages);

  useEffect(() => {
    const onClick = () => window.location.href =`/${user.username}/messages`;
    if (previous) {
      // @ts-ignore
      if (messages.length > previous.length) {
          notify(`New Message from ${user.firstName}`, onClick)
      }
    }
  }, [messages.length, previous, user]);

  useEffect(() => {
    database.ref(`/users/${user.userId}/status`).on('value', (snap) => {
      const value = snap.val();
      setOnline(value && value === 'online');
    })
    return () => database.ref(`/users/${user.userId}/status`).off();
  }, [user]);

  const [typing, setTyping] = useState('');

  const me = auth && auth.userId;

  useEffect(() => {
    const ref = database.ref(`/chats/${me}/${user.userId}/typing`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      setTyping(value);
    });
    return () => ref.off();
  }, [me, user.userId]);

  return (
    <>
      <Link to={`/${user.username}/messages`}>
        <div className={classNames}>
          {typing && <div className={styles.typing}>...</div>}
          {!typing && <div className={online ? styles.online : styles.offline}>{''}</div>}
          <div className={styles.text} style={{ height: 18 }}>
            <Text ellipsis>{`${user.firstName} ${user.lastName}`}</Text>
          </div>
          {messages.length > 0 && <div className={styles.unread}>{messages.length < 10 ? messages.length : '9+'}</div>}
        </div>
      </Link>
      </>);
}
const ChatList: FC<any> = (props) => {
  const {chatList, users} = useSelector(({ messages: { chatList }, users: { users}}: any) => ({
    chatList, users,
  }));

  const dispatch = useDispatch();
  const fetchUsersAction = useCallback(() => fetchUsers(dispatch), [dispatch]);
  useEffect(() => {
    fetchUsersAction().then();
  }, [fetchUsersAction]);
const [search, setSearch] = useState('');

  const usersNotInChat = users.filter((each: any) => {
    const name = `${each.firstName} ${each.lastName}`;
    const searched = name.toLowerCase().includes(search.toLowerCase());
    return searched && !chatList.find((one: any) => one.user && one.user.userId === each.id);
  });

const list = chatList.filter((each: any) => {
  const name = `${each.user?.firstName} ${each.user?.lastName}`;
  return name.toLowerCase().includes(search.toLowerCase());
});

  return (<div className={styles.chatList}>
    <div className={styles.span}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className={styles.input}
        type="text"/>
      <Icon color="lightgrey" className={styles.icon} icon={faSearch}/>
    </div>
    {
      list
        .map((each: any, index: number) => <SingleChat list={each.list} user={each.user} key={each.user?.userId} />)
    } {
    usersNotInChat
      .map((each: any, index: number) =>
        <SingleChat list={{}} user={{...each, userId: each.id}} key={each.id} />)
  }
  </div>)
}

export default ChatList;