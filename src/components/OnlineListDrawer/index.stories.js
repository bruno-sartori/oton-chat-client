import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import OnlineListDrawer from './index';

class Wrapper extends Component {
  state = {
    visible: false,
  };

  toggleDrawer = () => {
    this.setState(state => ({ visible: !state.visible }));
  };

  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;

    const users = [
      { id: '0', name: 'Tony', online: true },
      { id: '1', name: 'Mark', online: true },
      { id: '2', name: 'Joy', online: true },
      { id: '3', name: 'Bruno', online: false },
    ];

    return (
      <div style={{ padding: 100 }}>
        <button type="button" onClick={this.toggleDrawer}>
          Open
        </button>
        <OnlineListDrawer chatReducer={{ users }} onClose={this.closeDrawer} visible={visible} />
      </div>
    );
  }
}

storiesOf('OnlineListDrawer', module).add('Default (Light)', () => <Wrapper />);
