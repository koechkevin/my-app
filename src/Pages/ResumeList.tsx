import {Avatar, List, Row} from 'antd';
import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import styles from './Resume.module.scss';

import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';
import { fetchUsers} from '../redux/effects/resume';

const { Item } = List;
const { Meta } = Item;

interface Props {
  users: any[]
  fetchUsersAction: () => void;
}
const ResumeList: FC<Props> = (props) => {
  const { users, fetchUsersAction } = props;

  useEffect(() => {
    fetchUsersAction();
  }, [fetchUsersAction]);

  return (
    <Row style={{ display: 'flex', justifyContent: 'center'}}>
      <Title level={4} style={{
        maxWidth: 575,
        width: '100%',
        height: 64,
        marginBottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32}}>
        Resume List
      </Title>
    <List
      dataSource={users}
      className={styles.list}
      renderItem={(item: any, index: number) => (
        <Item style={{ padding: '8px 16px', borderBottom: '1px solid lightgray'}} key={index}>
          <Meta
            title={
              <Link to={`/${item.username}`}>
                {`${item.firstName} ${item.lastName}`}
              </Link>
            }
            description={item.resume && item.resume.title}
            avatar={<Avatar size={40} style={{ fontSize: 16, fontWeight: 'bold', background: item.avatarColor || '#106cc8' }}
            >
            {item.firstName.split('')[0]}{item.lastName.split('')[0]}
          </Avatar>} />
        </Item>
      )}
    />
    </Row>
  );
};

const mapStateToProps = ({ global, users}: any) => {
  return {
    users: users.users,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersAction: () => fetchUsers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeList);