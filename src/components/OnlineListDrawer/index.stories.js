import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import OnlineListDrawer from './index';

class Wrapper extends Component {
  state = {
    visible: false
  }

  toggleDrawer = () => {
    this.setState(state => ({ visible: !state.visible }));
  }

  render() {
    const { visible } = this.state;

    return (
      <div style={{ padding: 100 }}>
        <button type="button" onClick={this.toggleDrawer}>
          Open
        </button>
        <OnlineListDrawer onClose={this.closeDrawer} visible={visible} />
      </div>
    )
  }
}

storiesOf('OnlineListDrawer', module)
  .add('Default (Light)', () => (
    <Wrapper />
  )
);
