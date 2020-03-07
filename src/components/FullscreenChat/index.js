/* eslint-disable */

import React, { Component } from 'react';
import { Row, Col, Menu, Avatar, Icon } from 'antd';
import ChatService from '../ChatService';
import ChatWindow from '../ChatWindow/ChatWindow';
import styles from './index.less';
import * as chatActions from '@/actions/chat';
import socketIOClient from 'socket.io-client';
import logger from '@/utils/logger';

const reconnection = true;
const reconnectionDelay = 5000;
let reconnectionTry = 0;

const { Item } = Menu;

const ChatItem = ({ name, fromApp }) => (
  <>
    <Avatar
      size="medium"
      icon={<Icon type="user" style={{ fontSize: '16px', marginRight: 0 }} />}
    />
    <span className={styles['fullscreen-chat__name']}>{name}</span>
    <span className={styles['fullscreen-chat__from-app']}>{fromApp}</span>
  </>
);

class FullscreenChat extends Component {
  state = {
    active: 1,
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

      this.socket.on('set-user-messages', data => {
        dispatch(chatActions.setMessages(data));
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

  handleClick = e => {
    this.setState({
      active: e.key,
    });

    this.socket.emit('get-user-messages', { userId: e.key });
  };

  render() {
    const { dispatch, chatReducer } = this.props;
    const { active } = this.state;
    const { users = [] } = chatReducer;

    const fixedHeight = { height: '100%', maxHeight: 'inherit' };

    const talkingUser = users.find(o => o.id.toString() === active.toString()) || {};

    return (
      <Row style={fixedHeight}>
        <Col sm={6} style={fixedHeight}>
          <Menu onClick={this.handleClick} style={{ height: '100vh', maxHeight: 'inherit' }}>
            {users.map(o => (
              <Item key={o.id}>
                <ChatItem {...o} />
              </Item>
            ))}
          </Menu>
        </Col>
        <Col sm={18} style={fixedHeight}>
          <ChatService
            dispatch={dispatch}
            chatReducer={chatReducer}
            socket={this.socket}
            agentProfile={{
              id: talkingUser.id,
              teamName: talkingUser.name,
              imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
            }}
          >
            <ChatWindow fullscreen isOpen />
          </ChatService>
        </Col>
      </Row>
    );
  }
}

export default FullscreenChat;
