import {faTimes} from '@fortawesome/pro-regular-svg-icons';
import {Input, Modal, Row, Typography} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import {Dispatch} from 'redux';
import Icon from '../../components/Icon';
import styles from '../../components/Modal.module.scss';
import constants from '../../redux/constants';
import {register, validateUsername} from '../../redux/effects/authentication';

interface Props extends RouteComponentProps {
  hideSideBar: () => void;
  openModal: () => void;
  closeModal: () => void;
  visible: boolean;
  action: (data: any, search: string) => void;
  loading: boolean;
  errors: any[];
  resetErrors: () => void;
  validate: (username: string) => void;
}

const { Text } = Typography;
const { Password } = Input;

const okButtonProps = {
  style: { minWidth: 80, borderRadius: 8, padding: '4px 16px' },
};

const cancelButtonProps = {
  style:{ minWidth: 80,borderRadius: 8, fontSize: 16, fontWeight: 600, border: 'none', color: '#0050c8', padding: '4px 16px'},
};

const Register: FC<Props> = (props) => {
  const { closeModal, validate, hideSideBar,location: { search }, action, loading, errors, resetErrors } = props;

  const [state, setState] = useState({
    username: '', firstName: '', lastName: '', password: '',
  });

  useEffect(() => {
    hideSideBar();
  }, [hideSideBar]);

  useEffect(() => {
    resetErrors();
  }, [state, resetErrors]);

  if(!search.includes('invite=')){
    return <Redirect to="/exception/404" />
  }

  const disabled: boolean = !state.username || !state.firstName || !state.lastName || !state.password;

  const onChange = (e: any) => {
    e.persist();
    setState((s) => ({...s, [e.target.name]: e.target.value}));
  };

  const findError = (fieldName: string) => {
    const error = errors.find((err) => err.field === fieldName);
    return error && error.message;
  };

  const onOk = () => action({ ...state }, search);

  return (
    <Row>
      <Modal
        closeIcon={<Icon hover icon={faTimes}/>}
        wrapClassName={styles.modal}
        cancelButtonProps={cancelButtonProps}
        okButtonProps={{...okButtonProps, loading, disabled}}
        title="Register"
        okText={loading ? 'Sending...' : 'Send'}
        onOk={onOk}
        onCancel={closeModal}
        destroyOnClose
        mask={false}
        visible
      >
        <label>First Name</label>
        <Input
          placeholder="First Name will appear on your resume"
          name="firstName"
          onChange={onChange}
          style={findError('firstName') ? { borderBottom: '1px solid red'}:{}}
          onBlur={() => validate(state.username)}
          className={styles.input} />
        <Row style={{ height: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('firstName') }</Text>
        </Row>
        <label>Last Name</label>
        <Input
          name="lastName"
          onChange={onChange}
          placeholder="Last Name will appear on your resume"
          style={findError('lastName') ? { borderBottom: '1px solid red'}:{}}
          onBlur={() => validate(state.username)}
          className={styles.input} />
        <Row style={{ height: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('lastName') }</Text>
        </Row>
        <label>Username</label>
        <Input
          name="username"
          onChange={onChange}
          placeholder="Enter your username"
          onBlur={() => validate(state.username)}
          style={findError('username') ? { borderBottom: '1px solid red'}:{}}
          className={styles.input} />
        <Row style={{ height: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('username') }</Text>
        </Row>
        <label>Password</label>
        <Password
          placeholder="Enter Password"
          onChange={onChange}
          name="password"
          onBlur={() => validate(state.username)}
          style={findError('password') ? { borderBottom: '1px solid red'}:{}}
          className={styles.input} />
        <Row style={{ height: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{findError('password') }</Text>
        </Row>
      </Modal>
    </Row>
  )
}

const mapStateToProps = ({ common, global }: any) => ({
  visible: common.modals.registerModal.open,
  loading: global.registerLoading,
  errors: global.registerErrors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideSideBar: () => dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: false}),
  openModal: () => dispatch({ type: constants.HANDLE_MODAL, payload: {
      registerModal: {  open: true },
    }}),
  closeModal: () => dispatch({ type: constants.HANDLE_MODAL, payload: {
      registerModal: {  open: false },
    }}),
  action: (data: any, search: string) => register(data, search, dispatch),
  resetErrors: () => dispatch({ type: constants.REGISTER_ERRORS, payload: []}),
  validate: (username: string) => validateUsername(username, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);