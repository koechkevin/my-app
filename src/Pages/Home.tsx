import {Col, Row} from 'antd';
import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import constants from '../redux/constants';

import styles from './Home.module.scss';
import ResumeList from './ResumeList';

interface Props {
  handleSidebar: (visible: boolean) => void;
}
const Home: FC<Props> = (props) => {
  const { handleSidebar } = props;

  useEffect(() => {
    handleSidebar(false);
    return () => handleSidebar(true);
  }, [handleSidebar]);

  useEffect(() => {

  }, []);
  return (
    <Row className={styles.home}>
      <Col className={styles.body}>
        <ResumeList />
      </Col>
     <Col className={styles.footer}>
       <p />
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