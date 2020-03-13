import {faChevronRight} from '@fortawesome/pro-regular-svg-icons';
import {Row, Typography} from 'antd';
import React, {FC} from 'react';
import {useMedia} from 'react-use';
import {Icon} from './index';

const { Text } = Typography;

export const PTitle: FC<any> = ({name, title, page}) => {
  const isDesktop: boolean = useMedia('(min-width: 692px)');
  return(
    <Row style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
      <Text ellipsis strong style={{ color: '#1d1d1d', fontSize: 20, maxWidth: !isDesktop ? 120 : 200 }}>
        {name}
      </Text>
      {isDesktop && name && <Icon icon={faChevronRight} />}
      {isDesktop && <Text ellipsis>{title}</Text>}
      {isDesktop && page && <Icon icon={faChevronRight} />}
      {isDesktop && <Text ellipsis>{page}</Text>}
    </Row>
  );
}
export default PTitle;