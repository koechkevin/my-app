import { Row } from 'antd';
import React, { FC, ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Loading, PageTitle } from '../../components';
import WhatsAppMe from '../../components/Whatsapp';
import constants from '../../redux/constants';
import { updateResume } from '../../redux/effects/resume';
import { Resume } from '../../redux/reducers/resume';
import Achievements from './Achievements';
import Education from './Education';
import Overview from './Overview';
import Referees from './Referees';
import Skills from './Skills';
import WorkExperience from './WorkExperience';

interface ResumeProps extends RouteComponentProps<{ username: string }> {
  handlePageTitle: (pageTitle: string | ReactNode) => void;
  showSocialIcons: (isVisible: boolean) => void;
  resume: Resume;
  name: string;
  loading: boolean;
  statusCode: number;
  loadUserName: (username: string) => void;
  setIsEditable: (isEditable: boolean) => void;
  auth: any;
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: (data: any) => void;
}

const ResumeComponent: FC<ResumeProps> = (props) => {
  const {
    handlePageTitle,
    name,
    setIsEditable,
    auth,
    isEditable,
    editResume,
    apiUpdate,
    statusCode,
    resume,
    loading,
    showSocialIcons,
    loadUserName,
    match: {
      params: { username },
    },
  } = props;

  const { skills, work, title, achievements, education, referees, overview } = resume;
  const { username: currentUser } = auth;

  useEffect(() => {
    if (username) {
      loadUserName(username);
    }
  }, [loadUserName, username]);

  useEffect(() => {
    setIsEditable(currentUser === username);
    return () => setIsEditable(false);
  }, [setIsEditable, username, currentUser]);

  useEffect(() => {
    const pageTitle = <PageTitle name={name} title={title} page={'Resume'} />;
    handlePageTitle(pageTitle);
    return () => handlePageTitle('');
  }, [handlePageTitle, name, title]);

  useEffect(() => {
    showSocialIcons(true);
    return () => showSocialIcons(false);
  }, [showSocialIcons]);

  if (loading) {
    return <Loading />;
  }

  if (statusCode === 404) {
    return <Redirect to="/exception/404" />;
  }

  return (
    <Row>
      <Overview
        apiUpdate={apiUpdate}
        editResume={editResume}
        isEditable={isEditable}
        description={overview}
        title={title}
      />
      <Skills apiUpdate={apiUpdate} editResume={editResume} isEditable={isEditable} skills={skills} />
      <Education apiUpdate={apiUpdate} editResume={editResume} isEditable={isEditable} educationList={education} />
      <WorkExperience apiUpdate={apiUpdate} editResume={editResume} isEditable={isEditable} work={work} />
      <Achievements apiUpdate={apiUpdate} editResume={editResume} isEditable={isEditable} achievements={achievements} />
      <Referees referees={referees} apiUpdate={apiUpdate} editResume={editResume} isEditable={isEditable} />
      {username === 'koechkevin' && auth.username !== 'koechkevin' ? <WhatsAppMe /> : null}
    </Row>
  );
};

const mapStateToProps = ({ resume, global, user }: any) => ({
  resume,
  loading: resume.fetchingResume,
  statusCode: global.statusCode,
  name: `${user.firstName} ${user.lastName}`,
  auth: global.auth,
  isEditable: global.isEditable,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle }),
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username }),
  showSocialIcons: (isVisible: boolean) => dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: isVisible }),
  setIsEditable: (isEditable: boolean) => dispatch({ type: constants.HANDLE_IS_EDITABLE, payload: isEditable }),
  editResume: (data: any) => dispatch({ type: constants.EDIT_RESUME, payload: data }),
  apiUpdate: (data: any) => updateResume(data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeComponent);
