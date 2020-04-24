import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMicrophone, faSmile } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Dropdown, Row } from 'antd';
import moment from 'moment';
import React, { FC, useState } from 'react';
import send from '../../src/send.svg';
import Emoji from '../Pages/Emoji';
import { Icon } from './index';
import styles from './whatsapp.module.scss';

const WhatsAppMe: FC<any> = (props) => {
  const [open, setOpen] = useState(false);
  const [time] = useState(() => moment().format('HH:mm'));
  const [value, setValue] = useState('');

  const onSend = () => {
    window.open(`https://wa.me/254726226149?text=${value}`, '_blank');
    setValue('');
    setOpen(false)
  };

  return (
    <Row className={styles.row}>
      <Card
        style={{
          height: open ? 268 : 0,
          overflow: 'hidden',
          transition: `height ${open ? 800 : 0}ms ease-out, width ${open ? 790 : 0}ms ease-out`,
          width: open ? 268 : 0,
        }}
        bordered={false}
        className={styles.whatsappChat}
      >
        <div className={styles.header}>
          <span>Chat on Whatsapp!</span>
          <span style={{ fontSize: 18, cursor: 'pointer' }} onClick={() => setOpen(false)}>
            &times;
          </span>
        </div>
        <div className={styles.body}>
          <div style={{ height: 102 }} />
          <div style={{ textAlign: 'center' }}>
            <span className={styles.today}>Today</span>
          </div>
          <div className={styles.text}>
            <span>Hello, My name is Kevin. How can I help you?</span>
            <span className={styles.time}>{time}</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            backgroundColor: '#ebebeb',
            height: 48,
            padding: '0 8px',
            alignItems: 'center',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Dropdown
            trigger={['click']}
            overlay={<Emoji onClick={(emoji) => setValue((val) => `${val}${emoji.value}`)} />}
          >
            <span>
              <Icon hover icon={faSmile} />
            </span>
          </Dropdown>
          <input
            onChange={(e: any) => {
              e.persist();
              setValue(e.target.value);
            }}
            value={value}
            className={styles.input}
          />
          {value ? (
            <div
              onClick={onSend}
              style={{ display: 'flex', width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}
            >
              <img className={styles.send} height={16} width={16} src={send} alt="" />
            </div>
          ) : (
            <Icon icon={faMicrophone} />
          )}
        </div>
      </Card>
      {!open && (
        <Card onClick={() => setOpen(true)} hoverable bordered={false} className={styles.card}>
          <FontAwesomeIcon style={{ fontSize: 32 }} color="#fff" size="lg" icon={faWhatsapp} />
        </Card>
      )}
    </Row>
  );
};

export default WhatsAppMe;
