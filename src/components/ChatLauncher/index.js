import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import OnlineListDrawer from '@/components/OnlineListDrawer';
import logger from '@/utils/logger';
import * as chatActions from '@/actions/chat';
import FloatingButton from './FloatingButton';

const reconnection = true;
const reconnectionDelay = 5000;
let reconnectionTry = 0;

class ChatLauncher extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.connectClient();
  }

  componentWillUnmount() {
    this.socket.destroy();
  }

  connectClient = () => {
    const { apiHost, authorizationToken, dispatch } = this.props;
    this.socket = null;

    this.socket = socketIOClient(apiHost, {
      query: { token: authorizationToken },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      logger.info('OTON-CHAT', `Client connected`);

      this.socket.on('disconnect', () => {
        logger.info('OTON-CHAT', 'Client disconnected');
        this.socket.disconnect();

        if (reconnection === true) {
          setTimeout(() => {
            logger.info('OTON-CHAT', 'Client trying to reconnect');
            this.connectClient();
          }, reconnectionDelay);
        }
      });

      this.socket.on('set-user-list', data => {
        dispatch(chatActions.setUserList(data));
      });

      this.socket.on('message-received', data => {
        dispatch(chatActions.addMessage(data));
      });

      this.socket.on('message-readed', data => {
        dispatch(chatActions.messageReaded(data));
      });

      this.socket.emit('get-user-list');
    });

    this.socket.on('connect_error', () => {
      reconnectionTry += 1;
      logger.info('OTON-CHAT', `Reconnection attempt #${reconnectionTry}`);
    });

    return false;
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
    const { chatReducer, dispatch } = this.props;

    return (
      <div style={{ padding: 100 }}>
        <FloatingButton onClick={this.toggleDrawer} />
        <OnlineListDrawer
          chatReducer={chatReducer}
          dispatch={dispatch}
          onClose={this.closeDrawer}
          visible={visible}
          socket={this.socket}
        />
      </div>
    );
  }
}

export default ChatLauncher;
