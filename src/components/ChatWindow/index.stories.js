import React from 'react';
import { storiesOf } from '@storybook/react';
import Separator from './index';

storiesOf('Separator', module)
  .add('Default (Light)', () => <Separator title="Watch It" />)
  .add('Dark', () => (
    <div style={{ backgroundColor: '#1a1a1a', padding: '5px' }}>
      <Separator title="Watch It" colorScheme="DARK" />
    </div>
  ));
