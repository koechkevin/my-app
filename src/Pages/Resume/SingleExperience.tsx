import {faPencilAlt} from '@fortawesome/pro-light-svg-icons';
import {Input, Row, Typography} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Dates, Icon} from '../../components';
import { Work} from '../../redux/reducers/resume';
import styles  from  '../Resume.module.scss';

interface Props extends Work {
  editing?: boolean;
  onFinish?: () => void;
  isEditable: boolean;
  index: number;
  editResume: (data: any) => void;
  apiUpdate: ( data: any) => void;
  work: Work[];
}

const { Paragraph, Text } = Typography;
const { TextArea } = Input;

const SingleExperienceView: FC<Props> = (props) => {
  const { startMonth, startYear, endMonth, endYear, role, organization, description } = props;
  const startDate = `${startMonth || ''} ${startYear || ''}`;
  const endDate = `${endMonth || ''} ${endYear || ''}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 'calc(100% - 32px)' }}>
      <Text strong style={{ color: '#1d1d1d', fontSize: 18 }}>
        {role}
      </Text>
      <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
        {organization}
      </Text>
      <Row style={{ fontSize: 16, padding: '8px 0' }}>
        <Text>{startDate}</Text> - <Text>{endDate}</Text>
      </Row>
      <Paragraph>{description}</Paragraph>
    </div>
  )};

const EditSingleExperience: FC<Props> = (props) => {
  const {
    organization,
    description,
    role,
    startMonth,
    startYear,
    endMonth,
    endYear,
    onFinish,
    work,
    index,
    editResume,
    apiUpdate,
  } = props;

  const onChange = (e: any) => {
    const workList =  work
      .map((each: Work, idx: number) => idx === index ?
        {...each, [e.target.name]: e.target.value, editing: false}
        : each);
    editResume({work: workList});
  };

  const onChangeDate = (e: any) => {
    const eduList =  work
      .map((each: Work, idx: number) => idx === index
        ? {...each, [e.target.name]: e.target.value, editing: false}
        : each);
    editResume({work: eduList});
    apiUpdate({resume: { work: eduList}});
  };

  const dateProps = {
    startMonth, startYear, endMonth, endYear, onChange: onChangeDate, onFinish,
  }
  return (
    <Row style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Input
        value={role}
        placeholder="Role"
        onChange={onChange}
        name="role"
        style={{
          marginBottom: 8,
        }}
        className={styles.input} />
      <Input
        onChange={onChange}
        name="organization"
        value={organization}
        placeholder="Organization"
        className={styles.input} />
      <TextArea
        value={description}
        style={{ marginTop: 8 }}
        placeholder="Description"
        name="description"
        onChange={onChange}
        autoSize
        className={styles.input} />
      <Dates align {...dateProps} />
    </Row>
  );
}

export const SingleExperience: FC<Props> = (props) => {
  const { editing, isEditable } = props;
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (editing) {
      setEdit(editing);
    }
  }, [editing]);
  return <Row
    className={styles.singleExperience}
    onMouseOver={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
    {!edit && <SingleExperienceView {...props}/>}
    {edit && <EditSingleExperience onFinish={() => setEdit(false)} {...props}/>}
    {!edit && isEditable &&
    <Icon
      color={hover ? '' : 'transparent'}
      onClick={() => setEdit(true)}
      hover icon={faPencilAlt}/>}
  </Row>
};

export default SingleExperience;