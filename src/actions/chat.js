/**
 * @file Manages the real time communication between API and React using socket.io
 * @author Bruno Sartori <brunosartori.webmaster@gmail.com>
 */

export const setUserList = payload => ({ type: 'chat/setUserList', payload });
export const addMessage = payload => ({ type: 'chat/addMessage', payload });
export const messageReaded = payload => ({ type: 'chat/messageReaded', payload });
export const setMessages = payload => ({ type: 'chat/setMessages', payload });
