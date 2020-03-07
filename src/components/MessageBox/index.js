import React, { Component } from 'react';
import { ChatWindow } from '@/components/ChatWindow';
import ChatService from '@/components/ChatService';
import styles from './index.less';

class MessageBox extends Component {
  state = {
    shownToggle: true,
  };

  toggle = () => {
    this.setState(state => ({
      shownToggle: !state.shownToggle,
    }));
  };

  handleClick = () => {
    const { handleClick } = this.props;

    if (typeof handleClick !== 'undefined') {
      handleClick();
    } else {
      this.setState(state => ({
        isOpen: !state.isOpen,
      }));
    }
  };

  render() {
    const {
      openedBoxes = [],
      firstRightMargin = false,
      onClose,
      socket,
      dispatch,
      chatReducer,
    } = this.props;

    const setrightmargin = idx => {
      if (firstRightMargin === true) {
        return idx === 0 ? 270 : 270 * (idx + 1);
      }
      return idx === 0 ? 0 : 270 * idx;
    };

    return (
      <div id="sc-launcher">
        {openedBoxes.map((o, i) => (
          <div key={o.id} className={styles.msg_box} style={{ right: setrightmargin(i) }}>
            <ChatService
              dispatch={dispatch}
              chatReducer={chatReducer}
              socket={socket}
              agentProfile={{
                id: o.id,
                teamName: o.name,
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
              }}
            >
              <ChatWindow isOpen onClose={() => onClose(o.id)} />
            </ChatService>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageBox;
