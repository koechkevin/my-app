import { Col, Menu, Row, Typography } from 'antd';
import React, { FC, Fragment } from 'react';
import { Detail, QuickLink } from '../redux/reducers/user';
import styles from './SideMenu.module.scss';

const { Text } = Typography;

const { Item } = Menu;

interface Props {
  quickLinks: QuickLink[];
}

export const QuickLinks: FC<Props> = (props) => {
  const { quickLinks } = props;
  return (
    <Row className={styles.projects}>
      {quickLinks.map((quickLink: QuickLink, index: number) => {
        return (
          <Fragment key={index}>
            <Col>
              <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.54)', padding: 16 }}>{quickLink.title}</Text>
            </Col>
            <Menu theme="dark" className={styles.menu} style={{ width: '100%' }}>
              {quickLink.details.map((detail: Detail, index: number) => {
                return (
                  <Item key={index} style={{ margin: 0, height: 32 }}>
                    <Text ellipsis style={{ color: '#ffffff' }}>
                      {/* eslint-disable-next-line react/jsx-no-target-blank */}
                      <a target="_blank" rel="noopener" style={{ color: 'inherit' }} href={detail.link || ''}>
                        {detail.name}
                      </a>
                    </Text>
                  </Item>
                );
              })}
            </Menu>
          </Fragment>
        );
      })}
    </Row>
  );
};

export default QuickLinks;
