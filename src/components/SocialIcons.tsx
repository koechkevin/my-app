import {faFacebookSquare, faGithub, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {Col} from 'antd';
import React, {FC} from 'react';
import {matchUrl} from '../utils';
import styles from './Header.module.scss';
import Icon from './Icon';

const SocialIcons: FC<any> = (props) => {
  const { socialLinks } = props;
  return (<Col className={styles.icons}>
    <Icon
      onClick={() => window.open(matchUrl(socialLinks, 'github'), '_blank')}
      hover
      color="333"
      icon={faGithub} />
    <Icon
      onClick={() => window.open(matchUrl(socialLinks, 'linkedIn'), '_blank')}
      hover
      color="#2867B2"
      icon={faLinkedin} />
    <Icon
      hover
      onClick={() => window.open(matchUrl(socialLinks, 'twitter'), '_blank')}
      color={'#1DA1F2'}
      icon={faTwitter} />
    <Icon
      onClick={() => window.open(matchUrl(socialLinks, 'facebook'), '_blank')}
      hover
      color="#4267B2"
      icon={faFacebookSquare} />
  </Col>);
};

export default SocialIcons;
