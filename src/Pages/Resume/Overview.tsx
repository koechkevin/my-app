import { Col, Row, Typography } from 'antd';
import React, { FC } from 'react';
import styles from '../Resume.module.scss';

interface OverviewProps {
  title: string;
  description: string;
}

const { Title, Paragraph } = Typography;

const Overview: FC<OverviewProps> = (props) => {
  const { title, description } = props;
  return (
    <Row className={styles.overview}>
      <Col className={styles.header}>
        <Title style={{ fontSize: 16, margin: 0 }} level={4}>
          {title}
        </Title>
      </Col>
      <Col>
        <Paragraph style={{ padding: 16, color: '#565656' }}>{description}</Paragraph>
      </Col>
    </Row>
  );
};

export default Overview;
