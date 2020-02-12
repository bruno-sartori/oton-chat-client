import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import incomingMessageSound from '@/assets/sounds/notification.mp3';
import { ChatWindow, Launcher } from './index';


class Wrapper extends Component {
  state = {
    isOpen: false
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { mute, messageList } = this.props;

    if (mute) {
      return;
    }

    const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === 'them';
    const isNew = nextProps.messageList.length > messageList.length;

    if (isIncoming && isNew) {
      this.playIncomingMessageSound();
    }
  }

  playIncomingMessageSound = () => {
    const audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleClick = () => {
    const { handleClick } = this.props;

    if (typeof handleClick !== 'undefined') {
      handleClick();
    } else {
      this.setState(state => ({
        isOpen: !state.isOpen,
      }));
    }
  }

  render() {
    const { isOpen: propsIsOpen, newMessagesCount, messageList, onFilesSelected, onMessageWasSent, agentProfile, showEmoji } = this.props;
    const { isOpen: stateIsOpen } = this.state;

    const isOpen = typeof propsIsOpen !== 'undefined' ? propsIsOpen : stateIsOpen;

    const classList = ['sc-launcher', (isOpen ? 'opened' : '')];

    const MessageCount = (props) => {
      if (props.count === 0 || props.isOpen === true) {
        return null;
      }

      return (
        <div className="sc-new-messages-count">
          {props.count}
        </div>
      );
    };

    return (
      <div id="sc-launcher">
        <ChatWindow
          messageList={messageList}
          onUserInputSubmit={onMessageWasSent}
          onFilesSelected={onFilesSelected}
          agentProfile={agentProfile}
          isOpen={true}
          onClose={this.handleClick}
          showEmoji={showEmoji}
        />
      </div>
    );
  }
}

storiesOf('ChatWindow', module)
  .add('Default', () => (
    <Launcher />
  )
  );
