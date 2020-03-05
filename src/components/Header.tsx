import { faFacebookSquare, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStream } from '@fortawesome/pro-regular-svg-icons';
import { Col, Layout } from 'antd';
import React, {FC, useEffect} from 'react';
import { connect } from 'react-redux';
import { useMedia } from 'react-use';
import { Dispatch } from 'redux';
import constants from '../redux/constants';
import {fetchResume} from '../redux/effects/resume';

import styles from './Header.module.scss';
import Icon from './Icon';

const { Header } = Layout;

interface Props {
  pageTitle: string;
  drawerOpen: boolean;
  showSocialIcons: boolean;
  username: string;
  handleDrawer: (open: boolean) => void;
  fetchResume: (userId: string) => void;
}

const SocialIcons: FC<any> = () => {
  return (<Col className={styles.icons}>
    <Icon hover color="333" icon={faGithub} />
    <Icon hover color="#2867B2" icon={faLinkedin} />
    <Icon hover color={'#1DA1F2'} icon={faTwitter} />
    <Icon hover color="#4267B2" icon={faFacebookSquare} />
  </Col>);
};
const PageHeader: FC<Props> = (props) => {
  const { pageTitle, drawerOpen, handleDrawer, showSocialIcons, fetchResume, username } = props;
  const isMobile: boolean = useMedia('(max-width: 575px)');

  useEffect(() => {
    if (username) {
      fetchResume(username);
    }
  }, [fetchResume, username]);
  return (
    <Header className={styles.header}>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile && (
          <Icon onClick={() => handleDrawer(!drawerOpen)} style={{ marginRight: 16 }} hover icon={faStream} />
        )}
        {pageTitle}
      </Col>
      {!isMobile && showSocialIcons &&  <SocialIcons />}
    </Header>
  );
};

const mapStateToProps = ({ global }: any) => ({
  pageTitle: global.pageTitle,
  drawerOpen: global.drawerOpen,
  showSocialIcons: global.showSocialIcons,
  username: global.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open }),
  fetchResume: (userId: string) => fetchResume(userId, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
