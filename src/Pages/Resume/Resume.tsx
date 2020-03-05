import { Row } from 'antd';
import React, { FC, ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Loading, usePageTitle } from '../../components';
import constants from '../../redux/constants';
import { Resume } from '../../redux/reducers/resume';
import Achievements from './Achievements';
import Education from './Education';
import Overview from './Overview';
import Referees from './Referees';
import Skills from './Skills';
import WorkExperience from './WorkExperience';

interface ResumeProps extends RouteComponentProps<{username: string}>{
  handlePageTitle: (pageTitle: string | ReactNode) => void;
  showSocialIcons: (isVisible: boolean) => void;
  resume: Resume;
  name: string;
  loading: boolean;
  statusCode: number;
  loadUserName: (username: string) => void;
}

const ResumeComponent: FC<ResumeProps> = (props) => {
  const { handlePageTitle, name,
    statusCode, resume, loading, showSocialIcons, loadUserName, match: { params: { username }} } = props;

  const { overview, skills, work, title, achievements, education, referees } = resume;

  const pageTitle = usePageTitle({ name, title, page: 'Resume' });

  useEffect(() => {
    if (username) {
      loadUserName(username);
    }
  }, [loadUserName, username]);

  useEffect(() => {
    handlePageTitle(pageTitle);
    return () => handlePageTitle('');
  }, [handlePageTitle, pageTitle]);

  useEffect(() => {
    showSocialIcons(true);
    return () => showSocialIcons(false);
  }, [showSocialIcons]);

  if (loading) {
    return <Loading />
  }

  if (statusCode === 404) {
    return <Redirect to="/exception/404" />
  }

  return (
    <Row>
      <Overview description={overview} title={title} />
      <Skills skills={skills} />
      <Education educationList={education} />
      <WorkExperience work={work} />
      <Achievements achievements={achievements} />
      <Referees referees={referees} />
    </Row>
  );
};

const mapStateToProps = ({ resume, global, user }: any) => ({
  resume,
  loading: resume.fetchingResume,
  statusCode: global.statusCode,
  name: `${user.firstName} ${user.lastName}`,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle }),
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username}),
  showSocialIcons: (isVisible: boolean) => dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: isVisible }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeComponent);
