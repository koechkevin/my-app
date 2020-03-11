import {faCameraAlt, faExclamationCircle} from '@fortawesome/pro-light-svg-icons';
import { faTimes} from '@fortawesome/pro-regular-svg-icons';
import {notification, Row, Upload} from 'antd';
import React, {FC} from 'react';
import Icon from './Icon';

import styles from './Uploader.module.scss';

const Uploader: FC<any> = (props) => {
  const { action } = props;

  const errorMessage  = (message: string) => notification.error({
    message,
    duration: 0,
    className: styles.notification,
    icon: <Icon color="red" icon={faExclamationCircle} />,
    placement: 'topLeft',
    closeIcon: <Icon icon={faTimes} />,
  });
  const customRequest = ({file}: any) => {
    if (file && file.size > 5 * 1024 * 1024) {
      return errorMessage('Upload Failed.File size should not exceed 5 Mb. Please try again');
    }
    action(file, errorMessage);
  };

  return (
    <Row className={styles.uploader}>
      <Upload accept={'.png, .jpg, .svg'} customRequest={customRequest} className={styles.upload}>
      <Icon color={props.color} className={styles.icon} icon={faCameraAlt} />
      </Upload>
    </Row>
  )
};

export default Uploader;
