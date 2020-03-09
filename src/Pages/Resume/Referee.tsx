import { faPencilAlt } from '@fortawesome/pro-light-svg-icons';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/pro-regular-svg-icons';
import { Col, Input, Row, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Icon } from '../../components';
import { Referee as Ref } from '../../redux/reducers/resume';

import styles from '../Resume.module.scss';

const { Text } = Typography;
interface Props {
  referee: any;
  isEditing: boolean;
  referees: Ref[];
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: (data: any) => void;
  index: number;
}
const Referee: FC<Props> = (props) => {
  const { referee, isEditing, isEditable, referees, index, editResume, apiUpdate } = props;
  const [edit, setEdit] = useState({
    name: false,
    jobTitle: false,
    organization: false,
    mobile: false,
    email: false,
  });

  const [hover, setHover] = useState(false);

  const setEditing = (value: boolean) => {
    setEdit({
      name: value,
      jobTitle: value,
      organization: value,
      mobile: value,
      email: value,
    });
  };

  useEffect(() => {
    if (isEditing) {
      setEditing(true);
    }
  }, [isEditing]);

  const onChange = (e: any) => {
    e.persist();
    const newReferees = referees.map((ref: Ref, idx: number) =>
      idx === index ? { ...ref, [e.target.name]: e.target.value } : ref,
    );
    editResume({ referees: newReferees });
  };

  const onBlur = (e: any) => {
    e.persist();
    apiUpdate({ resume: { referees } });
    setEdit((s) => ({ ...s, [e.target.name]: false }));
  };

  return (
    <Row onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} style={{ width: '100%' }}>
      <Col style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        {!edit.name && (
          <Text strong style={{ color: '#1d1d1d', fontSize: 14 }}>
            {referee.name}
          </Text>
        )}
        {edit.name && (
          <Input
            onChange={onChange}
            value={referee.name}
            name="name"
            onBlur={onBlur}
            className={styles.input}
            placeholder="Name"
          />
        )}
        {isEditable && !edit.name &&
        <Icon color={hover ? '' : 'transparent'} hover onClick={() => setEditing(true)} icon={faPencilAlt} />}
      </Col>
      <Col style={{ width: '100%', marginBottom: 8 }}>
        {!edit.jobTitle && (
          <Text style={{ fontSize: 12 }}>
            <i>{referee.jobTitle}</i>
          </Text>
        )}
        {edit.jobTitle && (
          <Input
            onChange={onChange}
            onBlur={onBlur}
            value={referee.jobTitle}
            name="jobTitle"
            className={styles.input}
            placeholder="Job Title"
          />
        )}
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center', width: '100%', height: 32, marginBottom: 8 }}>
        <Icon icon={faMapMarkerAlt} />
        {!edit.organization && (
          <Text>
            <i>{referee.organization}</i>
          </Text>
        )}
        {edit.organization && (
          <Input
            onChange={onChange}
            onBlur={onBlur}
            value={referee.organization}
            name="organization"
            className={styles.input}
            placeholder="Organization"
          />
        )}
      </Col>
      {referee.mobile && (
        <Col style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 8, height: 32 }}>
          <Icon icon={faPhone} />
          {!edit.mobile && <Text>{referee.mobile}</Text>}
          {edit.mobile && (
            <Input
              onBlur={onBlur}
              onChange={onChange}
              value={referee.mobile}
              name="mobile"
              className={styles.input}
              placeholder="Phone"
            />
          )}
        </Col>
      )}
      <Col style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Icon icon={faEnvelope} />
        {!edit.email && <Text>{referee.email}</Text>}
        {edit.email && (
          <Input
            onChange={onChange}
            onBlur={onBlur}
            value={referee.email}
            name="email"
            className={styles.input}
            placeholder="Email Address"
          />
        )}
      </Col>
    </Row>
  );
};

export default Referee;
