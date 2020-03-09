import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { Col, Row, Typography } from 'antd';
import React, {FC, useState} from 'react';
import { Icon } from '../../components';
import { Skill } from '../../redux/reducers/resume';

import styles from '../Resume.module.scss';
import SkillsView, { SkillProps } from './SkillView';

const { Title } = Typography;

const Skills: FC<SkillProps> = (props) => {
  const { skills, isEditable, editResume } = props;

  const [hover, setHover] = useState(false);

  return (
    <Row onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} style={{ padding: 16, width: '100%' }}>
      <Col sm={8}>
        <Title style={{ fontSize: 16, color: '#1d1d1d', width: '100%' }}>Skills & Technologies</Title>
      </Col>
      <Col className={styles.skills} sm={16}>
        {skills.map((skill: Skill, index: number) => (
          <SkillsView key={Math.random()} {...props} index={index} {...skill} />
        ))}
        <div className={styles.newSkill}>
          {isEditable && (
            <Icon
              onClick={() => editResume({ skills: [...skills, { name: '', description: '', editActive: true }] })}
              hover
              color={hover ? '' : 'transparent'}
              icon={faPlus}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Skills;
