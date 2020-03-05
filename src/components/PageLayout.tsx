import { Layout, Row } from 'antd';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserState } from '../redux/reducers/user';

import { Header, SideBarMenu } from './index';

const { Content } = Layout;

interface Props {
  user: UserState;
  sideBarMenuVisible: boolean;
}
const PageLayout: FC<Props> = (props) => {
  const {
    children,
    sideBarMenuVisible,
  } = props;
  return (
    <Row style={{ height: '100vh' }}>
      <Layout style={{ height: '100vh' }}>
        <Layout>
          {sideBarMenuVisible && <SideBarMenu />}
          <Content>
            <Layout>
              <Header />
              <Content style={{ height: 'calc(100vh - 64px)', overflowY: 'scroll' }}>{children}</Content>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
