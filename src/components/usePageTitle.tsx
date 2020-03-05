import {faChevronRight} from '@fortawesome/pro-regular-svg-icons';
import {Row, Typography} from 'antd';
import React from 'react';
import {useMedia} from 'react-use';
import {Icon} from './index';

const { Text } = Typography;
const usePageTitle  = ({name, title, page}: any) => {
  const isDesktop: boolean = useMedia('(min-width: 692px)');
  return(
  <Row style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
    <Text ellipsis strong style={{ color: '#1d1d1d', fontSize: 20, maxWidth: !isDesktop ? 100 : 200 }}>
      {name}
    </Text>
    {isDesktop && name && <Icon icon={faChevronRight} />}
    {isDesktop && <Text ellipsis>{title}</Text>}
    {isDesktop && page && <Icon icon={faChevronRight} />}
    {isDesktop && <Text ellipsis>{page}</Text>}
  </Row>
);
}
export default usePageTitle;