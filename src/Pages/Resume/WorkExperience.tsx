import {faPlus} from '@fortawesome/pro-regular-svg-icons';
import { Typography } from 'antd';
import React, {FC, useState} from 'react';
import { Icon } from '../../components';
import { Work } from '../../redux/reducers/resume';
import SingleExperience from './SingleExperience';

const { Text } = Typography;

interface WorkProps {
  work: Work[];
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: ( data: any) => void;
}

const WorkExperience: FC<WorkProps> = (props) => {
  const { work, isEditable, editResume } = props;

  const [hover, setHover] = useState(false);

  const newWork = {
    description: '',
    endYear: '',
    endMonth: '',
    role: '',
    organization: '',
    startMonth: '',
    startYear: '',
    editing: true,
  }

  const onAdd = () => {
    editResume({ work: [...work, newWork]});
  }
  return (
    <div
      onMouseLeave={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      style={{ padding: 16, width: '100%' }}>
      <div
        style={{ padding: '16px 0', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
          Work Experience
        </Text>
        {isEditable && !work.length && <Icon onClick={onAdd} hover icon={faPlus} />}
      </div>
      {work.map((work: Work, index: number) => <SingleExperience index={index} {...props} key={index} {...work}/>)}
      {isEditable &&
      work.length > 0 &&
      <Icon
          color={hover ? '' : 'transparent'}
          style={{ float: 'right', marginTop: 8 }}
          onClick={onAdd}
          hover
          icon={faPlus} />}
    </div>
  );
};

export default WorkExperience;
