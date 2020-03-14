import { Button, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {connect, useDispatch } from 'react-redux';
import {Dispatch} from 'redux';
import { v4 as uid } from 'uuid'
import {database} from '../../firebase';
import constants from '../../redux/constants';
import {createMessage, getMessages, sendMail} from '../../redux/effects/messaging';

import { PageTitle } from '../../components';
import Exception404 from '../404';
import styles from './Messages.module.scss';

const { Text } = Typography;

const SingleMessage: FC<any> = (props) => {
  const { message, myId } = props;
  const myMessage = message.from === myId;
  const classNames = [styles.chatRow, myMessage ? styles.left : styles.right].join(' ');
  useEffect(() => {
    if(message.to === myId) {
      database.ref(`/chats/${myId}/${message.from}/list/${message.firebaseId}`)
      .update({read:true})
    }
  }, [message, myId]);
  return(
    <div className={classNames} key={message.id}>
      <div className={styles.chat}>
        <div className={styles.textM}>
          {message.message}
        </div>
        <div className={styles.time}>{moment(message.createdAt).format('HH:mm')}</div>
      </div>
    </div>
  );
}
const Message: FC<any> = (props) => {
  const [value, setValue] = useState('');
  const { match: { params: { username } }, user,
    loadUserName, handlePageTitle, to, auth, list, recipient, title} = props;

  const [sendAsEmail, setSendAsEmail] = useState(false);

  const from = auth && auth.userId;
  const { firstName, lastName, email } = user;
  const name = `${firstName} ${lastName}`;

  useEffect(() => {
    if (username) {
      loadUserName(username);
    }
  }, [loadUserName, username]);

  useEffect(() => {
    const pageTitle = <PageTitle name={name} title={title} page="Chats" />;
    handlePageTitle(pageTitle);
    return () => handlePageTitle('');
  }, [handlePageTitle, name, title]);

  useEffect(() => {
    const ref = database.ref(`/chats/${from}/${to}`);
    ref.once('value').then((snapshot) => {
      const val = snapshot.val();
      if (!val) {
        ref.set({ user: recipient})
      }
    })
    return () => ref.off();
  }, [from, to,recipient]);

  const dispatch = useDispatch();
  useEffect( () => {
    const subscription = getMessages({ currentUser: from, user: to}, dispatch);
    return () => subscription.off();
  }, [to, from, dispatch]);

  const scrollToBottom = () => {
    const objDiv: any = document.getElementById('msg');
    if (objDiv){
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  useEffect(() => {
    if (list.length) {
      scrollToBottom();
    }
  }, [list]);

  const [typing, setTyping] = useState('');

  useEffect(() => {
    database.ref(`/chats/${from}/${to}/typing`)
      .on('value', (snapshot) => {
        const value = snapshot.val();
        setTyping(value);
      });
  }, [from, to]);

  const onClick = () => {
    if(auth.userId && recipient){
      const id = uid();
      createMessage({from,to, message: value, id, me: auth, recipient }, dispatch)
        .then();
      if (sendAsEmail) {
        sendMail({sender: name, recipient: email, message: value });
      }
      setValue('');
      database.ref(`/chats/${to}/${from}/typing`).set('');
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      if (value.trim()) {
        onClick();
      }
    }
  }

  const onBlur = () => {
    if (to && from) {
      database.ref(`/chats/${to}/${from}/typing`).set('');
    }
  }

  const onChange = (e: any) => {
    e.persist();
    const value = e.target.value?.trim() ? e.target.value : '';
    setValue(value);
    if (to && from) {
      database.ref(`/chats/${to}/${from}/typing`).set(value)
    }
  }

  const disabled = !value.trim();

  if(from === to) {
    return <Exception404
      showSidebar
      exception={404}
      text={`You cannot text yourself mate!. In future, your notes will appear here`}/>;
  }


    if(!auth.authenticated) {
      return <Exception404
        showSidebar
        exception={403}
        text={`You cannot view ${name}'s messages at the moment. Just because you are not logged in`}/>;
    }
  return (
    <>
    <div id="msg"  className={styles.row}>
      <div className={styles.list}>
        <div style={{ height: 8 }} />
    {
      list.map((each: any) => <SingleMessage key={each.id} message={each} myId={from}/>)
    }
      </div>
    <div style={{ height: 8 }} />
    <div className={styles.span}>
      {typing && <div className={styles.typing}>{typing}</div>}
    <TextArea
      style={{ borderRadius: 8, resize: 'none'}}
      className={styles.text}
      onKeyDown={handleKeyDown}
      placeholder={`Jot something down for ${recipient.firstName}`}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      autoSize/>
      <span className={styles.button}>
    <Button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: '#0050c8',
        color: 'white',
        opacity: disabled ? '0.6' : '',
        borderRadius: 8,
        padding: '0 8px', height: 24, fontSize: 14}}
      type="primary"
    >Send</Button>
    </span>
    </div>
      <div className={styles.after}>
        <input
          checked={sendAsEmail}
          onClick={() => setSendAsEmail((value) => !value)}
          type="checkbox" />
          <Text style={{ fontSize: 12, marginLeft: 8, fontWeight: 600 }}>Also send as Email</Text>
      </div>
  </div>
      </>)
}

const mapStateToProps = ({ user: { email, username, firstName, lastName, id }, user, global, messages, resume }: any) =>
  ({to: id, recipient: { email, username, firstName, lastName, userId: id}, user,
  auth: global.auth, list: messages.messageList, title: resume.title});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle }),
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);