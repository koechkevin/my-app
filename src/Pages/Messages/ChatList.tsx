import { Typography } from 'antd';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {database} from '../../firebase';
import {notify} from '../../redux/effects/notifications';
import styles from './Chatlist.module.scss';


const { Text } = Typography;

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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
        notify(`New Message from ${user.firstName}`, onClick);
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

  return (
    <>
      <Link to={`/${user.username}/messages`}>
        <div className={classNames}>
          <div className={online ? styles.online : styles.offline}>{''}</div>
          <div className={styles.text} style={{ height: 18 }}>
            <Text ellipsis>{`${user.firstName} ${user.lastName}`}</Text>
          </div>
          {messages.length > 0 && <div className={styles.unread}>{messages.length < 10 ? messages.length : '9+'}</div>}
        </div>
      </Link>
      </>);
}
const ChatList: FC<any> = (props) => {
  const {chatList} = useSelector(({ messages: { chatList }}: any) => ({
    chatList,
  }));


  return (<div className={styles.chatList}>
    {
      chatList
        .map((each: any, index: number) => <SingleChat list={each.list} user={each.user} key={each.user?.userId} />)
    }
  </div>)
}

export default ChatList;