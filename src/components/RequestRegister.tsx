import {faCheckCircle, faTimes} from '@fortawesome/pro-regular-svg-icons';
import { Input, Modal, Row, Typography} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import constants from '../redux/constants';
import {requestRegister} from '../redux/effects/authentication';
import Icon from './Icon';

import styles from './Modal.module.scss';

interface Props {
  visible: boolean;
  action: (data: any, args: any) => void;
  errors: {
    message: string;
    fieldName: string;
  };
  loading: boolean;
  openModal: () => void;
  closeModal: () => void;
  clearErrors: () => void;
}

const { Text } = Typography;

const okButtonProps = {
  style: { minWidth: 80, borderRadius: 8, padding: '4px 16px' },
};

const cancelButtonProps = {
  style:{ minWidth: 80,borderRadius: 8, fontSize: 16, fontWeight: 600, border: 'none', color: '#0050c8', padding: '4px 16px'},
};

const RequestRegister: FC<Props> = (props) => {

  const { visible, closeModal, action, loading, errors, clearErrors} = props;

  const { message } = errors;
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
      clearErrors();
  }, [clearErrors, email]);

  const onCancel = () => {
    clearErrors();
    setEmail('');
    closeModal();
  };

  const disabled: boolean = !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);

  const notificationArgs = {
    message: `
    An email has been sent to you. Follow the link in your inbox to register.
    If you can't find in your inbox, check your spam folder
    `,
    duration: 6,
    className: styles.notification,
    icon: <Icon color="#52c41a" icon={faCheckCircle} />,
    closeIcon: <Icon icon={faTimes} />,
  };

  return (
    <Row>
      <Modal
        closeIcon={<Icon hover icon={faTimes}/>}
        wrapClassName={styles.modal}
        cancelButtonProps={cancelButtonProps}
        okButtonProps={{...okButtonProps, disabled, loading}}
        title="Welcome to My Resume"
        okText={loading ? 'Sending...' : 'Send'}
        onOk={() => action({ email }, notificationArgs)}
        onCancel={onCancel}
        destroyOnClose
        visible={visible}>
        <div style={{ marginBottom: 16 }}>
        <Text>Enter your email below and we will send you a link to register</Text>
        </div>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Username"
          style={message ? { borderBottom: '1px solid red'}:{}}
          className={styles.input} />
        <Row style={{ height: 16 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{message}</Text>
        </Row>
      </Modal>
    </Row>
  )
};

const mapStateToProps = ({ common, global }: any) => ({
  visible: common.modals.requestRegister.open,
  loading: global.requestingEmail,
  errors: global.requestingEmailErrors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openModal: () => dispatch({ type: constants.HANDLE_MODAL, payload: {
      requestRegister: {  open: true },
    }}),
  clearErrors: () => dispatch({ type: constants.REQUESTING_EMAIL_ERRORS, payload: {message: '', fieldName: ''}}),
  action: (data: any, notificationConfig: any) => requestRegister(data, notificationConfig, dispatch),
  closeModal: () => dispatch({ type: constants.HANDLE_MODAL, payload: {
      requestRegister: {  open: false },
    }}),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestRegister);