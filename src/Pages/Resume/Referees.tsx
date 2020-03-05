import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/pro-regular-svg-icons';
import { Col, Typography } from 'antd';
import React, { FC } from 'react';
import { Icon } from '../../components';
import { Referee } from '../../redux/reducers/resume';

interface RefereeProps {
  referees: Referee[];
}
const { Text } = Typography;
const Referees: FC<RefereeProps> = (props) => {
  const { referees } = props;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ padding: '16px 0' }}>
        <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
          Referees
        </Text>
      </div>
      <ol>
        {referees.map((referee: Referee, index: number) => (
          <li style={{ margin: '16px 0' }} key={index}>
            <Col>
              <Text strong style={{ color: '#1d1d1d', fontSize: 14 }}>
                {referee.name}
              </Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 16 }}>
                <i>{referee.jobTitle}</i>
              </Text>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon={faMapMarkerAlt} />
              <Text>
                <i>{referee.organization}</i>
              </Text>
            </Col>
            {referee.mobile && (
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon={faPhone} />
                <Text>{referee.mobile}</Text>
              </Col>
            )}
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon={faEnvelope} />
              <Text>{referee.email}</Text>
            </Col>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Referees;
