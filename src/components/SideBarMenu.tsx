import {faPencilAlt} from '@fortawesome/pro-light-svg-icons';
import { Avatar, Drawer, Layout, Menu, Row, Skeleton, Typography } from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useMedia } from 'react-use';
import { Dispatch } from 'redux';
import ChatList from '../Pages/Messages/ChatList';
import constants from '../redux/constants';
import {updateUser} from '../redux/effects/authentication';
import {getChats, getMessages} from '../redux/effects/messaging';
import {fetchResume, uploadAvatar} from '../redux/effects/resume';
import { UserState } from '../redux/reducers/user';
import Icon from './Icon';
import Loader from './Loader';
import QuickLinks from './QuickLinks';
import styles from './SideMenu.module.scss';
import Uploader from './Uploader';

const { Text } = Typography;

const { Sider } = Layout;

const { Item } = Menu;

interface Props {
  drawerOpen: boolean;
  user: UserState;
  username: string;
  isEditable: boolean;
  uploadProgress: number;
  handleDrawer: (open: boolean) => void;
  fetchResume: (userId: string) => void;
  editUser: (data: any) => void;
  fetchMessages: (data: any) => void;
  setIsEditable: (value: boolean) => void;
  loading: boolean;
  uploadAction: (path: string, errorMessage: (message: string) => void) => void;
}

const ChildrenSideBar: FC<Props> = (props) => {
  const {
    user: { quickLinks, firstName, lastName, avatarColor, avatarUrl },
    username, isEditable, editUser, uploadAction, uploadProgress, setIsEditable,
  } = props;

  const [name, setName] = useState('');
  const [hover, setHover] = useState({
    avatar: false,
  });

  const redux = useSelector(({ user: { email, username, firstName, lastName, id }, global, messages }: any) => ({
    to: id, recipient: { email, username, firstName, lastName, userId: id},
    auth: global.auth, list: messages.messageList,
  }));

  const {  auth: { userId, authenticated, username: currentUser } } = redux;

  useEffect(() => {
    setIsEditable(authenticated && (currentUser === username));
    return () => setIsEditable(false);
  }, [setIsEditable,username, currentUser, authenticated]);

  const dispatch = useDispatch();

  useEffect(() => {
    const ref = getChats({ currentUser: userId }, dispatch);
    return () => ref.off();
  }, [userId, dispatch]);

  useEffect(() => {
    setName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const [edit, setEdit] = useState({
    name: false,
  });

  const onBlur = () => {
    setEdit((s) => ({...s, name: false}));
    const [firstName, ...restNames] = name.split(' ');
    const lastName = restNames.join(' ');
    editUser({ firstName, lastName });
  };

  return (
    <Row>
      <Row className={styles.row}>
        <span
          onMouseLeave={() => setHover((s) => ({...s, avatar: false}))}
          style={{ position: 'relative'}}
          onMouseOver={() => setHover((s) => ({...s, avatar: true}))}>
          {isEditable && <Uploader action={uploadAction} color={hover.avatar ? '' : 'transparent'}/>}
        <Avatar
          style={{
            fontSize: uploadProgress ? 12 : 75,
            fontWeight: 'bold',
            background: uploadProgress ? 'white' :avatarColor,
            position: 'relative',
            opacity: hover.avatar && isEditable ? 0.8 : '',
          }}
          src={avatarUrl}
          size={160} className={styles.avatar}>
          {firstName.split('')[0]}
          {uploadProgress > 0 && <span style={{ color: '#1d1d1d'}}>{uploadProgress}%</span>}
          {lastName.split('')[0]}
        </Avatar>
        </span>
        <div
          style={{ justifyContent: isEditable ? 'space-between' : 'space-around'}}
          className={styles.name}>
          {!edit.name && <Text ellipsis>{`${firstName} ${lastName}`}</Text>}
          {edit.name &&
          <input
              onBlur={onBlur}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              autoFocus
              type="text"/>}
          {isEditable && !edit.name &&
          <Icon
              style={{ cursor: 'pointer'}}
              onClick={() => setEdit((s) => ({...s, name: true}))}
              color="white"
              icon={faPencilAlt} />}
        </div>
      </Row>
      <Row className={styles.bordered} />

      <Menu theme="dark" className={styles.menu} style={{ width: '100%' }}>
        <Item style={{ margin: 0, height: 32 }}>
          <Link to={username ? `/${username}` : 'resume'}>
            <Text style={{ color: '#ffffff' }}>Overview</Text>
          </Link>
        </Item>
        <Item style={{ margin: 0, height: 32 }}>
          <Link to={username ? `/${username}/resume` : 'resume'}>
            <Text style={{ color: '#ffffff' }}>Resume</Text>
          </Link>
        </Item>
        <Item style={{ margin: 0, height: 32 }}>
          <Link to={username ? `/${username}/messages` : 'messages'}>
            <Text style={{ color: '#ffffff' }}>Direct Message</Text>
          </Link>
        </Item>
      </Menu>
      {quickLinks.length && <Row className={styles.bordered} />}
      <QuickLinks quickLinks={quickLinks} />
      <Row className={styles.bordered} />
      {authenticated && <ChatList/>}
    </Row>
  );
};

const SideBarMenu: FC<Props> = (props) => {
  const { drawerOpen, handleDrawer } = props;
  const isMobile: boolean = useMedia('(max-width:575px)');
  return (
    <>
      {!isMobile && (
        <Sider className={styles.noScrollBar} style={{ overflowY: 'scroll', height: '100vh', padding: 0 }}>
          <ChildrenSideBar {...props} />
        </Sider>
      )}
      {isMobile && (
        <Drawer
          style={{ overflowY: 'scroll', height: '100vh' }}
          width={200}
          className={styles.drawer}
          closable={false}
          placement="left"
          onClose={() => handleDrawer(false)}
          visible={drawerOpen}
        >
          <ChildrenSideBar {...props} />
        </Drawer>
      )}
    </>
  );
};

const mapStateToProps = ({ global, user, common }: any) => ({
  pageTitle: global.pageTitle,
  drawerOpen: global.drawerOpen,
  username: global.username,
  isEditable: global.isEditable,
  uploadProgress: common.uploadPercent,
  user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open }),
  fetchResume: (userId: string) => fetchResume(userId, dispatch),
  editUser: (data: any) => updateUser(data, dispatch),
  fetchMessages: (data: any)=> getMessages(data, dispatch),
  setIsEditable: (isEditable: boolean) => dispatch({ type: constants.HANDLE_IS_EDITABLE, payload: isEditable}),
  uploadAction: (file: any, callback: (message: string) => void) => uploadAvatar(file, callback, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMenu);
