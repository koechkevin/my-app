import {faPencilAlt} from '@fortawesome/pro-light-svg-icons/faPencilAlt';
import {Input, Typography} from 'antd';
import React, {FC, useState} from 'react';
import {Icon} from '../../components';
import {Skill} from '../../redux/reducers/resume';
import styles from '../Resume.module.scss';

export interface SkillProps {
  skills: Skill[];
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: (data: any) => void;
}

interface SkillView extends SkillProps {
  index: number;
  name: string;
  description: string;
  editActive?: boolean,
}

const { Text } = Typography;
const { TextArea } = Input;

const SkillsView: FC<SkillView> = (props) => {
  const { description, name, index, isEditable, skills, editResume, apiUpdate, editActive } = props;
  const [edit, setEdit] = useState({ name: editActive, description: editActive });

  const [hover, setHover] = useState({
    name: false,
    description: false,
  });

  const [value, setValue] = useState({ name, description });

  const onChange = (e: any) => {
    e.persist();
    setValue((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onBlur = (e: any) => {
    e.persist();
    if (e && e.target && e.target.name) {
      setEdit((state) => ({
        ...state, [e.target.name]: false,
      }))
    }
    const newSkills = skills.map((skill: Skill, idx: number) => idx === index ? value: skill)
      .filter((s) => s.name || s.description);
    editResume({ skills: newSkills });
    apiUpdate({ resume: { skills: newSkills } });

  };
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        onMouseOver={() => setHover((s) => ({ ...s, name: true }))}
        onMouseLeave={() => setHover((s) => ({ ...s, name: false }))}
        className={styles.skillsView}
      >
        {!edit.name && (<Text strong>{name}</Text>)}
        {edit.name && (
          <Input
            onBlur={onBlur}
            onPressEnter={onBlur}
            onChange={onChange}
            name="name"
            value={value.name}
            style={{ height: 40 }}
            className={styles.input}
            placeholder="A new skill/Technology"
          />
        )}
        {isEditable && !edit.name  && (
          <Icon
            onClick={() => setEdit((s) => ({ ...s, name: true }))}
            hover
            color={hover.name && !edit.name ? '' : 'transparent'}
            icon={faPencilAlt}
          />
        )}
      </div>
      <div
        onMouseOver={() => setHover((s) => ({ ...s, description: true }))}
        onMouseLeave={() => setHover((s) => ({ ...s, description: false }))}
        className={styles.description}>
        {!edit.description && <Text>{description}</Text>}
        {edit.description && (
          <TextArea
            onBlur={onBlur}
            onChange={onChange}
            name="description"
            value={value.description}
            className={styles.input}
            placeholder="A brief description of the mentioned skill"
            autoSize
          />
        )}
        {isEditable && !edit.description && (
          <Icon
            onClick={() => setEdit((s) => ({ ...s, description: true }))}
            hover
            color={hover.description && !edit.name ? '' : 'transparent'}
            icon={faPencilAlt}
          />
        )}
      </div>
    </div>
  );
};

export default SkillsView;