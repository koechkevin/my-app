import { faPencilAlt } from '@fortawesome/pro-light-svg-icons';
import { Button, Col, Input, notification, Row, Typography } from 'antd';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { Icon, PageTitle } from '../components';
import WhatsAppMe from '../components/Whatsapp';
import constants from '../redux/constants';
import { sendMail } from '../redux/effects/messaging';
import { updateResume } from '../redux/effects/resume';
import Contacts from './Resume/Contacts';

import styles from './Resume.module.scss';

const { Text, Title } = Typography;
const { TextArea } = Input;

const UserLandingPage: FC<any> = (props) => {
  const {
    statusCode,
    showSocialIcons,
    handlePageTitle,
    loadUserName,
    match: {
      params: { username = 'koechkevin' },
    },
    resume: { title, overview, contacts },
    name,
    isEditable,
    auth,
    editResume,
    apiUpdate,
    resume,
    showSideBar,
    user,
  } = props;

  const [hover, setHover] = useState({
    overview: false,
    title: false,
  });

  const [edit, setEdit] = useState({
    overview: false,
    title: false,
  });

  const [email, setEmail] = useState({
    name: '',
    text: '',
  });

  const { username: currentUser, authenticated } = auth;

  const onChange = (e: any) => {
    e.persist();
    editResume({ [e.target.name]: e.target.value });
  };

  const onBlur = (e: any) => {
    e.persist();
    apiUpdate({ resume: { [e.target.name]: resume[e.target.name] } });
    setEdit((s) => ({ ...s, [e.target.name]: false }));
  };

  useEffect(() => {
    showSideBar();
  }, [showSideBar]);

  useEffect(() => {
    showSocialIcons(true);
    return () => showSocialIcons(false);
  }, [showSocialIcons]);

  useEffect(() => {
    const pageTitle = <PageTitle name={name} title={title} />;
    handlePageTitle(pageTitle);
    return () => handlePageTitle('');
  }, [handlePageTitle, name, title]);

  useEffect(() => {
    if (username) {
      loadUserName(username);
    }
  }, [loadUserName, username]);
  if (statusCode === 404) {
    return <Redirect to="/exception/404" />;
  }

  const onEmailChange = (e: any) => {
    e.persist();
    setEmail((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onSendMail = () => {
    sendMail({ sender: email.name, recipient: user.email, message: email.text }).then(() => {
      setEmail({ text: '', name: '' });
      notification.success({
        message: 'Message delivered',
      });
    });
  };

  return (
    <Row style={{ padding: 16 }}>
      <div
        onMouseOver={() => setHover((s) => ({ ...s, title: true }))}
        onMouseLeave={() => setHover((s) => ({ ...s, title: false }))}
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        {!edit.title && (
          <Title style={{ width: '100%' }} level={4}>
            {title}
          </Title>
        )}
        {edit.title && isEditable && (
          <Input value={title} onChange={onChange} onBlur={onBlur} name="title" className={styles.input} />
        )}
        {!edit.title && isEditable && (
          <Icon
            onClick={() => setEdit((s) => ({ ...s, title: true }))}
            hover
            color={hover.title ? '#565656' : 'transparent'}
            icon={faPencilAlt}
          />
        )}
      </div>
      <Text style={{ color: '#1d1d1d' }}>Hello, My Name is</Text>
      <Text style={{ color: '#1d1d1d', marginLeft: 4 }} strong>
        {' '}
        {name}.
      </Text>
      <Title level={4} style={{ width: '100%', fontSize: 16, color: '#1d1d1d' }}>
        Overview
      </Title>
      <div
        onMouseOver={() => setHover((s) => ({ ...s, overview: true }))}
        onMouseLeave={() => setHover((s) => ({ ...s, overview: false }))}
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        {!edit.overview && <Text style={{ whiteSpace: 'pre-wrap'}}>{overview}</Text>}
        {isEditable && !edit.overview && (
          <Icon
            onClick={() => setEdit((s) => ({ ...s, overview: true }))}
            hover
            color={hover.overview ? '#565656' : 'transparent'}
            icon={faPencilAlt}
          />
        )}
        {isEditable && edit.overview && (
          <TextArea
            value={overview}
            style={{ width: '100%' }}
            name="overview"
            onChange={onChange}
            onBlur={onBlur}
            autoSize
            className={styles.input}
          />
        )}
      </div>
      <Row
        style={{
          width: '100%',
          marginTop: 32,
        }}
      >
        <Contacts apiUpdate={apiUpdate} editResume={editResume} isEditable={isEditable} contacts={contacts} />
      </Row>
      <Row
        gutter={16}
        style={{
          width: '100%',
          marginTop: 16,
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Col xs={24} sm={12}>
          <Link to={`/${username}/resume`}>
            <Button
              style={{
                background: 'transparent',
                color: '#0050c8',
                borderColor: '#0050c8',
                width: '100%',
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Text style={{ color: '#0050c8' }} ellipsis>
                  View {name}'s full resume here
                </Text>
              </div>
            </Button>
          </Link>
        </Col>
        <Col xs={24} sm={12}>
          {authenticated && currentUser !== username && (
            <Link to={`/${username}/messages`}>
              <Button
                style={{
                  background: '#0050c8',
                  width: '100%',
                  color: 'white',
                  borderColor: '#0050c8',
                  borderRadius: 8,
                  marginBottom: 16,
                }}
                type="primary"
              >
                Send Direct Message
              </Button>
            </Link>
          )}
          {(!authenticated || currentUser === username) && (
            <Button
              disabled
              style={{
                background: '#0050c8',
                width: '100%',
                color: 'white',
                borderColor: '#0050c8',
                borderRadius: 8,
                opacity: 0.5,
                marginBottom: 16,
              }}
              type="primary"
            >
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {!authenticated ? `Login to send a message to ${name}` : 'Cannot send a direct message to yourself'}
              </div>
            </Button>
          )}
        </Col>
      </Row>
      {!auth.authenticated && user.email && (
        <Row style={{ width: '100%', marginBottom: 32 }}>
          <Text strong>{`Need help from me and don't want to login? leave a message below`}</Text>
          <Input
            onChange={onEmailChange}
            name="name"
            value={email.name}
            className={styles.input}
            placeholder="Who are you?"
          />
          <Input.TextArea
            onChange={onEmailChange}
            name="text"
            value={email.text}
            placeholder="Type a message"
            style={{ marginTop: 8 }}
            className={styles.input}
          />
          <div style={{ width: '100%' }}>
            <Button
              onClick={onSendMail}
              disabled={!email.name || !email.text}
              style={{
                background: '#0050c8',
                color: 'white',
                borderColor: '#0050c8',
                float: 'right',
                borderRadius: 8,
                marginTop: 8,
                opacity: !email.name || !email.text ? 0.6 : '',
              }}
              type="primary"
            >
              Send
            </Button>
          </div>
        </Row>
      )}
      {username === 'koechkevin' && auth.username !== 'koechkevin' ? <WhatsAppMe /> : null}
    </Row>
  );
};

const mapStateToProps = ({ global, resume, user }: any) => ({
  statusCode: global.statusCode,
  name: `${user.firstName} ${user.lastName}`,
  resume,
  username: global.username,
  isEditable: global.isEditable,
  auth: global.auth,
  user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle }),
  loadUserName: (username: string) => dispatch({ type: constants.LOAD_USER_NAME, payload: username }),
  setIsEditable: (isEditable: boolean) => dispatch({ type: constants.HANDLE_IS_EDITABLE, payload: isEditable }),
  showSocialIcons: (isVisible: boolean) => dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: isVisible }),
  editResume: (data: any) => dispatch({ type: constants.EDIT_RESUME, payload: data }),
  apiUpdate: (data: any) => updateResume(data, dispatch),
  showSideBar: () => dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: true }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLandingPage);
