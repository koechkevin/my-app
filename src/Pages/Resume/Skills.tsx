import { Col, Row, Typography } from 'antd';
import React, { FC } from 'react';
import { Skill } from '../../redux/reducers/resume';

interface SkillProps {
  skills: Skill[];
}

const { Text } = Typography;

const SkillsView: FC<Skill> = (props) => {
  const { description, name } = props;
  return (
    <div style={{ marginBottom: 16 }}>
      <Text strong style={{ marginBottom: 16 }}>
        {name}
      </Text>
      <br />
      <Text>{description}</Text>
      <br />
    </div>
  );
};

const Skills: FC<SkillProps> = (props) => {
  const { skills } = props;
  return (
    <Row style={{ padding: 16, width: '100%' }} gutter={12}>
      <Col sm={8}>
        <Text style={{ fontSize: 16 }} strong>
          Skills & Technologies
        </Text>
      </Col>
      <Col sm={16}>
        {skills.map((skill: Skill) => (
          <SkillsView key={skill.name} {...skill} />
        ))}
      </Col>
    </Row>
  );
};

export default Skills;
