import { Button, Col, Row, Typography } from 'antd';
import React, { FC, useEffect } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import constants from '../redux/constants';
import styles from './exceptions.module.scss';

const { Title, Text } = Typography;

interface Props {
  hideSideBar: () => void;
  resetStatusCode: () => void;
}
const Exception404: FC<Props> = (props) => {
  const { hideSideBar, resetStatusCode } = props;
  const url = `${process.env.PUBLIC_URL}/not.png`;

  useEffect(() => {
    hideSideBar();
  }, [hideSideBar]);

  useEffect(() => resetStatusCode , [])
  return (
    <Row className={styles.exception} style={{ height: '100%' }}>
      <Col>
        <img alt="background" width={280} height={320} src={url} />
        <Title style={{ textAlign: 'center' }}>404</Title>
        <Col>
          <Text>Sorry, the page you visited does not exist.</Text>
        </Col>
        <Col style={{ textAlign: 'center' }}>
          <Link to="/">
          <Button style={{ background: '#0050c8', marginTop: 8 }} type="primary">
            Back to Home
          </Button>
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideSideBar: () => dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: false}),
  resetStatusCode: () => dispatch({ type: constants.LOAD_STATUS_CODE, payload: 200}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Exception404);
