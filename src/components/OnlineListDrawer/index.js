import React, { Component } from 'react';
import { Drawer } from 'antd';
import MessageBox from '@/components/MessageBox';
import './index.less';
import List from './List';

class OnlineListDrawer extends Component {
  state = {
    openedBoxes: [],
  };

  showBox = person => {
    let { openedBoxes = [] } = this.state;

    if (!openedBoxes.find(o => o.id === person.id)) {
      if (openedBoxes.length >= 3) {
        openedBoxes.shift();
      }

      openedBoxes = [...openedBoxes, { ...person }];

      this.setState({ openedBoxes });
    }
  };

  handleClose = id => {
    const { openedBoxes = [] } = this.state;

    const idx = openedBoxes.indexOf(o => o.id === id);

    openedBoxes.splice(idx, 1);

    this.setState({ openedBoxes });
  };

  render() {
    const { visible, onClose, chatReducer, dispatch, socket } = this.props;
    const { openedBoxes = [] } = this.state;

    const { users = [] } = chatReducer;

    return (
      <div>
        <Drawer
          title="Online Users"
          placement="right"
          closable
          onClose={onClose}
          mask={false}
          visible={visible}
        >
          <List users={users} showBox={this.showBox} />
        </Drawer>
        <MessageBox
          chatReducer={chatReducer}
          dispatch={dispatch}
          openedBoxes={openedBoxes}
          socket={socket}
          firstRightMargin={visible}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default OnlineListDrawer;
