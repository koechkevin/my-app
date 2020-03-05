import { Row } from 'antd';
import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Dispatch} from 'redux';
import constants from '../redux/constants';

const UserLandingPage: FC<any> = (props) => {

  const {
    statusCode, showSocialIcons, loadUserName, match: { params: { username }} } = props;

  useEffect(() => {
    showSocialIcons(true);
    return () => showSocialIcons(false);
  }, [showSocialIcons]);

  useEffect(() => {
    if (username) {
      loadUserName(username);
    }
  }, [loadUserName, username]);

  if (statusCode === 404) {
    return <Redirect to="/exception/404" />
  }
  return (<Row>My Custom Page</Row>)
};

const mapStateToProps = ({global }: any) => ({
  statusCode: global.statusCode,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username}),
  showSocialIcons: (isVisible: boolean) => dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: isVisible }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLandingPage);
