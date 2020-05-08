import { faArrowAltDown, faArrowAltUp } from '@fortawesome/pro-solid-svg-icons';
import { Col, Menu, Row, Typography } from 'antd';
import React, { FC, Fragment, useState } from 'react';
import { Detail, QuickLink } from '../redux/reducers/user';
import Icon from './Icon';
import styles from './SideMenu.module.scss';

const { Text } = Typography;

const { Item } = Menu;

interface Props {
  quickLinks: QuickLink[];
}

export const QuickLinks: FC<Props> = (props) => {
  const { quickLinks } = props;
  const obj = document.getElementById('quick') as HTMLDivElement;
  const [scrolled, setScrolled] = useState(false);

  const onScrollDown = () => {
    if (obj) {
      obj.scrollTop = obj.scrollHeight;
      setScrolled(true);
    }
  };

  const onScrollUp = () => {
    if (obj) {
      obj.scrollTop = 0;
      setScrolled(false);
    }
  };

  return (
    <Row className={styles.projects}>
      {quickLinks.map((quickLink: QuickLink, index: number) => {
        return (
          <Fragment key={index}>
            <Col>
              <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.54)', padding: 16 }}>{quickLink.title}</Text>
            </Col>
            {scrolled && (
              <button style={{ marginBottom: 0 }} onClick={onScrollUp} className={styles.scroll}>
                <Typography.Text style={{ color: '#fff' }}> scroll to top </Typography.Text>
                <Icon className={styles.icon} icon={faArrowAltUp} />
              </button>
            )}
            <div id="quick" className={styles.quickLink}>
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
            </div>
            {!scrolled && (
              <button onClick={onScrollDown} className={styles.scroll}>
                <Typography.Text style={{ color: '#fff' }}> scroll to bottom </Typography.Text>
                <Icon className={styles.icon} icon={faArrowAltDown} />
              </button>
            )}
          </Fragment>
        );
      })}
    </Row>
  );
};

export default QuickLinks;
