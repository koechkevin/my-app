import { Row, Typography } from 'antd';
import React, { FC } from 'react';

interface EducationProp {
  school: string;
  startDate: string;
  description: string;
  endDate: string;
}
const { Paragraph, Text } = Typography;

const Education: FC<{ educationList: EducationProp[] }> = (props) => {
  const { educationList } = props;
  return (
    <div style={{ padding: 16 }}>
      <Row style={{ marginBottom: 16 }}>
        <Text strong style={{ fontSize: 16, color: '#1d1d1d' }}>
          Education
        </Text>
      </Row>
      {educationList.map((education: EducationProp, index: number) => (
        <div key={index}>
          <Text strong>{education.school}</Text>
          <Paragraph>{education.description}</Paragraph>
          <Text strong style={{ color: '#565656' }}>
            <i>{education.startDate}</i>
          </Text>
          {'-'}
          <Text strong style={{ color: '#565656' }}>
            <i>{education.endDate}</i>
          </Text>
        </div>
      ))}
    </div>
  );
};

export default Education;
