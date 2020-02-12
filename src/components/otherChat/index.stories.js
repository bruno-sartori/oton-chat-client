import React from 'react';
import { storiesOf } from '@storybook/react';
import ChatWindow from './index';

storiesOf('Other Chat Window', module)
  .add('Default', () => (
    <div style={{ backgroundColor: '#1a1a1a', padding: '5px' }}>
      <ChatWindow />
    </div>
  ));
