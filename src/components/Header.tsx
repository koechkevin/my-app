import { faFacebookSquare, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {faStream} from '@fortawesome/pro-regular-svg-icons';
import {Col, Layout, Typography } from 'antd';
import React, {FC} from 'react';
import {connect} from 'react-redux';
import { useMedia } from 'react-use';
import {Dispatch} from 'redux';
import constants from '../redux/constants';

import styles from './Header.module.scss';
import Icon from './Icon';

const { Header } = Layout;

interface Props {
  pageTitle: string;
  drawerOpen: boolean;
  handleDrawer: (open: boolean) => void;
}
const PageHeader: FC<Props> = (props) => {
  const { pageTitle, drawerOpen, handleDrawer } = props;
  const isMobile: boolean = useMedia('(max-width: 575px)');
  return (
    <Header className={styles.header}>
      <Col style={{ display: 'flex', alignItems: 'center'}}>
        {isMobile && <Icon
            onClick={() => handleDrawer(!drawerOpen)}
            style={{ marginRight: 16 }}
            hover
            icon={faStream} />}
        {pageTitle}
      </Col>
      {
        !isMobile && (<Col className={styles.icons}>
          <Icon hover color="333" icon={faGithub} />
          <Icon hover color="#2867B2" icon={faLinkedin} />
          <Icon hover color={'#1DA1F2'} icon={faTwitter} />
          <Icon hover color="#4267B2" icon={faFacebookSquare} />
        </Col>)
      }
    </Header>
  )
};

const mapStateToProps = ({ global }: any) => ({
  pageTitle: global.pageTitle,
  drawerOpen: global.drawerOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open}),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
