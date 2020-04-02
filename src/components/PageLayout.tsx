import { Layout, Row } from 'antd';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {database} from '../firebase';
import constants from '../redux/constants';
import { UserState } from '../redux/reducers/user';

import styles from './Layout.module.scss';

import { Header, SideBarMenu } from './index';
import Loader from './Loader';

const { Content } = Layout;

interface Props {
  user: UserState;
  sideBarMenuVisible: boolean;
  auth: any;
  resume: any;
  authenticate: (payload: any) => void;
}
const PageLayout: FC<Props> = (props) => {
  const {
    children,
    sideBarMenuVisible, resume: { fetchingResume },
    authenticate, auth: { authenticated, userId},
  } = props;

  const [authKey, setAuthKey] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setAuthKey(localStorage.getItem(constants.AUTH_KEY_TOKEN) || '');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const decoded: any = jwtDecode(authKey);
      const { data } = decoded;
      if (data && data.email && data.userId && data.username) {
        authenticate({ authenticated: true, ...data });
      } else {
        authenticate({ authenticated: false });
      }
    } catch (error) {
      authenticate({ authenticated: false });
    }
  },[authKey, authenticate]);

  useEffect(() => {
    if (authenticated && userId) {
        database.ref('.info/connected').on('value', (snap) => {
          const value = snap.val() === true ? 'online' : moment().toString();
          database.ref(`/users/${userId}/status`).set(value);
        });
    }
  }, [authenticated, userId]);

  return (
    <Row style={{ height: '100vh' }}>
      <Layout style={{ height: '100vh' }}>
        <Layout>
          {sideBarMenuVisible && <SideBarMenu loading={fetchingResume} />}
          <Content>
            <Layout>
              <Header />
              <Content className={styles.layout} style={{ height: 'calc(100vh - 64px)', overflowY: 'scroll' }}>
                {fetchingResume? <Loader/> :children}
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </Row>
  );
};

const mapStateToProps = ({ user, global, resume }: any) => ({
  user, resume,
  sideBarMenuVisible: global.sideBarMenuVisible,
  auth: global.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authenticate: (payload: any) => dispatch({ type: constants.AUTHENTICATE, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
