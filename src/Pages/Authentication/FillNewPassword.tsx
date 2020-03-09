
import {Button, Input, Row} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import React, {FC, useEffect, useState} from 'react'
import {connect} from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import {Dispatch} from 'redux';
import constants from '../../redux/constants';
import {fillNewPassword} from '../../redux/effects/authentication';
import styles from './FillNewPassword.module.scss';

interface Props extends RouteComponentProps{
  hideSideBar: () => void;
  resetPassword: (params: string, data: any) => void;
  loading: boolean;
  errors: any[];
  auth: any;
  resetErrors: () => void;
}

const { Password } = Input;
const FillNewPassword: FC<Props> = (props) => {
  const { hideSideBar, resetPassword, location, loading, errors, resetErrors, auth } = props;
  useEffect(() => {
    hideSideBar();
  }, [hideSideBar]);

  const [password, setPassword] = useState('');

  const onChange = (e: any) => {
    e.persist();
    resetErrors();
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    const params = location.search;
    resetPassword(params, { password });
  };

  if (!location.search || !location.search.includes('auth_key=') || !location.search.includes('id=')) {
    return <Redirect to="/exception/404" />
  }
  if (auth.authenticated && auth.username) {
    return <Redirect to={`/${auth.username}`}/>
  }
  return(
    <Row className={styles.newPassword}>
      <div style={{ width: '100%', textAlign: 'center'}}>
        <Title level={4}>
          Enter New Password
        </Title>
      </div>
      <Row className={styles.form}>
        <label>New Password</label>
        <Password
          style={ errors.length > 0 ? {borderColor: 'red'} : {}}
          onChange={onChange}
          className={styles.input} />
        {errors.length > 0 &&
        <Paragraph style={{ padding: '0 0 0 8px', color: 'red'}}>{errors.length > 0 && errors[0].message}</Paragraph>}
        <Button onClick={onSubmit} loading={loading} className={styles.button} type="primary">Reset Password</Button>
      </Row>
    </Row>
  );
};

const mapStateToProps = ({ global }: any) => ({
  loading: global.fillNewPasswordLoading,
  errors: global.fillNewPasswordErrors,
  auth: global.auth,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideSideBar: () => dispatch({ type: constants.SHOW_HIDE_SIDEBAR, payload: false}),
  resetStatusCode: () => dispatch({ type: constants.LOAD_STATUS_CODE, payload: 200}),
  resetPassword: (params: string, data: any) => fillNewPassword(params, data, dispatch),
  resetErrors: () => dispatch({type: constants.FILL_NEW_PASSWORD_ERRORS, payload: []}),
})

export default connect(mapStateToProps, mapDispatchToProps)(FillNewPassword);