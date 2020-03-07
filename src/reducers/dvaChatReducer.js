const chatModel = {
  namespace: 'chat',

  state: {
    users: [
      { id: '0', name: 'Tony', online: true },
      { id: '1', name: 'Mark', online: true },
      { id: '2', name: 'Joy', online: true },
      { id: '3', name: 'Bruno', online: false },
    ],
    messages: {},
  },

  effects: {
    *fetchUsers(_, { payload, put }) {
      yield put({
        type: 'chat/setUsers',
        payload,
      });
    },
  },

  reducers: {
    setUserList(state, { payload }) {
      return {
        ...state,
        users: payload,
      };
    },
    setMessages(state, { payload }) {
      return {
        ...state,
        messages: {
          ...state.messages,
          [payload.userId]: payload.messages,
        },
      };
    },
    addMessage(state, { payload }) {
      return {
        ...state,
        messages: {
          ...state.messages,
          [payload.userId]: [...state.messages[payload.userId], payload.message],
        },
      };
    },
    messageReaded(state, { payload }) {
      return {
        ...state,
        messages: {
          ...state.messages,
          [payload.userId]: state.messages[payload.userId].map(o => ({ ...o, readed: true })),
        },
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default chatModel;
