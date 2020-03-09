import {faPencilAlt} from '@fortawesome/pro-light-svg-icons';
import {faPlus} from '@fortawesome/pro-regular-svg-icons';
import {Input, Row, Typography} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import { Icon } from '../../components';
import styles from '../Resume.module.scss';

const { Text } = Typography;
const { TextArea } = Input;

interface AchievementsProps {
  achievements: string[];
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: ( data: any) => void;
}

const Achievement: FC<any> = (props) => {
  const { achievement, editing, achievements, index, editResume, apiUpdate, isEditable } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (editing) {
      setIsEdit(editing);
    }
  }, [editing]);

  const onChange = (e: any) => {
    e.persist();
    const newAchievements = achievements.map((each: string, idx: number) => idx === index ? e.target.value : each);
    editResume({ achievements: newAchievements});
  }

  const onBlur = () => {
    apiUpdate({ resume: { achievements }});
    setIsEdit(false);
  }

  return (
    <div
      onMouseLeave={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
    {!isEdit  && <Text>{achievement}</Text>}
      {isEdit && <TextArea
          name="achievement"
          value={achievement}
          placeholder="A brief description"
          style={{ marginBottom: 8}}
          onChange={onChange}
          onBlur={onBlur}
          autoSize
          className={styles.input} />}
    {!isEdit && isEditable && <Icon
        hover
        color={hover ? '' : 'transparent'}
        onClick={() => setIsEdit(true)}
        icon={faPencilAlt} />}
  </div>
  );
}
const Achievements: FC<AchievementsProps> = (props) => {
  const { achievements, isEditable, editResume, apiUpdate } = props;
  const [hover, setHover] = useState(false);

  const [add, setAdd] = useState(false);
  const onAdd = () => {
    editResume({ achievements: [...achievements, '']});
    setAdd(true);
  };

  return (
    <Row
      onMouseLeave={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      style={{ padding: 16, width: '100%', cursor: 'pointer' }}>
      <div style={{ padding: '16px 0', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
          Achievements
        </Text>
        {isEditable && !achievements.length && <Icon
            hover
            color={hover ? '' : 'transparent'}
            onClick={onAdd}
            style={{ float: 'right'}}
            icon={faPlus} />}
      </div>
      <ul style={{ width: '100%'}}>
        {achievements.map((each: string, index: number) => (
          <li style={{ marginBottom: 8 }} key={index}>
          <Achievement
            achievements={achievements}
            editResume={editResume}
            isEditable={isEditable}
            apiUpdate={apiUpdate}
            index={index}
            achievement={each}
            editing={!!(add && index === achievements.length - 1)}/>
          </li>
        ))}
      </ul>
      {isEditable && achievements.length > 0 && isEditable &&
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
         <Icon
            hover
            onClick={onAdd}
            color={hover ? '' : 'transparent'}
            icon={faPlus} />
      </div>}
    </Row>
  );
};

export default Achievements;
