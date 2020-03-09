import {Col, Row, Button} from 'antd';
import React, {FC} from 'react';
import styles from '../Pages/Resume.module.scss';


const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = Array(160)
  .fill(1940)
  .map((e, i) => e + i);

interface Props {
  startMonth: string;
  startYear: number | string;
  endMonth: string;
  endYear: string | number;
  onChange: (e: any) => void;
  onFinish?: () => void;
  align?: boolean;
}

const Dates: FC<Props> = (props) => {
  const { startMonth, startYear, endMonth, endYear, onChange, onFinish, align } = props;
  return (
    <div style={{ width: '100%', margin: '8px 0 0' }}>
      <Row
        style={{ display: 'flex', justifyContent: 'space-between', width: align ?'calc(100% + 8px)' : '100%' }}
        gutter={8}>
        <Col xs={11} sm={12} lg={6}>
          <select name="startMonth" onChange={onChange} value={startMonth} className={styles.select}>
            <option value="">Start Month</option>
            {months.map((each: string) => (
              <option key={each}>{each}</option>
            ))}
          </select>
        </Col>
        <Col xs={11} sm={12} lg={6}>
          <select name="startYear" onChange={onChange} value={startYear} className={styles.select}>
            <option value="">Start Year</option>
            {years.map((each: string) => (
              <option key={each}>{each}</option>
            ))}
          </select>
        </Col>
        <Col xs={11} sm={12} lg={6}>
          <select name="endMonth" onChange={onChange} value={endMonth} className={styles.select}>
            <option value="">End Month</option>
            {months.map((each: string) => (
              <option key={each}>{each}</option>
            ))}
          </select>
        </Col>
        <Col xs={11} sm={12} lg={6}>
          <select name="endYear" onChange={onChange} value={endYear} className={styles.select}>
            <option value="">End Year</option>
            {years.map((each: string) => (
              <option key={each}>{each}</option>
            ))}
          </select>
        </Col>
      </Row>
      <Button
        type="primary"
        onClick={onFinish}
        style={{
          background: '#0050c8',
          float: 'right',
          color: '#fff',
          borderRadius: 8,
          height: 32,
          paddingTop: 0,
          paddingBottom: 0 }}>
        Finish
      </Button>
    </div>
  );
}

export default Dates;