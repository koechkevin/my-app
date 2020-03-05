import { Row, Typography } from 'antd';
import React, { FC } from 'react';

const { Text } = Typography;

interface AchievementsProps {
  achievements: string[];
}
const Achievements: FC<AchievementsProps> = (props) => {
  const { achievements } = props;
  return (
    <Row style={{ padding: 16 }}>
      <div style={{ padding: '16px 0' }}>
        <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
          Achievements
        </Text>
      </div>
      <ul>
        {achievements.map((each: string, index: number) => (
          <li key={index}>
            <Text>{each}</Text>
          </li>
        ))}
      </ul>
    </Row>
  );
};

export default Achievements;
