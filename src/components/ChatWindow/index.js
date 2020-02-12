import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Drawer } from 'antd';

const OnlineListDrawer = props => {
  const { title, colorScheme } = props;

  let containerStyle = styles.separator;

  if (colorScheme === 'DARK') {
    containerStyle = `${containerStyle} ${styles.dark}`;
  }

  return (
    <div className={containerStyle}>
      <h2 className={styles.title}>
        {title}
        <span className={styles.stripes}>&nbsp;</span>
      </h2>
    </div>
  );
};

OnlineListDrawer.defaultProps = {
  colorScheme: 'LIGHT',
};

OnlineListDrawer.propTypes = {
  /** Título do separador */
  title: PropTypes.string.isRequired,
  /** Esquema de Cores */
  colorScheme: PropTypes.string,
};

export default OnlineListDrawer;
