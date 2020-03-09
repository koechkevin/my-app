import {faCheckCircle, faTimes} from '@fortawesome/pro-regular-svg-icons';
import {Input, Modal, Row, Typography} from 'antd';
import React, {FC, useState} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Icon from '../../components/Icon';
import styles from '../../components/Modal.module.scss';
import constants from '../../redux/constants';
import { forgotPassword, login} from '../../redux/effects/authentication';

interface Props {
  loading: boolean;
  visible: boolean;
  loginFailed: boolean;
  resetErrors: () => void;
  action: (data: any) => void;
  modalTitle: string;
  closeModal: () => void;
  forgotPassword: boolean;
  displayForgotPassword: (payload: any) => void;
  forgotPasswordAction: (data: any, args: any) => void;
}
const okButtonProps = {
  style: { minWidth: 80, borderRadius: 8, padding: '4px 16px' },
};

const cancelButtonProps = {
  style:{ minWidth: 80,borderRadius: 8, fontSize: 16, fontWeight: 600, border: 'none', color: '#0050c8', padding: '4px 16px'},
};

const { Password } = Input;
const { Text } = Typography;

const Login: FC<Props> = (props) => {
  const { loading,
    action,
    closeModal,
    loginFailed,
    resetErrors,
    visible,
    displayForgotPassword,
    modalTitle,
    forgotPasswordAction,
    forgotPassword } = props;

  const [state, setState] = useState({
    username: '', password: '', email: '',
  });

  const disabled: boolean = false;
  const notificationArgs = {
    message: `
    An email has been sent to you. Follow the link in your inbox to reset your password.
    If you can't find in your inbox, check your spam folder
    `,
    duration: 6,
    className: styles.notification,
    icon: <Icon color="#52c41a" icon={faCheckCircle} />,
    closeIcon: <Icon icon={faTimes} />,
  };
  const onOk = () => {
    const { email, ...restState} = state;
    if (forgotPassword) {
      forgotPasswordAction({ email }, notificationArgs)
    } else {
      action(restState);
    }
  };

  const onChange = (e: any) => {
    e.persist();
    setState((s) => ({...s, [e.target.name]: e.target.value}));
    resetErrors();
  };

  return (
    <Row>
      <Modal
        closeIcon={<Icon hover icon={faTimes}/>}
        wrapClassName={styles.modal}
        cancelButtonProps={cancelButtonProps}
        okButtonProps={{...okButtonProps, loading, disabled}}
        title={modalTitle}
        okText={forgotPassword ? 'Send' : 'Login'}
        onOk={onOk}
        onCancel={closeModal}
        destroyOnClose
        visible={visible}
      >{ forgotPassword ?
        <>
          <Text style={{ color: '#1d1d1d' }}>
            Enter an email and we will send you a link to reset your password
          </Text>
          <Input
            onChange={onChange}
            name="email"
            style={{ marginTop: 16 }}
            value={state.email}
            className={styles.input}
            placeholder="Email" />
          <div
            onClick={() => displayForgotPassword({ open: true, forgotPassword: false, title: 'Login'})}
            style={{ color: '#0050c8', cursor: 'pointer', fontWeight: 600, marginTop: 16, width: 108 }}
          >Back to Login</div>
        </>:
        <>
        <Input
          style={loginFailed ? { border: '2px solid red', marginTop: 16 }:{ marginTop: 16 }}
          name="username"
          onChange={onChange}
          placeholder="Email or Username"
          className={styles.input} />
        <Row style={{ height: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{''}</Text>
        </Row>
        <Password
          style={loginFailed ? { border: '2px solid red'}:{}}
          name="password" onChange={onChange}
          className={styles.input}
          placeholder="Password" />
        <Row style={{ height: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{loginFailed ? 'Oops! invalid credentials' :''}</Text>
        </Row>
        <span
          onClick={() => displayForgotPassword({ open: true, forgotPassword: true, title: 'Forgot Password'})}
          style={{ color: '#0050c8', cursor: 'pointer', fontWeight: 600 }}
        >Forgot Password?</span>
        </>}
      </Modal>
    </Row>
  );
};

const mapStateToProps = ({ global, common }: any) => ({
  visible: common.modals.loginModal.open,
  loading: global.forgotPasswordLoading || global.loginLoading,
  loginFailed: global.loginFailed,
  forgotPassword: common.modals.loginModal.forgotPassword,
  modalTitle: common.modals.loginModal.title,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  action: (data: any) => login(data, dispatch),
  closeModal: () => dispatch({ type: constants.HANDLE_MODAL, payload: { loginModal: { open: false, title: 'Login' }}}),
  forgotPasswordAction: (data: any, args: any) => forgotPassword(data, args, dispatch),
  resetErrors: () => dispatch({type: constants.LOGIN_FAILED, payload: false }),
  displayForgotPassword: (payload: any) =>
    dispatch({ type: constants.HANDLE_MODAL, payload: { loginModal: payload}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
