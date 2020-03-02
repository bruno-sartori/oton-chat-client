import React, { Component } from 'react';
import * as chatActions from '@/actions/chat';
import messageHistory from './messageHistory';

class ChatService extends Component {
  state = {
    messageList: messageHistory,
    newMessagesCount: 0,
    isOpen: false,
  };

  onMessageWasSent = message => {
    this.setState(state => ({
      messageList: [...state.messageList, message],
    }));
  };

  onFilesSelected = fileList => {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    this.setState(state => ({
      messageList: [
        ...state.messageList,
        {
          type: 'file',
          author: 'me',
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          },
        },
      ],
    }));
  };

  sendMessage = text => {
    const { socket, dispatch } = this.props;
    const { isOpen, newMessagesCount, messageList } = this.state;

    if (text.length > 0) {
      const messagesCount = isOpen ? newMessagesCount : newMessagesCount + 1;

      const msg = {
        author: 'them',
        type: 'text',
        data: { text },
      };

      this.setState({
        newMessagesCount: messagesCount,
        messageList: [...messageList, msg],
      });

      socket.emit('send-message', msg);
      dispatch(chatActions.addMessage(msg));
    }
  };

  handleClick() {
    this.setState(state => ({
      isOpen: !state.isOpen,
      newMessagesCount: 0,
    }));
  }

  render() {
    const { children, agentProfile } = this.props;
    const { messageList, newMessagesCount } = this.state;

    const opts = {
      agentProfile,
      onUserInputSubmit: this.onMessageWasSent,
      onFilesSelected: this.onFilesSelected,
      handleClick: this.handleClick,
      messageList,
      newMessagesCount,
    };

    const Launcher = React.cloneElement(React.Children.only(children), opts);
    console.log(Launcher);
    return Launcher;
  }
}

export default ChatService;
