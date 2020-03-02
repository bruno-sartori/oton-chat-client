import React from 'react';
import { Badge } from 'antd';
import styles from './ListItem.less';

const ListItem = ({ person, showBox }) => {
  return (
    <div onClick={() => showBox(person)} className={styles['list-item']} key={person.id}>
      <Badge color={person.online ? 'green' : 'gray'} />
      <span className={styles['list-item__name']}>{person.name}</span>
    </div>
  );
};

export default ListItem;
