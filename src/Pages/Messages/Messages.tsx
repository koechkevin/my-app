import {faBan, faChevronDown, faSmile, faTimes} from '@fortawesome/pro-light-svg-icons';
import {Button, Drawer, Dropdown, Menu, Modal, Row, Typography} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useMedia} from 'react-use';
import {Dispatch} from 'redux';
import { v4 as uid } from 'uuid'
import {database} from '../../firebase';
import constants from '../../redux/constants';
import {
  createMessage, deleteMessage, deleteThread,
  editMessage,
  editThread,
  getMessages,
  getOppositeChats,
  sendMail,
  threadMessage
} from '../../redux/effects/messaging';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Icon, PageTitle} from '../../components';
import {decode, encode} from '../../redux/effects/notifications';
import Exception404 from '../404';
import Emoji from '../Emoji';
import styles from './Messages.module.scss';

const { Text } = Typography;

const Footer: FC<any> = (props) => {
  const { onOk, onCancel } = props;
  const buttonStyle = {
    height: 24, borderRadius: 4, padding: '0 8px', fontSize: 12,
  };
  const cancelButton = {
    border: '1px solid #0050c8', color: '#0050c8',
  };
  const okButton = {
    background: 'red', color: 'white', border: '1px solid red',
  };
  return(<Row style={{ display: 'flex', justifyContent: 'flex-end'}}>
    <Button onClick={onCancel} style={{...buttonStyle, ...cancelButton}}>Cancel</Button>
    <Button onClick={onOk} style={{...buttonStyle, ...okButton}} type="primary">Delete</Button>
  </Row>)
}

const MessageAndThread: FC<any> = (props) => {
  const { message, showReply, setVisible, myId, onUpdate, onDelete, replies } = props;
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(message.encoded ? decode(message.message) : message.message);
  const myMessage = message.from === myId;

  const onChange = (e: any) => {
    e.persist();
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(message.encoded ? decode(message.message) : message.message);
  }, [message]);

  const onCancel = () => {
    setValue(message.encoded ? decode(message.message) : message.message);
    setEdit(false);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const onSave = () => {
    onUpdate && onUpdate(value);
    setEdit(false);
  };
  const onOk = () => {
    onDelete && onDelete();
    setModalVisible(false);
  };
  const classNames = [styles.chatRow, myMessage ? styles.right : styles.left].join(' ');
  return (
    <>
      <Modal
        title="Delete Message"
        footer={<Footer onOk={onOk} onCancel={() => setModalVisible(false)}/>}
        style={{ borderRadius: 8 }}
        closeIcon={<Icon onClick={() => setModalVisible(false)} icon={faTimes}/>}
        wrapClassName={styles.modal}
        width={320}
        centered
        visible={modalVisible}>
        <Text strong>Are you sure you want Delete?</Text>
        <div style={{ padding: 16, border: '1px solid lightgray', borderRadius: 8, marginTop: 8}}>
          <Text>{value}</Text>
        </div>
      </Modal>
    <div className={classNames} key={message.id}>
    {!edit && !message.isDeleted && <div className={styles.chat}>
      <div className={styles.textM}>
          <Text>{value}</Text>
          <span className={styles.edited}><i>{message.updatedAt?' (edited)':''}</i></span>
      </div>
      <div id="suffix" className={styles.suffix}>
        {(myMessage || showReply) ? (<Dropdown
          getPopupContainer={() => document.getElementById('suffix')||document.body}
          trigger={['click']}
          overlay={<Menu className={styles.menu} style={{ width: 200}}>
            {myMessage && <Menu.Item onClick={() => setEdit(true)}>Edit</Menu.Item>}
            { showReply && <Menu.Item onClick={() => setVisible(true)}>{!replies ? 'Reply': replies === 1 ?'1 reply': `${replies} replies`}</Menu.Item>}
            {myMessage && <Menu.Item onClick={() => setModalVisible(true)} className={styles.delete}>Delete</Menu.Item>}
          </Menu>}>
          <span>
            <FontAwesomeIcon color="#a6a6a6" icon={faChevronDown}/>
          </span>
      </Dropdown>):<span />}
        <div className={styles.time}>{moment(message.createdAt).format('HH:mm')}</div>
      </div>
    </div> }
      {message.isDeleted && <div className={styles.isDeleted} style={{display: 'flex', alignItems: 'center'}}>
          <Icon style={{ pointerEvents: 'none'}} icon={faBan} />
          <Text><i>This message was deleted</i></Text>
      </div>}
    {edit && <div className={styles.edit} style={{width: '100%'}}>
        <TextArea
        style={{ borderRadius: 8, resize: 'none' }}
        className={styles.text}
        onChange={onChange}
        autoSize
        value={value}
        />
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave} type="primary">Save Changes</Button>
    </div>}
  </div>
      </>)
}

