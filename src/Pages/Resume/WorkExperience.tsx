import { Row, Typography } from 'antd';
import React, { FC } from 'react';
import { Work } from '../../redux/reducers/resume';

const { Paragraph, Text } = Typography;

interface WorkProps {
  work: Work[];
}

const WorkExperience: FC<WorkProps> = (props) => {
  const { work } = props;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ padding: '16px 0' }}>
        <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
          Work Experience
        </Text>
      </div>
      {work.map((work: Work, index: number) => (
        <div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
          <Text strong style={{ color: '#1d1d1d', fontSize: 18 }}>
            {work.role}
          </Text>
          <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
            {work.organization}
          </Text>
          <Row style={{ fontSize: 16, padding: '8px 0' }}>
            <Text>{work.startDate}</Text> - <Text>{work.endDate}</Text>
          </Row>
          <Paragraph>{work.description}</Paragraph>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
