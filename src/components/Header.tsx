import {faEllipsisV, faStream} from '@fortawesome/pro-regular-svg-icons';
import {Button, Col, Dropdown, Layout, Menu} from 'antd';
import React, {FC, useEffect} from 'react';
import { connect } from 'react-redux';
import { useMedia } from 'react-use';
import { Dispatch } from 'redux';
import constants from '../redux/constants';
import {fetchResume} from '../redux/effects/resume';
import {SocialLink} from '../redux/reducers/user';

import { Link } from 'react-router-dom';
import Login from '../Pages/Authentication/Login';
import styles from './Header.module.scss';
import Icon from './Icon';
import RequestRegister from './RequestRegister';
import SocialIcons from './SocialIcons';

const { Header } = Layout;

interface Props {
  pageTitle: string;
  drawerOpen: boolean;
  showSocialIcons: boolean;
  username: string;
  auth: any;
  socialLinks: SocialLink[];
  sideBarMenuVisible: boolean;
  handleDrawer: (open: boolean) => void;
  fetchResume: (userId: string) => void;
  openModal: (name: string, title: string) => void;
  closeModal: (name: string, title: string) => void;
}

const PageHeader: FC<Props> = (props) => {
  const {
    pageTitle,
    drawerOpen,
    handleDrawer,
    showSocialIcons,
    fetchResume,
    username,
    sideBarMenuVisible,
    openModal,
    auth,
    } = props;
  const isMobile: boolean = useMedia('(max-width: 575px)');

  useEffect(() => {
    if (username) {
      fetchResume(username);
    }
  }, [fetchResume, username]);

  const  { authenticated } = auth;

  return (
    <Header className={styles.header}>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile && sideBarMenuVisible && (
          <Icon onClick={() => handleDrawer(!drawerOpen)} style={{ marginRight: 16 }} hover icon={faStream} />
        )}
        {pageTitle}
      </Col>
      <RequestRegister />
      <Login />
      <Col style={{ display: 'flex', flexWrap: 'nowrap'}}>
        {!isMobile && showSocialIcons &&  <SocialIcons {...props} />}
        {!authenticated && <Col style={{ display: 'flex', flexWrap: 'nowrap'}}>
          <Button
            onClick={() => openModal('requestRegister', 'Register')}
            style={{ marginRight: 16, borderRadius: 8, background: '#0050c8' }}
            type="primary">Register</Button>
          <Button
            onClick={() => openModal('loginModal', 'Login')}
            style={{ borderRadius: 8, borderColor: '#0050c8', color: '#0050c8' }}>Login</Button>
        </Col>}
        <Col style={{ maxHeight: 32, alignSelf: 'center' }}>
        {
          authenticated && (
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu className={styles.menu}>
                  <Menu.Item>
                    <Link to={`/${auth.username}`}>
                      My Resume
                    </Link>
                  </Menu.Item>
                  <Menu.Item onClick={() => localStorage.clear()}>Logout</Menu.Item>
                </Menu>
              }>
              <span style={{ maxHeight: 32 }}>
              <Icon hover icon={faEllipsisV}/>
              </span>
            </Dropdown>)
        }
        </Col>
      </Col>
    </Header>
  );
};

const mapStateToProps = ({ global, user }: any) => ({
  pageTitle: global.pageTitle,
  drawerOpen: global.drawerOpen,
  showSocialIcons: global.showSocialIcons,
  username: global.username,
  socialLinks: user.socialLinks,
  sideBarMenuVisible: global.sideBarMenuVisible,
  auth: global.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open }),
  fetchResume: (userId: string) => fetchResume(userId, dispatch),
  openModal: (name: string, title: string) => dispatch({ type: constants.HANDLE_MODAL, payload: {
    [name]: {  open: true, title },
    }}),
  closeModal: (name: string, title: string) => dispatch({ type: constants.HANDLE_MODAL, payload: {
      [name]: {  open: false, title },
    }}),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
