import {faSearch} from '@fortawesome/pro-light-svg-icons';
import {Input, Row} from 'antd';
import React, {FC, useState} from 'react';
import {Icon} from '../components';

import styles from './Emoji.module.scss';
import {list} from './emojiList';

interface Props {
  onClick: (emoji: any) => void;
}
const Emoji: FC<Props> = (props) => {
  const { onClick } = props;
  const [search, setSearch] = useState('');

  const onChange = (e: any) => {
    e.persist();
    setSearch(e.target.value);
  }

  const emojis = Object.values(list).filter((each) => {
    const nameMatch = each.name.includes(search);
    const shortNameMatch = each.shortname.includes(search);
    return nameMatch || shortNameMatch;
  })
  return (
    <Row className={styles.emoji}>
      <Input
        onChange={onChange}
        suffix={<Icon icon={faSearch} />}
        placeholder="Search"
        className={styles.input}/>
      {
        emojis.map((each) => {
          const { unicode } = each;
          const value = parseInt(unicode, 16);
          return (<span
            onClick={() => onClick({...each, value: String.fromCodePoint(value)}) }
            className={styles.span}
            key={each.code_decimal}>
          {
            String.fromCodePoint(value)
          }
        </span>)})
      }
    </Row>
  )
};

export default Emoji;