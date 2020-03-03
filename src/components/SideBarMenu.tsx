import {Avatar, Col, Drawer, Layout, Menu, Row, Typography} from 'antd';
import React, {FC, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {useMedia} from 'react-use';
import {Dispatch} from 'redux';
import constants from '../redux/constants';
import styles from './SideMenu.module.scss';

const { Text } = Typography;

const { Sider } = Layout;

const { Item } = Menu;

const ChildrenSideBar: FC<any> = () => {
  return (
    <Row>
      <Row className={styles.row}>
        <Avatar
          style={{ fontSize: 75, fontWeight: 'bold'}}
          size={160}
          className={styles.avatar}
        >KK</Avatar>
        <Text className={styles.text}>Kevin Koech</Text>
      </Row>

      <Row className={styles.bordered}/>

      <Row className={styles.projects}>
        <Col>
          <Text
            style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.54)', padding: 16 }}
          >Software Projects</Text>
        </Col>
        <Menu theme="dark" className={styles.menu} style={{ width: '100%'}}>
          <Item style={{ margin: 0, height:32}}>
            <Text style={{ color: '#ffffff'}}>
            Aurora App Candidate
            </Text>
          </Item>
          <Item style={{ margin: 0, height:32}}>
            <Text style={{ color: '#ffffff'}}>
              Aurora App Company
            </Text>
          </Item>
          <Item style={{ margin: 0, height:32}}>
            <Text ellipsis style={{ color: '#ffffff'}}>
              Aurora React Library Components
            </Text>
          </Item>
          <Item style={{ margin: 0, height:32}}>
            <Text style={{ color: '#ffffff'}}>
              Task Tracker
            </Text>
          </Item>
          <Item style={{ margin: 0, height:32}}>
            <Text style={{ color: '#ffffff'}}>
              Travela
            </Text>
          </Item>

          <Item style={{ margin: 0, height:32}}>
            <Text style={{ color: '#ffffff'}}>
              E Support Automation System
            </Text>
          </Item>
        </Menu>
      </Row>
      <Row className={styles.bordered}/>

        <Menu theme="dark" className={styles.menu} style={{ width: '100%'}}>
          <Item style={{ margin: 0, height:32}}>
            <Link to="/resume">
              <Text style={{ color: '#ffffff'}}>
                Resume
              </Text>
            </Link>
          </Item>
        </Menu>

    </Row>
  );
};

interface Props {
  drawerOpen: boolean;
  handleDrawer: (open: boolean) => void;
}

const SideBarMenu: FC<Props> = (props) => {
  const { drawerOpen, handleDrawer } = props;
  const isMobile: boolean = useMedia('(max-width:575px)');
  return (
    <>
      {!isMobile &&  <Sider style={{ overflowY: 'scroll', height: '100vh', padding: 0 }}>
        <ChildrenSideBar />
      </Sider>}
    {isMobile &&
    <Drawer
        style={{ overflowY: 'scroll', height: '100vh'}}
        width="calc(100vw - 64px)"
        className={styles.drawer}
        closable={false}
        placement="left"
        onClose={() => handleDrawer(false)}
        visible={drawerOpen}>
      <ChildrenSideBar/>
    </Drawer>}
  </>
  )
};

const mapStateToProps = ({ global }: any) => ({
  pageTitle: global.pageTitle,
  drawerOpen: global.drawerOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleDrawer: (open: boolean) => dispatch({ type: constants.HANDLE_DRAWER, payload: open}),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMenu);