const Threads: FC<any> = (props) => {
  const isMobile = useMedia('(max-width: 575px)');
  const { visible, setVisible, message} = props;
  const [text, setText] = useState('');
  const { threads = {} } = message;
  const [dm, setDm] = useState(false);
  const { oppositeList, auth, to, recipient } = useSelector(({ messages: { oppositeList },
          global, user: {email, username, firstName, lastName,id }}: any) =>
    ({ oppositeList, auth: global.auth, to: id, recipient: { email, username, firstName, lastName, userId: id} }));
  const from = auth && auth.userId;
  const opposite = oppositeList.find((one: any) => one.id === message.id);
  const oppositeId = opposite && opposite.firebaseId;
  const myFirebaseId = message.firebaseId;

  const dispatch = useDispatch();
  const onReply = () => {
    threadMessage({ from, to, oppositeId, myFirebaseId, message: encode(text)})
      .then();
    if (dm) {
      const id = uid();
      createMessage({from,to, message: encode(text), id, me: auth, recipient }, dispatch)
        .then();
    }
    setText('');
    setDm(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      if (text.trim()) {
        onReply();
      }
    }
  }

  const onChange = (e: any) => {
    e.persist();
    const value = e.target.value?.trim() ? e.target.value : '';
    setText(value);
  };

  const onUpdate = (text: string, index: number, myThreadId: string) => {
    const oppositeThreadId = Object.keys(opposite.threads || {})[index];
    editThread(
    { from, to, oppositeId, myFirebaseId, message: encode(text), myThreadId, oppositeThreadId }
    );
  };

  const onDelete = (index: number, myThreadId: string) => {
    const oppositeThreadId = Object.keys(opposite.threads || {})[index];
    deleteThread({from, to, oppositeId, myFirebaseId,myThreadId, oppositeThreadId})
  };

  const length = Object.keys(threads||{}).length;

  useEffect(() => {
    const list = document.getElementById(message.id);
    if(list){
      list.scrollTop = list.scrollHeight;
    }
  }, [length,message.id]);

  return (
    <Drawer
      closable={false}
      className={styles.threadDrawer}
      destroyOnClose={true}
      width={isMobile ? '100vw':400}
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <div className={styles.head}>
        <Text style={{ fontSize: 20, color: '#1d1d1d'}} strong>Threads</Text>
        <Icon hover onClick={() => setVisible(false)} icon={faTimes}/>
      </div>
      <div className={styles.body}>
        <div className={styles.message}>
        <div>
          <Text>{message.encoded ? decode(message.message) : message.message}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <span
            className={styles.time}
            style={{ fontSize: 12, color: '#1d1d1d'}}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
        </div>
       {Object.keys(threads).length > 0 &&
       <div id={message.id} className={styles.threadList}>
          {
            Object.keys(threads).map((each, index) =>
              <MessageAndThread
                key={each}
                setVisible={setVisible}
                message={threads[each]}
                showReply={false}
                onDelete={() => onDelete(index, each)}
                onUpdate={(text: string) => onUpdate(text, index, each)}
                myId={from} />)
          }
        </div>}
      </div>
      <div className={styles.span}>
        <TextArea
          style={{ borderRadius: 8, resize: 'none', marginTop: 16}}
          placeholder="Leave a reply"
          onChange={onChange}
          onKeyDown={handleKeyDown}
          value={text}
          autoSize
          className={styles.text} />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input onClick={() => setDm((v) => !v)} checked={dm} type="checkbox"/>
              <span style={{ marginLeft: 8}}>Also send as Direct Message</span>
            </div>
          <Button onClick={onReply} type="primary" className={styles.btn}>Reply</Button>
          </div>
      </div>
    </Drawer>
  );
}

