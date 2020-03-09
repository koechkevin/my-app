import { Layout, Row } from 'antd';
import jwtDecode from 'jwt-decode';
import React, {FC, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import constants from '../redux/constants';
import { UserState } from '../redux/reducers/user';

import styles from './Layout.module.scss';

import { Header, SideBarMenu } from './index';

const { Content } = Layout;

interface Props {
  user: UserState;
  sideBarMenuVisible: boolean;
  authenticate: (payload: any) => void;
}
const PageLayout: FC<Props> = (props) => {
  const {
    children,
    sideBarMenuVisible,
    authenticate,
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

  return (
    <Row style={{ height: '100vh' }}>
      <Layout style={{ height: '100vh' }}>
        <Layout>
          {sideBarMenuVisible && <SideBarMenu />}
          <Content>
            <Layout>
              <Header />
              <Content className={styles.layout} style={{ height: 'calc(100vh - 64px)', overflowY: 'scroll' }}>
                {children}
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </Row>
  );
};

const mapStateToProps = ({ user, global }: any) => ({
  user,
  sideBarMenuVisible: global.sideBarMenuVisible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authenticate: (payload: any) => dispatch({ type: constants.AUTHENTICATE, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
