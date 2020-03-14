import {Col, Row} from 'antd';
import React, {FC, useEffect } from 'react';
import {connect, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import constants from '../redux/constants';

import { Redirect } from 'react-router-dom';
import styles from './Home.module.scss';
import ResumeList from './ResumeList';

interface Props {
  handleSidebar: (visible: boolean) => void;
}
const Home: FC<Props> = (props) => {
  const { handleSidebar } = props;

  const { auth: { username } } = useSelector(({ global }: any)=>({
    auth: global.auth,
  }));

  useEffect(() => {
    handleSidebar(false);
    return () => handleSidebar(true);
  }, [handleSidebar]);

  if(username) {
    return <Redirect to={`/${username}`} />
  }

  return (
    <Row className={styles.home}>
      <Col className={styles.body}>
        <ResumeList />
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ global }: any) => ({
  sideBarMenuVisible: global.sideBarMenuVisible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSidebar: (visible: boolean ) => dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: visible }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);