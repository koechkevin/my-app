import {faPencilAlt} from '@fortawesome/pro-light-svg-icons';
import {faEnvelope, faMapMarkerAlt, faPhone} from '@fortawesome/pro-regular-svg-icons';
import {Input, Row, Typography} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Icon} from '../../components';
import {Contact} from '../../redux/reducers/resume';
import styles from '../Resume.module.scss'

const { Text, Title } = Typography;

const style = {
  width: '100%', color: '#1d1d1d', display: 'flex', alignItems: 'center', height: 40,
  justifyContent: 'space-between',
}
interface Props {
  contacts: Contact;
  isEditable: boolean;
  editResume: (data: any) => void;
  apiUpdate: (data: any) => void;
}
const Contacts: FC<Props> = (props) => {
  const { contacts, isEditable, editResume, apiUpdate } = props;
  const [hover, setHover] = useState({
    emailAddress: false, phone: false, location: false,
  });

  const [edit, setEdit] = useState({
    emailAddress: false, phone: false, location: false,
  });

  const onChange = (e: any) => {
    e.persist();
    editResume({ contacts: {...contacts, [e.target.name]: e.target.value }});
  };

  const onBlur = (e: any) => {
    e.persist();
    apiUpdate({resume: { contacts }});
    const name = e.target.name === 'country' ? 'location' : e.target.name;
    setEdit((s) => ({...s, [name]: false}));
  };

  useEffect(() => {
    if (!isEditable) {
      setEdit({ emailAddress: false, phone: false, location: false })
    }
  }, [isEditable]);
  return (
    <Row style={{ marginBottom: 16, maxWidth: 575 }}>
      <Title level={4} style={{ width: '100%', fontSize: 16, color: '#1d1d1d', display: 'flex', alignItems: 'center'}} >
        <span style={{ marginRight: 16}}>Contacts</span>
      </Title>

      <div
        onMouseLeave={() => setHover((s) => ({...s, emailAddress: false}))}
        onMouseOver={() => setHover((s) => ({...s, emailAddress: true}))}
        style={style}>
        <div style={{...style, justifyContent: 'flex-start'}}>
          <Icon icon={faEnvelope} />
          {contacts.emailAddress && !edit.emailAddress && <Text>{contacts.emailAddress}</Text>}
          {edit.emailAddress &&
          <Input
            name="emailAddress"
            onBlur={onBlur}
            onChange={onChange}
              value={contacts.emailAddress}
              type="email"
              placeholder="Email Address"
              className={styles.input} />}
        </div>
        {isEditable && !edit.emailAddress &&
        <Icon
            onClick={() => setEdit((s) => ({...s, emailAddress: true}))}
            hover
            color={hover.emailAddress ? '#565656' : 'transparent'}
            icon={faPencilAlt}/>}
      </div>

      <div
        onMouseLeave={() => setHover((s) => ({...s, phone: false}))}
        onMouseOver={() => setHover((s) => ({...s, phone: true}))}
        style={style}>
        <div style={{...style, justifyContent: 'flex-start'}}>
          <Icon
            icon={faPhone} />{contacts.phone && !edit.phone && <Text>{contacts.phone}</Text>}
          {edit.phone && <Input
              onBlur={onBlur}
              onChange={onChange}
              name="phone"
              value={contacts.phone} placeholder="Phone" className={styles.input} />}
        </div>
        {isEditable && !edit.phone &&
        <Icon
            onClick={() => setEdit((s) => ({...s, phone: true}))}
            hover
            color={hover.phone ? '#565656' : 'transparent'}
            icon={faPencilAlt}/>}
      </div>

      <div
        onMouseLeave={() => setHover((s) => ({...s, location: false}))}
        onMouseOver={() => setHover((s) => ({...s, location: true}))}
        style={style}>
        <div style={{...style, justifyContent: 'flex-start'}}>
        <Icon icon={faMapMarkerAlt} />
      {contacts.country && !edit.location &&
      <Text>{`${contacts.city} ${contacts.region} ${contacts.country ? ',':''} ${contacts.country}`}</Text>}
          {edit.location &&
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Input
                  onBlur={onBlur}
                  name="city"
                  onChange={onChange}
                  value={contacts.city}
                  placeholder="City"
                  className={styles.input} />
              <Input
                  value={contacts.region}
                  style={{ marginLeft: 8}}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="region"
                  placeholder="State/Region/County etc"
                  className={styles.input} />
              <Input
                  value={contacts.country}
                  style={{ marginLeft: 8}}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="country"
                  placeholder="Country"
                  disabled={!contacts.city || !contacts.region}
                  className={styles.input} />
          </div>}

        </div>
          {isEditable && !edit.location && <Icon
              onClick={() => setEdit((s) => ({...s, location: true}))}
              hover color={hover.location ? '#565656' : 'transparent'}  icon={faPencilAlt}/>}
      </div>
    </Row>
  )
}

export default Contacts