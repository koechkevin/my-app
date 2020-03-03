import {Layout, Row} from 'antd';
import React, {FC} from 'react';
import {Header, SideBarMenu} from './index';

const { Content } = Layout;

const PageLayout: FC<any> = (props) => {
  const { children } = props;
  return <Row style={{ height: '100vh'}}>
    <Layout style={{ height: '100vh'}}>
      <Layout>
        <SideBarMenu />
        <Content>
          <Layout>
            <Header />
            <Content style={{ height: 'calc(100vh - 64px)', overflowY: 'scroll'}}>
              {children}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </Row>
};

export default PageLayout;