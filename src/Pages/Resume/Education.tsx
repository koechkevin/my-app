import { faPencilAlt } from '@fortawesome/pro-light-svg-icons/faPencilAlt';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { Input, Row, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Dates, Icon } from '../../components';
import { Education as Edu } from '../../redux/reducers/resume';
import styles from '../Resume.module.scss';

interface EducationProp extends Edu {
  educationList: Edu[];
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: (data: any) => void;
  index: number;
  editing?: boolean;
}
const { Paragraph, Text } = Typography;
const { TextArea } = Input;

const History: FC<EducationProp> = (education) => {
  const {
    isEditable,
    school,
    description,
    editResume,
    educationList,
    index, editing,
    startMonth, startYear, endMonth, endYear,
    apiUpdate } = education;

  const [edit, setEditing] = useState(false);
  const [hover, setHover] = useState(false);

  const [ed, setEd] = useState({
    school: false, description: false,
  });

  const setEdit = (value: boolean) => {
    setEditing(value);
    setEd({
      school: value,
      description: value,
    });
  };

  useEffect(() => {
    if (editing) {
      setEdit(editing);
    }
  }, [editing]);

  const onChange = (e: any) => {
    const eduList =  educationList
      .map((each: Edu, idx: number) => idx === index ?
        {...each, [e.target.name]: e.target.value, editing: false}
        : each);
    editResume({education: eduList});
  };

  const onChangeDate = (e: any) => {
    const eduList =  educationList
      .map((each: Edu, idx: number) => idx === index
        ? {...each, [e.target.name]: e.target.value, editing: false}
        : each);
    editResume({education: eduList});
    apiUpdate({resume: { education: eduList}});
  };

  const dateProps = {
    startMonth, startYear, endMonth, endYear, onChange: onChangeDate, onFinish: () => setEdit(false),
  };
  const onBlur = (e: any) => {
    e.persist();
    apiUpdate({resume: { education: educationList}});
    setEd((s) => ({...s, [e.target.name]: false }));
  };
  return (
    <div onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className={styles.edu}>
      <div className={styles.header}>
        {!ed.school && (
          <Text style={{ fontSize: 16, color: '#1d1d1d' }} strong>
            {education.school}
          </Text>
        )}
        {edit && ed.school && <Input
            onChange={onChange}
            name="school"
            onBlur={onBlur}
            value={school}
            placeholder="School Name"
            className={styles.input} />}
        {isEditable && !edit && (
          <Icon
            onClick={() => setEdit(true)}
            hover
            color={hover && !edit ? '' : 'transparent'}
            icon={faPencilAlt} />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {!ed.description && <Paragraph>{education.description}</Paragraph>}
        {edit && ed.description && <TextArea
            name="description"
            value={description}
            onChange={onChange}
            placeholder="A brief description"
            onBlur={onBlur}
            className={styles.input}
            autoSize />}
      </div>
      <div>
        {!edit && (
          <>
            <Text strong style={{ color: '#565656' }}> <i>{education.startMonth}</i></Text>
            <Text strong style={{ color: '#565656', marginLeft: 4, marginRight: 4 }}><i>{education.startYear}</i></Text>
            {'~'}
            <Text strong style={{ color: '#565656', marginLeft: 4 }}><i>{education.endMonth}</i></Text>
            <Text strong style={{ color: '#565656', marginLeft: 4 }}><i>{education.endYear}</i></Text>
          </>
        )}
       {edit && <Dates {...dateProps}/>}
      </div>
    </div>
  );
};

interface EducationProps {
  educationList: Edu[];
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: (data: any) => void;
}

const Education: FC<EducationProps> = (props) => {
  const { educationList, isEditable, editResume, apiUpdate } = props;
  const [hover, setHover] = useState(false);
  const education: any = {
    school: '',
    description: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    editing: true,
  };
  return (
    <div className={styles.education}>
      <Row onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className={styles.header}>
        <Text strong style={{ fontSize: 16, color: '#1d1d1d' }}>
          Education
        </Text>
        {isEditable && (
          <Icon
            onClick={() => editResume({ education: [...educationList, education] })}
            hover
            color={hover ? '' : 'transparent'}
            icon={faPlus}
          />
        )}
      </Row>
      <Row className={styles.body}>
        {educationList.map((education: Edu, index: number) => (
          <History
            educationList={educationList}
            editResume={editResume}
            apiUpdate={apiUpdate}
            isEditable={isEditable}
            index={index}
            key={index}
            {...education} />
        ))}
      </Row>
    </div>
  );
};

export default Education;
