import {faPencilAlt} from '@fortawesome/pro-light-svg-icons';
import { Avatar, Drawer, Layout, Menu, Row, Typography } from 'antd';
import React, {FC, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMedia } from 'react-use';
import { Dispatch } from 'redux';
import constants from '../redux/constants';
import {updateUser} from '../redux/effects/authentication';
import {fetchResume} from '../redux/effects/resume';
import { UserState } from '../redux/reducers/user';
import Icon from './Icon';
import QuickLinks from './QuickLinks';
import styles from './SideMenu.module.scss';

const { Text } = Typography;

const { Sider } = Layout;

const { Item } = Menu;

interface Props {
  drawerOpen: boolean;
  user: UserState;
  username: string;
  isEditable: boolean;
  handleDrawer: (open: boolean) => void;
  fetchResume: (userId: string) => void;
  editUser: (data: any) => void;
}

const ChildrenSideBar: FC<Props> = (props) => {
  const {
    user: { quickLinks, firstName, lastName, avatarColor }, username, isEditable, editUser,
  } = props;

  const [name, setName] = useState('');

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
        <Avatar
          style={{ fontSize: 75, fontWeight: 'bold', background: avatarColor }}
          size={160} className={styles.avatar}>
          {firstName.split('')[0]}{lastName.split('')[0]}
        </Avatar>
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
          <Link to={username ? `/${username}/resume` : 'resume'}>
            <Text style={{ color: '#ffffff' }}>Resume</Text>
          </Link>
        </Item>
      </Menu>

      <Row className={styles.bordered} />

      <QuickLinks quickLinks={quickLinks} />
    </Row>
  );
};

const SideBarMenu: FC<Props> = (props) => {
  const { drawerOpen, handleDrawer } = props;
  const isMobile: boolean = useMedia('(max-width:575px)');
  return (
    <>
      {!isMobile && (
        <Sider style={{ overflowY: 'scroll', height: '100vh', padding: 0 }}>
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

const mapStateToProps = ({ global, user }: any) => ({
  pageTitle: global.pageTitle,
  drawerOpen: global.drawerOpen,
  username: global.username,
  isEditable: global.isEditable,
  user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open }),
  fetchResume: (userId: string) => fetchResume(userId, dispatch),
  editUser: (data: any) => updateUser(data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMenu);
