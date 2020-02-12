import React, { Component } from 'react';
import { Button, Drawer } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class OnlineListDrawer extends Component {

  render() {
    const { visible, onClose } = this.props;

    return (
      <div>
        <Drawer
          title="Online Users"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

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