const SingleMessage: FC<any> = (props) => {
  const { message, myId, recipient } = props;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if(message.to === myId) {
      database.ref(`/chats/${myId}/${message.from}/list/${message.firebaseId}`)
      .update({read:true})
    }
  }, [message, myId]);

  const { oppositeList } = useSelector(({ messages: { oppositeList }}: any) =>
    ({ oppositeList }));
  const opposite = oppositeList.find((one: any) => one.id === message.id);
  const oppositeId = opposite && opposite.firebaseId;
  const onUpdate = (text: string) => {
    editMessage({ message: encode(text), oppositeId, from: myId, to: recipient, myFirebaseId: message.firebaseId})
  }

  const onDelete = () => {
    deleteMessage({ oppositeId, from: myId, to: recipient, myFirebaseId: message.firebaseId})
  }

  return (
    <>
    <MessageAndThread
      onDelete={onDelete}
      onUpdate={onUpdate}
      replies={Object.keys(message.threads || {}).length}
      setVisible={setVisible}
      message={message}
      showReply
      myId={myId} />
      <Threads message={message} visible={visible} setVisible={setVisible}/>
    </>
    )
};

const Message: FC<any> = (props) => {
  const [value, setValue] = useState('');
  const { user,handlePageTitle, to, auth, list, recipient, title} = props;

  const [sendAsEmail, setSendAsEmail] = useState(false);

  const from = auth && auth.userId;
  const { firstName, lastName, email } = user;
  const name = `${firstName} ${lastName}`;

  useEffect(() => {
    const pageTitle = <PageTitle name={name} title={title} page="Chats" />;
    handlePageTitle(pageTitle);
    return () => handlePageTitle('');
  }, [handlePageTitle, name, title]);

  const dispatch = useDispatch();
  useEffect(() => {
    const subscription = getOppositeChats({ otherUser: to, me: from}, dispatch);
    return () => subscription.off();
  }, [from, to, dispatch]);

  useEffect(() => {
    const ref = database.ref(`/chats/${from}/${to}`);
    ref.once('value').then((snapshot) => {
      const val = snapshot.val();
      if (!val) {
        ref.set({ user: recipient})
      }
    });
    return () => ref.off();
  }, [from, to,recipient]);

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
  }, [list.length]);

  const [typing, setTyping] = useState('');

  useEffect(() => {
    const ref = database.ref(`/chats/${from}/${to}/typing`);
      ref.on('value', (snapshot) => {
        const value = snapshot.val();
        setTyping(value);
      });
      return () => ref.off();
  }, [from, to]);

  const onClick = () => {
    if(auth.userId && recipient){
      const id = uid();
      createMessage({from,to, message: encode(value), id, me: auth, recipient }, dispatch)
        .then();
      if (sendAsEmail) {
        sendMail({sender: name, recipient: email, message: value });
        setSendAsEmail(false);
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
      list.map((each: any, index: number) => {
        const previous = index > 0 && list[index-1].createdAt;
        const previousDay = moment(previous).format('DD MMMM YYYY');
        const current = moment(each.createdAt).format('DD MMMM YYYY');
        return (<>
          {previousDay !== current && <div style={{ display: 'flex', justifyContent: 'center'}}>
            <span className={styles.date}>
            {current}
            </span>
          </div>}
          <SingleMessage recipient={to} key={each.id} message={each} myId={from}/>
          </>)
      })
    }
      </div>
    <div style={{ height: 8 }} />
    <div className={styles.span}>
      {typing && <div className={styles.typing}>{typing}</div>}
      <div style={{ display: 'flex'}}>
        <Dropdown
          trigger={['click']}
          overlay={<Emoji
            onClick={(emoji) => setValue((val) => `${val}${emoji.value}`)}/>}>
        <span>
          <Icon hover icon={faSmile}/>
        </span>
        </Dropdown>
    <TextArea
      style={{ borderRadius: 8, resize: 'none'}}
      className={styles.text}
      onKeyDown={handleKeyDown}
      placeholder={`Jot something down for ${recipient.firstName}`}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      autoSize/>
      </div>
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

const ConnectedMessage: FC<any> = (props) => {
  const { recipient: { userId }, loadUserName, match: { params: { username } }  } = props;
  useEffect(() => {
    if (username) {
      loadUserName(username);
    }
  }, [loadUserName, username]);

  return <>{userId && <Message {...props}/>}</>;
}

const mapStateToProps = ({ user: { email, username, firstName, lastName, id }, user, global, messages, resume }: any) =>
  ({to: id, recipient: { email, username, firstName, lastName, userId: id}, user,
  auth: global.auth, list: messages.messageList, title: resume.title});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle }),
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedMessage);