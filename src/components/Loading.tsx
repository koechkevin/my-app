import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, {FC} from 'react';

const Loading: FC<{}> = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return <div style={{height: '100%', display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
    <Spin indicator={antIcon} />
  </div>
}

export default Loading;