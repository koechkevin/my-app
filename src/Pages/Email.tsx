import {Button, Input, notification} from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RichTextEditor from 'react-rte';
import { PageTitle } from '../components';
import constants from '../redux/constants';
import { personalMail } from '../redux/effects/messaging';
import Exception404 from './404';
import styles from './Email.module.scss';

const toolbarConfig: any = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Strikethrough', style: 'STRIKETHROUGH' },
    { label: 'Code', style: 'CODE' },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled', className: styles.normal },
    { label: 'Heading Large', className: styles.medium, style: 'header-two' },
    { label: 'Heading Medium', style: 'header-three', className: styles.large },
    { label: 'Heading Small', className: styles.small, style: 'header-one' },
    { label: 'Code Block', className: styles.code, style: 'code-block' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
};

const Email: FC<any> = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<any>(RichTextEditor.createEmptyValue());
  const redux = useSelector(({ global }: any) => ({
    auth: global.auth,
  }));
  useEffect(() => {
    const pageTitle = <PageTitle name={'Email'} />;
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle });
    dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: true });
    dispatch({ type: constants.EMAIL_PAGE, payload: true });
    return () => {
      dispatch({ type: constants.SHOW_SOCIAL_ICONS, payload: false });
      dispatch({ type: constants.EMAIL_PAGE, payload: false });
      dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: '' });
    };
  }, [dispatch]);

  const {
    auth: { username, email },
  } = redux;

  useEffect(() => {
    if (username) {
      dispatch({ type: constants.LOAD_USER_NAME, payload: username });
    }
  }, [dispatch, username]);

  const [loading, setLoading] = useState(false);

  const [val, setVal] = useState({ recipient: '', subject: '' });
  const onClick = async () => {
    setLoading(true);
    try {
      const data = {
        message: text.toString('html'),
        ...val, from: email,
      };
      await personalMail(data);
      setLoading(false);
      notification.success({
        message: `Email has been successfully sent to ${val.recipient}`,
      });
      setVal({ recipient: '', subject: '' });
      setText(RichTextEditor.createEmptyValue())
    } catch (e) {
      setLoading(false);
      notification.error({
        message: `Your email was not sent. Please try again`,
      })
    }
  };

  const onChange = (e: any) => {
    e.persist();
    setVal((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const disabled = !val.recipient || !val.subject;

  if (email !== 'koechkevin92@gmail.com') {
    return <Exception404 showSidebar exception={403} text="You are not Authorized to access this page" />
  }

  return (
    <div style={{ padding: 16 }}>
      <Input
        name="recipient"
        onChange={onChange}
        placeholder="To"
        value={val.recipient}
        type="email"
        style={{ borderRadius: 8, marginBottom: 16 }}
      />
      <Input
        value={val.subject}
        name="subject"
        onChange={onChange}
        placeholder="Subject"
        style={{ borderRadius: 8, marginBottom: 16 }}
      />
      <RichTextEditor toolbarConfig={toolbarConfig} className={styles.editor} value={text} onChange={setText} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          loading={loading}
          disabled={disabled}
          onClick={onClick}
          style={{
            backgroundColor: '#0050c8',
            color: '#fff',
            borderRadius: 8,
            width: 88,
            marginTop: 16,
            opacity: disabled ? 0.4 : 1,
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Email;
