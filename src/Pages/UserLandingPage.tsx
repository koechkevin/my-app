import {faPencilAlt} from '@fortawesome/pro-light-svg-icons';
import {Button, Input, Row, Typography, Col} from 'antd';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import {Dispatch} from 'redux';
import {Icon, PageTitle} from '../components';
import constants from '../redux/constants';
import {updateResume} from '../redux/effects/resume';
import Contacts from './Resume/Contacts';

import styles from './Resume.module.scss';

const { Text, Title } = Typography;
const { TextArea } = Input;

const UserLandingPage: FC<any> = (props) => {

  const {
    statusCode, showSocialIcons, handlePageTitle, loadUserName, match: { params: { username }},
    resume: { title, overview, contacts }, name, isEditable, setIsEditable, auth, editResume,
    apiUpdate, resume, showSideBar,
  } = props;

  const [hover, setHover] = useState({
    overview: false, title: false,
  });

  const [edit, setEdit] = useState({
    overview: false, title: false,
  });

  const { username: currentUser } = auth;

  const onChange = (e: any) => {
    e.persist();
    editResume({ [e.target.name]: e.target.value})
  }

  const onBlur = (e: any) => {
    e.persist();
    apiUpdate({resume: { [e.target.name]: resume[e.target.name]}});
    setEdit((s) => ({...s, [e.target.name]: false}))
  };

  useEffect(() => {
    setIsEditable(currentUser === username);
    return () => setIsEditable(false);
  }, [setIsEditable,username, currentUser]);

  useEffect(() => {
    showSideBar()
  }, [showSideBar]);

  useEffect(() => {
    showSocialIcons(true);
    return () => showSocialIcons(false);
  }, [showSocialIcons]);

  useEffect(() => {
    const pageTitle = <PageTitle name={name} title={title}/>
    handlePageTitle(pageTitle);
    return () => handlePageTitle('');
  }, [handlePageTitle, name, title]);

  useEffect(() => {
    if (username) {
      loadUserName(username);
    }
  }, [loadUserName, username]);
  if (statusCode === 404) {
    return <Redirect to="/exception/404" />
  }

  return (
    <Row style={{ padding: 16 }}>
      <div
        onMouseOver={() => setHover((s) => ({...s, title: true}))}
        onMouseLeave={() => setHover((s) => ({...s, title: false}))}
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
      {!edit.title && <Title style={{ width: '100%' }} level={4}>{title}</Title>}
      {edit.title && isEditable &&
      <Input
          value={title}
          onChange={onChange}
          onBlur={onBlur}
          name="title"
          className={styles.input} />}
        {!edit.title && isEditable &&
        <Icon
            onClick={() => setEdit((s) => ({...s, title: true}))}
            hover
            color={hover.title ? '#565656' : 'transparent'}
            icon={faPencilAlt}/>}
      </div>
      <Text style={{ color: '#1d1d1d'}}>Hello, My Name is</Text>
      <Text style={{ color: '#1d1d1d', marginLeft: 4}} strong> {name}.</Text>
      <Title level={4} style={{ width: '100%', fontSize: 16, color: '#1d1d1d'}} >Overview</Title>
      <div
      onMouseOver={() => setHover((s) => ({...s, overview: true}))}
      onMouseLeave={() => setHover((s) => ({...s, overview: false}))}
      style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        {!edit.overview && <Text>{overview}</Text>}
        {isEditable && !edit.overview &&
        <Icon
          onClick={() => setEdit((s) => ({...s, overview: true}))}
            hover
            color={hover.overview ? '#565656' : 'transparent'}
            icon={faPencilAlt}/>}
        {isEditable && edit.overview &&
        <TextArea
          value={overview}
          style={{ width: '100%'}}
          name="overview"
          onChange={onChange}
          onBlur={onBlur}
          autoSize
          className={styles.input}
        />}
      </div>
      <Row
        style={{
          width: '100%',
          marginTop: 32,
        }}>
        <Contacts
          apiUpdate={apiUpdate}
          editResume={editResume}
          isEditable={isEditable}
          contacts={contacts} />
      </Row>
      <Row gutter={16} style={{
        width: '100%',
        marginTop: 16,
        marginBottom: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <Col xs={24} sm={12}>
        <Link to={`/${username}/resume`}>
          <Button
            style={{
              background:'transparent',
              color: '#0050c8',
              borderColor: '#0050c8',
              width: '100%',
              borderRadius: 8,
              marginBottom: 16,
            }}
          >View {name}'s full resume here</Button>
        </Link>
        </Col>
        <Col xs={24} sm={12}>
          <Link to={`/${username}/messages`}>
      <Button
        style={{
          background:'#0050c8',
          width: '100%',
          color: 'white',
          borderColor: '#0050c8',
          borderRadius: 8,
          marginBottom: 16,
        }}
        type="primary">Send Direct Message</Button>
          </Link>
        </Col>
      </Row>
  </Row>
  )
};

const mapStateToProps = ({global, resume, user }: any) => ({
  statusCode: global.statusCode,
  name: `${user.firstName} ${user.lastName}`,
  resume,
  username: global.username,
  isEditable: global.isEditable,
  auth: global.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle }),
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username}),
  setIsEditable: (isEditable: boolean) => dispatch({ type: constants.HANDLE_IS_EDITABLE, payload: isEditable}),
  showSocialIcons: (isVisible: boolean) => dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: isVisible }),
  editResume: (data: any) => dispatch({ type: constants.EDIT_RESUME, payload: data}),
  apiUpdate: (data: any) => updateResume(data, dispatch),
  showSideBar: () => dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: true}),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLandingPage);
