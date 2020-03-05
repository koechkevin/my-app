import { faStream } from '@fortawesome/pro-regular-svg-icons';
import { Button, Col, Layout } from 'antd';
import React, {FC, useEffect} from 'react';
import { connect } from 'react-redux';
import { useMedia } from 'react-use';
import { Dispatch } from 'redux';
import constants from '../redux/constants';
import {fetchResume} from '../redux/effects/resume';
import {SocialLink} from '../redux/reducers/user';

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
  socialLinks: SocialLink[];
  sideBarMenuVisible: boolean;
  handleDrawer: (open: boolean) => void;
  fetchResume: (userId: string) => void;
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
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
    } = props;
  const isMobile: boolean = useMedia('(max-width: 575px)');

  useEffect(() => {
    if (username) {
      fetchResume(username);
    }
  }, [fetchResume, username]);
  return (
    <Header className={styles.header}>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile && sideBarMenuVisible && (
          <Icon onClick={() => handleDrawer(!drawerOpen)} style={{ marginRight: 16 }} hover icon={faStream} />
        )}
        {pageTitle}
      </Col>
      <RequestRegister />
      <Col style={{ display: 'flex', flexWrap: 'nowrap'}}>
        {!isMobile && showSocialIcons &&  <SocialIcons {...props} />}
        <Col style={{ display: 'flex', flexWrap: 'nowrap'}}>
          <Button onClick={() => openModal('requestRegister')} style={{ marginRight: 16, borderRadius: 8, background: '#0050c8' }} type="primary">Register</Button>
          <Button style={{ borderRadius: 8, borderColor: '#0050c8', color: '#0050c8' }}>Login</Button>
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open }),
  fetchResume: (userId: string) => fetchResume(userId, dispatch),
  openModal: (name: string) => dispatch({ type: constants.HANDLE_MODAL, payload: {
    [name]: {  open: true },
    }}),
  closeModal: (name: string) => dispatch({ type: constants.HANDLE_MODAL, payload: {
      [name]: {  open: false },
    }}),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
