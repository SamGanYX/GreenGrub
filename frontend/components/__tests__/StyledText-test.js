import React from 'react';
import { render } from '@testing-library/react-native';
import { MonoText } from '../StyledText';

describe('MonoText', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<MonoText>Snapshot test!</MonoText>);
    
    expect(toJSON()).toMatchSnapshot();
  });
});

function FormDataMock() {
  this.append = jest.fn();
}

global.FormData = FormDataMock