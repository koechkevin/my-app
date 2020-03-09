import {faPlus} from '@fortawesome/pro-regular-svg-icons';
import { Typography } from 'antd';
import React, {FC, useState} from 'react';
import {Icon} from '../../components';
import { Referee as Ref } from '../../redux/reducers/resume';
import Referee from './Referee';

interface RefereeProps {
  referees: Ref[];
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: ( data: any) => void;
}
const { Text } = Typography;
const Referees: FC<RefereeProps> = (props) => {
  const { referees, isEditable, editResume } = props;
  const [add, setAdd] = useState(false);

  const referee: Ref = {
    jobTitle: '', name: '', organization: '', email:'', mobile: '+',
  };
  const onAdd = () => {
    editResume({ referees: [...referees, referee]});
    setAdd(true);
  };

  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseLeave={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      style={{ padding: 16, width: '100%' }}>
      <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between' }}>
        <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>
          Referees
        </Text>
        {isEditable && referees.length === 0 &&
        <Icon color={hover ? '' : 'transparent'} hover icon={faPlus} onClick={onAdd} />}
      </div>
      <ol>
        {referees.map((referee: Ref, index: number) => (
          <li style={{ margin: '16px 0' }} key={index}>
            <Referee index={index} isEditing={add && index === referees.length - 1} referee={referee} {...props}/>
          </li>
        ))}
        {isEditable && referees.length > 0 &&
        <Icon color={hover ? '' : 'transparent'} style={{ float: 'right'}} hover icon={faPlus} onClick={onAdd} />}
      </ol>
    </div>
  );
};
export default Referees;
