import { Avatar, Drawer, Layout, Menu, Row, Typography } from 'antd';
import React, {FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMedia } from 'react-use';
import { Dispatch } from 'redux';
import constants from '../redux/constants';
import {fetchResume} from '../redux/effects/resume';
import { UserState } from '../redux/reducers/user';
import QuickLinks from './QuickLinks';
import styles from './SideMenu.module.scss';

const { Text } = Typography;

const { Sider } = Layout;

const { Item } = Menu;

interface Props {
  drawerOpen: boolean;
  user: UserState;
  username: string;
  handleDrawer: (open: boolean) => void;
  fetchResume: (userId: string) => void;
}

const ChildrenSideBar: FC<Props> = (props) => {
  const {
    user: { quickLinks, firstName, lastName, avatarColor }, username,
  } = props;

  return (
    <Row>
      <Row className={styles.row}>
        <Avatar style={{ fontSize: 75, fontWeight: 'bold', background: avatarColor }}
                size={160} className={styles.avatar}>
          {firstName.split('')[0]}{lastName.split('')[0]}
        </Avatar>
        <Text className={styles.text}>{`${firstName} ${lastName}`}</Text>
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
  user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open }),
  fetchResume: (userId: string) => fetchResume(userId, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMenu);
