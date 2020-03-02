import React from 'react';
import ListItem from './ListItem';
import styles from './List.less';

const List = ({ users, showBox }) => {
  return (
    <ul className={styles.list}>
      {users.map(person => (
        <ListItem person={person} showBox={showBox} />
      ))}
    </ul>
  );
};

export default List;
