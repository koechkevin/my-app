import { Row } from 'antd';
import React, { FC } from 'react';
import styles from './Loader.module.scss';

const Loader: FC<any> = () => {
  return (
    <Row className={styles.parent}>
      <div className={styles.loader}>
        <div/>
        <div/>
        <div/>
      </div>
    </Row>
  );
};

export default Loader;
