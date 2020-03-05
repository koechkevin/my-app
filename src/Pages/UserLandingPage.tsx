import { Row } from 'antd';
import React, {FC, ReactNode, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Dispatch} from 'redux';
import {usePageTitle} from '../components';
import constants from '../redux/constants';

const UserLandingPage: FC<any> = (props) => {

  const {
    statusCode, showSocialIcons, handlePageTitle, loadUserName, match: { params: { username }},
    resume: { title }, name,
  } = props;

  useEffect(() => {
    showSocialIcons(true);
    return () => showSocialIcons(false);
  }, [showSocialIcons]);

  const pageTitle = usePageTitle({ name, title });

  useEffect(() => {
    handlePageTitle(pageTitle);
    return () => handlePageTitle('');
  }, [handlePageTitle, pageTitle]);

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

const mapStateToProps = ({global, resume, user }: any) => ({
  statusCode: global.statusCode,
  name: `${user.firstName} ${user.lastName}`,
  resume,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle }),
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username}),
  showSocialIcons: (isVisible: boolean) => dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: isVisible }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLandingPage);
