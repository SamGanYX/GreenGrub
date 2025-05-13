// @ts-ignore
global.FormData = require('react-native/Libraries/Network/FormData');

import React from 'react';
import { render } from '@testing-library/react-native';
import { MonoText } from '../StyledText';

describe('MonoText', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<MonoText>Snapshot test!</MonoText>);
    
    expect(toJSON()).toMatchSnapshot();
  });
});