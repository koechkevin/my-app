import {faPencilAlt} from '@fortawesome/pro-light-svg-icons/faPencilAlt';
import {Col, Input, Typography} from 'antd';
import React, {FC, useState} from 'react';
import { Icon } from '../../components';
import styles from '../Resume.module.scss';

interface OverviewProps {
  title: string;
  description: string;
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: (data: any) => void;
}

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Overview: FC<OverviewProps> = (props) => {
  const { title, description, isEditable, editResume, apiUpdate } = props;
  const [hoverTitle, setHoverTitle] = useState(false);
  const [hoverOverview, setHoverOverview] = useState(false);

  const [edit, setEdit] = useState({
    title: false, overview: false,
  });

  const onChange = (e: any) => {
    e.persist();
    editResume({ [e.target.name]: e.target.value });
  };

  const onBlur = (e: any, name: string) => {
    setEdit((s) => ({...s, [name]: false}));
    apiUpdate({resume: { title, overview: description }});
  };
  return (
    <>
      <Col onMouseOver={() => setHoverTitle(true)} onMouseLeave={() => setHoverTitle(false)} className={styles.header}>
        {!edit.title && <Title style={{ fontSize: 16, margin: 0 }} level={4}>{title}</Title>}
        {edit.title &&
        <Input
            style={{ fontSize: 16, margin: 0 }}
            value={title}
            name="title"
            onChange={onChange}
            onBlur={(e) => onBlur(e, 'title')}
            className={styles.input} />}
        {isEditable && !edit.title &&
        <Icon
            onClick={() => setEdit((s) => ({...s, title: true}))}
            color={hoverTitle && !edit.title ? '' : 'transparent'}
            icon={faPencilAlt} />}
      </Col>
      <div
        className={styles.overview}
        onMouseOver={() => setHoverOverview(true)}
        onMouseLeave={() => setHoverOverview(false)}>
        {edit.overview &&
        <TextArea
            onBlur={(e) => onBlur(e, 'overview')}
            autoSize
            className={styles.textArea}
            name="overview"
            value={description}
            onChange={onChange} />}
        {description && !edit.overview &&
        <Paragraph style={{ color: '#565656', cursor:'pointer', whiteSpace:'pre-wrap' }}>{description}</Paragraph>}
        {isEditable && !edit.overview &&
        <Icon
            onClick={() => setEdit((s) => ({...s, overview: true}))}
            hover
            color={hoverOverview && !edit.overview ? '' : 'transparent'}
            icon={faPencilAlt} />}
      </div>
    </>
  );
};



export default Overview;
