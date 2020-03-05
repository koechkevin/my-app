import {Avatar, List} from 'antd';
import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import styles from './Resume.module.scss';

import { fetchUsers} from '../redux/effects/resume';
import { Link } from 'react-router-dom';

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