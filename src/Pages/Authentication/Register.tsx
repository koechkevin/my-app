import { Button, Input, Row, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import styles from '../../components/Modal.module.scss';
import constants from '../../redux/constants';
import { register, validateUsername } from '../../redux/effects/authentication';

interface Props extends RouteComponentProps {
  hideSideBar: () => void;
  openModal: () => void;
  visible: boolean;
  action: (data: any, search: string) => void;
  loading: boolean;
  errors: any[];
  resetErrors: () => void;
  validate: (username: string) => void;
}

const { Text } = Typography;
const { Password } = Input;

const Register: FC<Props> = (props) => {
  const {
    validate,
    hideSideBar,
    location: { search },
    action,
    loading,
    errors,
    resetErrors,
  } = props;

  const [state, setState] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  useEffect(() => {
    hideSideBar();
  }, [hideSideBar]);

  useEffect(() => {
    resetErrors();
  }, [state, resetErrors]);

  if (!search.includes('invite=')) {
    return <Redirect to="/exception/404" />;
  }

  const disabled: boolean = !state.username || !state.firstName || !state.lastName || !state.password;

  const onChange = (e: any) => {
    e.persist();
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const findError = (fieldName: string) => {
    const error = errors.find((err) => err.field === fieldName);
    return error && error.message;
  };

  const onOk = () => action({ ...state }, search);

  return (
    <Row className={styles.register}>
      <div style={{ width: '100%', textAlign: 'center'}}>
        <Title level={4}>
          Register
        </Title>
      </div>
      <Row className={styles.form}>
        <Input
          placeholder="First Name will appear on your resume"
          name="firstName"
          onChange={onChange}
          style={
            findError('firstName')
              ? { border: '1px solid red', marginTop: 8, marginBottom: 0 }
              : { marginBottom: 0, marginTop: 8 }
          }
          onBlur={() => validate(state.username)}
          className={styles.input}
        />
        <Row style={{ minHeight: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('firstName')}</Text>
        </Row>
        <Input
          name="lastName"
          onChange={onChange}
          placeholder="Last Name will appear on your resume"
          style={
            findError('lastName')
              ? { border: '1px solid red', marginTop: 16, marginBottom: 0 }
              : { marginBottom: 0, marginTop: 16 }
          }
          onBlur={() => validate(state.username)}
          className={styles.input}
        />
        <Row style={{ minHeight: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('lastName')}</Text>
        </Row>
        <Input
          name="username"
          onChange={onChange}
          placeholder="Enter your username"
          onBlur={() => validate(state.username)}
          style={
            findError('username')
              ? { border: '1px solid red', marginTop: 16, marginBottom: 0 }
              : { marginBottom: 0, marginTop: 16 }
          }
          className={styles.input}
        />
        <Row style={{ minHeight: 16  }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('username')}</Text>
        </Row>
        <Password
          placeholder="Enter Password"
          onChange={onChange}
          name="password"
          onBlur={() => validate(state.username)}
          style={
            findError('password')
              ? { border: '1px solid red', marginTop: 16, marginBottom: 0 }
              : { marginBottom: 0, marginTop: 16 }
          }
          className={styles.input}
        />
        <Row style={{ minHeight: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('password')}</Text>
        </Row>

        <Button
          disabled={disabled}
          onClick={onOk}
          style={{ background: '#0050c8', color: 'white'}}
          className={styles.button}
          type="primary">
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </Row>
    </Row>
  );
};

const mapStateToProps = ({ common, global }: any) => ({
  visible: common.modals.registerModal.open,
  loading: global.registerLoading,
  errors: global.registerErrors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideSideBar: () => dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: false }),
  openModal: () =>
    dispatch({
      type: constants.HANDLE_MODAL,
      payload: {
        registerModal: { open: true },
      },
    }),
  action: (data: any, search: string) => register(data, search, dispatch),
  resetErrors: () => dispatch({ type: constants.REGISTER_ERRORS, payload: [] }),
  validate: (username: string) => validateUsername(username, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
